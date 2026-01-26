import { RefreshCw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataFreshnessIndicatorProps {
  lastUpdated: Date;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

function getTimeDifference(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function getFreshnessStatus(date: Date): "fresh" | "stale" | "old" {
  const now = new Date();
  const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffMins < 5) return "fresh";
  if (diffMins < 30) return "stale";
  return "old";
}

export function DataFreshnessIndicator({
  lastUpdated,
  onRefresh,
  isRefreshing = false,
  className,
}: DataFreshnessIndicatorProps) {
  const status = getFreshnessStatus(lastUpdated);
  const timeAgo = getTimeDifference(lastUpdated);

  const statusColors = {
    fresh: "text-success",
    stale: "text-accent",
    old: "text-warning",
  };

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <div className={cn("flex items-center gap-1.5", statusColors[status])}>
        <Clock className="h-3 w-3" />
        <span>Data last updated: {timeAgo}</span>
      </div>
      {onRefresh && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-6 px-2 text-foreground-secondary hover:text-foreground"
        >
          <RefreshCw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
        </Button>
      )}
    </div>
  );
}
