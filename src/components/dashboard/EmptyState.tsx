import { ReactNode } from "react";
import { BarChart3, FileX, AlertCircle, Database, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EmptyStateType = "no-data" | "error" | "no-trend" | "no-documents" | "no-database";

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
  className?: string;
}

const defaultContent: Record<EmptyStateType, { title: string; description: string; icon: typeof BarChart3 }> = {
  "no-data": {
    title: "No data available",
    description: "There's no data to display yet. Start by adding some content.",
    icon: BarChart3,
  },
  "error": {
    title: "Something went wrong",
    description: "We couldn't load the data. Please try again later.",
    icon: AlertCircle,
  },
  "no-trend": {
    title: "Not enough data to generate a trend yet",
    description: "We need more data points to show meaningful trends. Check back after a few more days of activity.",
    icon: TrendingUp,
  },
  "no-documents": {
    title: "No documents indexed",
    description: "Upload documents to enable AI-powered search and question answering.",
    icon: FileX,
  },
  "no-database": {
    title: "No database connected",
    description: "Connect a database to enable natural language queries on your data.",
    icon: Database,
  },
};

export function EmptyState({
  type = "no-data",
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  const content = defaultContent[type];
  const Icon = content.icon;
  
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-border bg-background-shell/50",
      className
    )}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground-muted/10 mb-4">
        {icon || <Icon className="h-6 w-6 text-foreground-muted" />}
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">
        {title || content.title}
      </h3>
      <p className="text-xs text-foreground-muted max-w-[280px] mb-4">
        {description || content.description}
      </p>
      {action && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={action.onClick}
          className="border-border text-foreground-secondary hover:text-foreground"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
