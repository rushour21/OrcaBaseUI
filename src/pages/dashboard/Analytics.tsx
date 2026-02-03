import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  SendHorizontal,
  Loader2,
  Globe,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { sendChatQuery, approveChatSql, getSessions, getSessionMessages, toggleWebSearch as toggleWebSearchAPI, createSession as createSessionAPI } from "@/api/chat";
import { toast } from "sonner";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Message {
  role: "user" | "assistant";
  content: string;
  sql?: string;
  approvalRequired?: boolean;
}

interface Session {
  id: string;
  title: string;
  created_at: string;
  web_search_enabled: boolean;
}

export default function Analytics() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await getSessions();
      setSessions(data);

      if (data.length > 0 && !activeSessionId) {
        setActiveSessionId(data[0].id);
        setWebSearchEnabled(data[0].web_search_enabled);
        loadMessages(data[0].id);
      }
    } catch (error: any) {
      console.error("Failed to load sessions:", error);
      toast.error("Failed to load sessions");
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      const data = await getSessionMessages(sessionId);

      const formattedMessages: Message[] = data.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        sql: msg.metadata?.sql,
        approvalRequired: msg.metadata?.approvalRequired
      }));

      setMessages(formattedMessages);
    } catch (error: any) {
      console.error("Failed to load messages:", error);
      toast.error("Failed to load messages");
    }
  };

  const createNewSession = async () => {
    try {
      const newSession = await createSessionAPI("New Session");
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      setMessages([]);
      setWebSearchEnabled(false);
    } catch (error: any) {
      toast.error("Failed to create session: " + error.message);
    }
  };

  const toggleWebSearch = async () => {
    if (!activeSessionId) return;

    try {
      const newValue = !webSearchEnabled;
      await toggleWebSearchAPI(activeSessionId, newValue);

      setWebSearchEnabled(newValue);
      toast.success(`Web search ${newValue ? "enabled" : "disabled"}`);
    } catch (error: any) {
      toast.error("Failed to toggle web search");
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsGenerating(true);

    try {
      const response = await sendChatQuery({
        query: userMsg,
        sessionId: activeSessionId || undefined
      });

      // If no session was active, we now have one
      if (!activeSessionId && response.sessionId) {
        setActiveSessionId(response.sessionId);
        loadSessions(); // Refresh session list
      }

      const assistantMsg: Message = {
        role: "assistant",
        content: response.text || "I processed your request.",
        sql: response.sql,
        approvalRequired: response.approvalRequired,
      };

      setMessages(prev => [...prev, assistantMsg]);

    } catch (error: any) {
      toast.error("Failed to send message: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveSql = async (sql: string) => {
    setIsGenerating(true);

    try {
      const response = await approveChatSql({ sql, sessionId: activeSessionId! });

      const assistantMsg: Message = {
        role: "assistant",
        content: response.text || "Query executed successfully.",
      };

      setMessages(prev => [...prev, assistantMsg]);

    } catch (error: any) {
      toast.error("Failed to execute SQL: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRejectSql = () => {
    toast.info("SQL query rejected");
  };

  return (
    <div className="flex h-screen bg-background relative">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sessions Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-72' : 'w-72'}
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        transition-transform duration-300
        border-r border-border bg-background flex flex-col
      `}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Your chats</h2>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            onClick={createNewSession}
            className="w-full bg-brand hover:bg-brand-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => {
                setActiveSessionId(session.id);
                setWebSearchEnabled(session.web_search_enabled);
                loadMessages(session.id);
                if (isMobile) setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 border-b border-border transition-colors hover:bg-muted ${activeSessionId === session.id
                ? "bg-muted border-l-4 border-l-brand"
                : ""
                }`}
            >
              <div className="text-sm font-medium truncate text-foreground">
                {session.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(session.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </button>
          ))}

          {sessions.length === 0 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No conversations yet
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-3 md:p-4 flex items-center justify-between bg-background-shell">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="h-8 w-8"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-lg md:text-xl font-semibold">Database Chat</h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleWebSearch}
            className={webSearchEnabled ? "bg-brand text-white" : ""}
          >
            <Globe className="h-4 w-4 mr-0 md:mr-2" />
            <span className="hidden md:inline">Web Search: {webSearchEnabled ? "ON" : "OFF"}</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-12 md:mt-20 px-4">
              <MessageSquare className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm md:text-base">Start a conversation about your database</p>
              <p className="text-xs md:text-sm mt-2">I'll generate SQL queries for your approval</p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <ChatBubble
                  key={i}
                  message={msg.content}
                  isUser={msg.role === "user"}
                  sqlQuery={msg.sql}
                  onApprove={msg.approvalRequired && msg.sql ? () => handleApproveSql(msg.sql!) : undefined}
                  onReject={msg.approvalRequired ? handleRejectSql : undefined}
                />
              ))}

              {/* Thinking indicator */}
              {isGenerating && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-shell border border-border">
                    <Loader2 className="h-4 w-4 text-brand animate-spin" />
                  </div>
                  <div className="max-w-[80%] space-y-2">
                    <div className="rounded-2xl px-4 py-3 bg-background-shell border-l-2 border-brand rounded-tl-sm">
                      <p className="text-sm text-muted-foreground">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 md:p-4 bg-background-shell">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              placeholder="Ask about your database..."
              disabled={isGenerating}
              className="flex-1 text-sm md:text-base"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isGenerating || !input.trim()}
              className="bg-brand hover:bg-brand-dark shrink-0"
              size="icon"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
