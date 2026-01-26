import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
  sources?: { type: "document" | "database"; name: string }[];
  sqlQuery?: string;
  onApprove?: () => void;
  onReject?: () => void;
  className?: string;
}

export function ChatBubble({
  message,
  isUser = false,
  timestamp,
  sources,
  sqlQuery,
  onApprove,
  onReject,
  className,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-brand text-brand-foreground"
            : "bg-background-shell border border-border"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-brand" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "max-w-[80%] space-y-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser
              ? "bg-brand text-brand-foreground rounded-tr-sm"
              : "bg-background-shell border-l-2 border-brand rounded-tl-sm"
          )}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed">{message}</p>
          ) : (
            <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-headings:my-2">
              <ReactMarkdown>{message}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* SQL Query Block */}
        {sqlQuery && !isUser && (
          <div className="rounded-lg bg-background-shell border border-border p-3 font-mono text-xs">
            <p className="mb-1 text-foreground-muted">Generated SQL:</p>
            <code className="text-brand block overflow-x-auto">{sqlQuery}</code>

            {/* Approval UI */}
            {onApprove && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={onApprove}
                  className="px-3 py-1.5 bg-brand text-white rounded-md text-xs font-medium hover:bg-brand-dark transition-colors"
                >
                  Approve & Run
                </button>
                {onReject && (
                  <button
                    onClick={onReject}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300 transition-colors"
                  >
                    Reject
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sources */}
        {sources && sources.length > 0 && !isUser && (
          <div className="flex flex-wrap gap-2">
            {sources.map((source, index) => (
              <span
                key={index}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs",
                  source.type === "document"
                    ? "bg-brand/10 text-brand"
                    : "bg-accent/10 text-accent"
                )}
              >
                {source.type === "document" ? "📄" : "🗄️"} {source.name}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        {timestamp && (
          <p className="text-xs text-foreground-muted">{timestamp}</p>
        )}
      </div>
    </div>
  );
}
