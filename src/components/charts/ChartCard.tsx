import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Database, FileText, TrendingUp, TrendingDown, Minus } from "lucide-react";

type DataSourceType = "document" | "database";
type TrendDirection = "up" | "down" | "neutral";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  sourceType?: DataSourceType;
  trend?: {
    value: string;
    direction: TrendDirection;
    label?: string;
  };
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  sourceType,
  trend,
  children,
  className,
  actions,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand/30",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {sourceType && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
                  sourceType === "document"
                    ? "bg-brand/10 text-brand"
                    : "bg-accent/10 text-accent"
                )}
              >
                {sourceType === "document" ? (
                  <FileText className="h-3 w-3" />
                ) : (
                  <Database className="h-3 w-3" />
                )}
                {sourceType === "document" ? "Document" : "Database"}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-foreground-secondary">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-lg px-2.5 py-1",
                trend.direction === "up" && "bg-success/10 text-success",
                trend.direction === "down" && "bg-error/10 text-error",
                trend.direction === "neutral" && "bg-foreground-muted/10 text-foreground-muted"
              )}
            >
              {trend.direction === "up" && <TrendingUp className="h-4 w-4" />}
              {trend.direction === "down" && <TrendingDown className="h-4 w-4" />}
              {trend.direction === "neutral" && <Minus className="h-4 w-4" />}
              <span className="text-sm font-medium">{trend.value}</span>
              {trend.label && (
                <span className="text-xs opacity-70">{trend.label}</span>
              )}
            </div>
          )}
          {actions}
        </div>
      </div>

      {/* Chart Content */}
      <div className="mt-2">{children}</div>
    </div>
  );
}
