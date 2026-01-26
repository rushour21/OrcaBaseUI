import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PlanCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  onSelect?: () => void;
  className?: string;
}

export function PlanCard({
  name,
  price,
  period = "/month",
  description,
  features,
  isPopular = false,
  buttonText = "Get Started",
  onSelect,
  className,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-card p-8 transition-all duration-300",
        isPopular && "border-accent glow-accent scale-105",
        "hover:border-brand/50 hover:shadow-elegant",
        className
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <p className="mt-2 text-sm text-foreground-secondary">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-foreground">{price}</span>
        {period && price !== "Custom" && (
          <span className="text-foreground-secondary">{period}</span>
        )}
      </div>

      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span className="text-sm text-foreground-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSelect}
        className={cn(
          "w-full",
          isPopular
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "bg-brand text-brand-foreground hover:bg-brand-dark"
        )}
      >
        {buttonText}
      </Button>
    </div>
  );
}
