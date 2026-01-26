import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: "brand" | "accent" | "success" | "info";
  className?: string;
}

const iconColorClasses = {
  brand: "bg-brand/10 text-brand",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor = "brand",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-border bg-card p-6 transition-all duration-300",
        "hover:border-brand/50 hover:shadow-elegant",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 inline-flex rounded-lg p-3 transition-transform duration-300 group-hover:scale-110",
          iconColorClasses[iconColor]
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-foreground-secondary">
        {description}
      </p>
    </div>
  );
}
