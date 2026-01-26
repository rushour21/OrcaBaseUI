import { MessageSquare, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface UsageLimitsCardProps {
  used: number;
  total: number;
  periodLabel?: string;
  className?: string;
}

export function UsageLimitsCard({
  used,
  total,
  periodLabel = "this month",
  className,
}: UsageLimitsCardProps) {
  const remaining = total - used;
  const percentage = Math.min((used / total) * 100, 100);
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            isAtLimit ? "bg-error/10" : isNearLimit ? "bg-warning/10" : "bg-brand/10"
          )}>
            {isNearLimit ? (
              <AlertTriangle className={cn("h-4 w-4", isAtLimit ? "text-error" : "text-warning")} />
            ) : (
              <MessageSquare className="h-4 w-4 text-brand" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Query Usage</p>
            <p className="text-xs text-foreground-muted">{periodLabel}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={cn(
            "text-lg font-bold",
            isAtLimit ? "text-error" : isNearLimit ? "text-warning" : "text-foreground"
          )}>
            {used.toLocaleString()}
          </p>
          <p className="text-xs text-foreground-muted">of {total.toLocaleString()}</p>
        </div>
      </div>

      <Progress 
        value={percentage} 
        className={cn(
          "h-2",
          isAtLimit && "[&>div]:bg-error",
          isNearLimit && !isAtLimit && "[&>div]:bg-warning"
        )}
      />

      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-foreground-secondary">
          {remaining.toLocaleString()} queries remaining
        </span>
        {isNearLimit && !isAtLimit && (
          <span className="text-warning flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Approaching limit
          </span>
        )}
        {isAtLimit && (
          <span className="text-error">Limit reached</span>
        )}
      </div>
    </div>
  );
}
