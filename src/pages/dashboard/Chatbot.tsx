import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import {
  MessageSquare,
  Code,
  Copy,
  Check,
  Bot,
  Send,
  Globe,
  ShieldCheck,
} from "lucide-react";

export default function Chatbot() {
  const { currentWorkspace } = useWorkspace();
  const [copied, setCopied] = useState(false);

  // Test Chat State
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll for test chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Default values for embed code since widget customizer is removed
  const apiKey = currentWorkspace?.public_api_key || "YOUR_API_KEY";
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Uses apiUrl to point to the server where widget-loader.js is served
  const embedCode = `<script src="${apiUrl}/widget-loader.js" data-api-key="${apiKey}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Optimistic update
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/api/rag/query`, {
        prompt: input,
        workspaceApiKey: apiKey,
        sessionId: localStorage.getItem(`test_chat_session_${apiKey}`)
      });

      const aiAnswer = res.data.answer;

      if (res.data.sessionId) {
        localStorage.setItem(`test_chat_session_${apiKey}`, res.data.sessionId);
      }

      setMessages(prev => [...prev, { role: "assistant", content: aiAnswer }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please ensure your workspace has a valid API key and documents indexed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Website Chatbot</h1>
        <p className="text-foreground-secondary mt-1">
          Configure the public chatbot widget for your website visitors
        </p>
        <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-brand/10 border border-brand/20">
          <Globe className="h-4 w-4 text-brand" />
          <span className="text-sm text-foreground">
            This chatbot is embedded on your website and answers questions using <strong>documents only</strong> (no database access).
          </span>
        </div>
      </div>

      <Tabs defaultValue="embed" className="space-y-6">
        <TabsList className="bg-background-shell border border-border flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="embed" className="data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
            <Code className="h-4 w-4 mr-2" />
            Embed
          </TabsTrigger>
          <TabsTrigger value="test" className="data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
            <MessageSquare className="h-4 w-4 mr-2" />
            Test Chat
          </TabsTrigger>
        </TabsList>

        {/* Embed Tab */}
        <TabsContent value="embed" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Embed Code</h2>
            <p className="text-sm text-foreground-secondary mb-6">
              Add this code to your website to display the chat widget
            </p>

            <div className="relative">
              <code className="block rounded-lg bg-background-shell border border-border p-4 pr-24 font-mono text-sm text-foreground break-all whitespace-pre-wrap">
                {embedCode}
              </code>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 border-border text-foreground-secondary hover:text-foreground"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-brand/5 border border-brand/20">
              <ShieldCheck className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Secure & Company-Specific</p>
                <p className="text-sm text-foreground-secondary mt-1">
                  Read-only access • Data isolated per workspace • No cross-company data exposure
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-info/5 border border-info/20">
              <p className="text-sm text-foreground">
                <strong>Tip:</strong> Place this script just before the closing{" "}
                <code className="text-info">&lt;/body&gt;</code> tag for best performance.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Test Chat Tab */}
        <TabsContent value="test" className="space-y-6">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-border bg-background-shell">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand">
                <Bot className="h-4 w-4 text-brand-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Test Your AI Assistant</p>
                <p className="text-xs text-foreground-secondary">
                  Try asking questions to see how it responds
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-background">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-foreground-secondary opacity-50">
                  <Bot className="h-12 w-12 mb-4" />
                  <p>Start a conversation to test your AI assistant.</p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === "user"
                      ? "bg-brand text-white rounded-tr-none border-brand"
                      : "bg-background-shell text-foreground border border-border rounded-tl-none"
                      }`}
                  >
                    <div className="markdown-container">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background-shell border border-border p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-foreground-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-foreground-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-foreground-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 p-4 border-t border-border bg-background-shell">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                disabled={isLoading}
                className="bg-background border-border text-foreground placeholder:text-foreground-muted focus-visible:ring-brand"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-brand text-brand-foreground hover:bg-brand-dark"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}