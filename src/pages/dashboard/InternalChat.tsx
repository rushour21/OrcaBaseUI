import { useEffect, useState, useRef } from "react";
import api from "@/api/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  User,
  Search,
  Bot,
  Archive,
  CheckCircle2,
  Clock,
  MoreVertical,
  Filter,
  MessageSquare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

/* ===================== TYPES ===================== */

type Ticket = {
  id: string;
  lead_name: string;
  lead_email: string;
  status: "open" | "closed" | "pending";
};

type Message = {
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

/* ===================== COMPONENT ===================== */

export default function ContactCenter() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ===================== AUTO SCROLL ===================== */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===================== LOAD TICKETS ===================== */
  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await api.get("/api/admin/conversations");

      if (!Array.isArray(res.data)) {
        console.error("Invalid tickets response:", res.data);
        setTickets([]);
        return;
      }

      setTickets(res.data);

      if (res.data.length > 0) {
        setActiveTicket(res.data[0]);
        loadMessages(res.data[0].id);
      }
    } catch (err) {
      console.error("Failed to load tickets", err);
      setTickets([]);
    }
  };

  /* ===================== LOAD MESSAGES ===================== */
  const loadMessages = async (sessionId: string) => {
    try {
      setLoadingMessages(true);
      const res = await api.get(
        `/api/admin/conversations/${sessionId}/messages`
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  /* ===================== SELECT TICKET ===================== */
  const handleSelectTicket = (ticket: Ticket) => {
    setActiveTicket(ticket);
    loadMessages(ticket.id);
  };

  /* ===================== SEND REPLY ===================== */
  const handleSendReply = async () => {
    if (!reply.trim() || !activeTicket) return;

    try {
      await api.post(
        `/api/admin/conversations/${activeTicket.id}/reply`,
        { message: reply }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          created_at: new Date().toISOString(),
        },
      ]);

      setReply("");
    } catch (err) {
      console.error("Failed to send reply", err);
    }
  };

  /* ===================== CLOSE TICKET ===================== */
  const handleCloseTicket = async () => {
    if (!activeTicket) return;

    try {
      await api.patch(
        `/api/admin/conversations/${activeTicket.id}/status`,
        { status: "closed" }
      );

      setActiveTicket(null);
      setMessages([]);
      loadTickets();
    } catch (err) {
      console.error("Failed to close ticket", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "closed":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  /* ===================== UI ===================== */

  return (
    <div className="flex h-[calc(100vh-120px)] w-full bg-background">
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-80 border-r border-border bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9 bg-background-shell border-border"
              placeholder="Search conversations..."
            />
          </div>
        </div>

        {/* Tickets List */}
        <div className="flex-1 overflow-y-auto">
          {tickets.length === 0 && (
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No active conversations</p>
            </div>
          )}

          {tickets.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTicket(t)}
              className={`w-full p-4 border-b border-border transition-colors text-left ${activeTicket?.id === t.id
                ? "bg-muted border-l-4 border-l-brand"
                : "hover:bg-muted/50"
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand/20 to-brand/10 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {t.lead_name}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0 h-5 ${getStatusColor(t.status)}`}
                    >
                      {t.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.lead_email}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* ===================== CHAT AREA ===================== */}
      <section className="flex-1 flex flex-col bg-background">
        {activeTicket ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-border bg-background-shell">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{activeTicket.lead_name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activeTicket.lead_email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(activeTicket.status)}`}
                  >
                    {activeTicket.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleCloseTicket}
                  >
                    <Archive className="h-4 w-4" />
                    Close
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/20">
              {loadingMessages && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Loading messages...</span>
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-start" : "justify-end"
                    }`}
                >
                  <div
                    className={`max-w-[70%] ${m.role === "user" ? "flex gap-3" : "flex flex-row-reverse gap-3"
                      }`}
                  >
                    {/* Avatar */}
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user"
                      ? "bg-gradient-to-br from-brand/20 to-brand/10"
                      : "bg-gradient-to-br from-brand to-brand-dark"
                      }`}>
                      {m.role === "user" ? (
                        <User className="h-4 w-4 text-brand" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`px-4 py-3 rounded-2xl ${m.role === "user"
                          ? "bg-background border border-border rounded-tl-sm"
                          : "bg-brand text-white rounded-tr-sm"
                          }`}
                      >
                        <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 ${m.role === "user" ? "justify-start" : "justify-end"
                        }`}>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(m.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {m.role === "assistant" && (
                          <CheckCircle2 className="h-3 w-3 text-brand" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-background-shell">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Input
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    placeholder="Type your message..."
                    className="min-h-[44px] resize-none bg-background"
                  />
                </div>
                <Button
                  onClick={handleSendReply}
                  disabled={!reply.trim()}
                  className="bg-brand hover:bg-brand-dark text-white h-[44px] px-6"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 px-1">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium mb-1">No conversation selected</p>
            <p className="text-sm">Choose a conversation from the sidebar to start</p>
          </div>
        )}
      </section>
    </div>
  );
}
