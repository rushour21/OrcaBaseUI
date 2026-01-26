import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Bot, Users } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatBubble } from "@/components/ui/ChatBubble";
import api from "@/api/axios";

export default function EmbedChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"ai" | "human">("ai");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");


  const scrollRef = useRef<HTMLDivElement>(null);

  const params = new URLSearchParams(window.location.search);
  const apiKey = params.get("apiKey");
  const apiUrl = import.meta.env.VITE_API_URL;

  /* ----------------------------------------
     Auto scroll
  ---------------------------------------- */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm]);

  /* ----------------------------------------
     Load existing session
  ---------------------------------------- */
  useEffect(() => {
    if (!apiKey) return;

    const sessionId = localStorage.getItem(`chat_session_${apiKey}`);
    if (!sessionId) return;


    axios
      .get(`${apiUrl}/api/conversations/${sessionId}/messages`, {
        headers: {
          "x-workspace-api-key": apiKey,
        },
      })
      .then((res) => setMessages(res.data))
      .catch(() => { });
  }, [apiKey]);

  /* ----------------------------------------
     Send message (single entry point)
  ---------------------------------------- */
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const sessionId = localStorage.getItem(`chat_session_${apiKey}`);

      const res = await axios.post(`${apiUrl}/api/conversations/message`, {
        prompt: userMessage,
        workspaceApiKey: apiKey,
        sessionId,
      });

      if (res.data.sessionId) {
        localStorage.setItem(
          `chat_session_${apiKey}`,
          res.data.sessionId
        );
      }

      setMode(res.data.mode);

      if (res.data.answer) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.data.answer },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ----------------------------------------
     Escalate to human
  ---------------------------------------- */
  const handleSubmitLead = async () => {
    if (!leadName || !leadEmail) return;

    const sessionId = localStorage.getItem(`chat_session_${apiKey}`);
    if (!sessionId) return;

    try {
      await axios.post(`${apiUrl}/api/conversations/escalate`, {
        sessionId,
        workspaceApiKey: apiKey,
        name: leadName,
        email: leadEmail,
      });

      setMode("human");
      setShowLeadForm(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Thanks! Our team will reply here shortly.",
        },
      ]);
    } catch {
      alert("Failed to submit details");
    }
  };


  /* ----------------------------------------
     Approval Handlers
  ---------------------------------------- */
  const handleApproveSql = async (approvalId: string, sql: string) => {
    try {
      // Optimistic update
      setMessages(prev => prev.map(m =>
        m.approvalId === approvalId ? { ...m, content: "Running query...", approvalId: undefined } : m
      ));

      const res = await axios.post(`${apiUrl}/api/database-chat/approve`, {
        sql
      }, {
        headers: {
          "x-workspace-api-key": apiKey,
        },
      });

      // Append result from server
      if (res.data) {
        // Assuming res.data.text or similar contains the answer
        setMessages(prev => [...prev, { role: "assistant", content: res.data.text || JSON.stringify(res.data, null, 2) }]);
      }

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "Failed to execute SQL." }]);
    }
  };

  const handleRejectSql = (approvalId: string) => {
    setMessages(prev => prev.map(m =>
      m.approvalId === approvalId ? { ...m, content: "Query rejected.", approvalId: undefined } : m
    ));
  };


  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-brand px-4 py-3 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Orcabase Support</span>
            <span className="text-[10px] opacity-80">
              {mode === "ai" ? "AI Assistant" : "Connected to Team"}
            </span>
          </div>
        </div>

        {mode === "ai" && (
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 text-xs gap-1"
            onClick={() => setShowLeadForm(true)}
          >
            <Users className="h-3 w-3" />
            Talk to Team
          </Button>
        )}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-sm text-slate-500 mt-10">
            Ask anything about our product
          </div>
        )}

        {messages.map((m, i) => {
          // Check if message requires approval (this logic depends on how the backend sends the "needs approval" signal)
          // For now, assuming if the message *contains* "SQL" or structured data, handle it.
          // BUT, looking at the logs, the error happens BEFORE response.
          // So we need to handle the specific "tool approval" interaction pattern if the SDK exposes it.
          // Since we are using a custom endpoint /message, we need to know what that returns when approval is needed.

          // Assuming backend returns a special flag or we parse it?? 
          // Actually, earlier we decided the agent execution *pauses*?

          // Let's implementation the Approval Action if we see a specific pattern or status.
          // For this turn, simply render ChatBubble. 
          // Note: Real approval logic requires the `messages` state to include `approvalRequired: boolean` and `sql: string`.

          return (
            <ChatBubble
              key={i}
              message={m.content}
              isUser={m.role === "user"}
              timestamp={m.created_at ? new Date(m.created_at).toLocaleTimeString() : undefined}
              sqlQuery={m.sql} // Assuming backend sends this attached to message
              onApprove={m.approvalId ? () => handleApproveSql(m.approvalId, m.sql) : undefined}
              onReject={m.approvalId ? () => handleRejectSql(m.approvalId) : undefined}
            />
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-2 rounded-2xl text-xs text-slate-400">
              Typing…
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* LEAD FORM (OVERLAY STYLE) */}
      {showLeadForm && (
        <div className="border-t bg-white px-4 py-3 space-y-3">
          <div className="text-sm font-semibold text-slate-700">
            Talk to our team
          </div>
          <Input
            placeholder="Your name"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
          />

          <Input
            placeholder="Your email"
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
          />
          <Button
            className="w-full bg-brand text-white"
            onClick={handleSubmitLead}
          >
            Submit request
          </Button>
        </div>
      )}

      {/* INPUT */}
      {!showLeadForm && (
        <div className="border-t bg-white px-3 py-2 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message…"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="bg-brand text-white"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
