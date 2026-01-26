import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-start gap-4">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                  isCompleted && "border-brand bg-brand text-brand-foreground",
                  isCurrent && "border-brand text-brand",
                  !isCompleted && !isCurrent && "border-border text-foreground-muted"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mt-2 h-8 w-0.5 transition-colors duration-300",
                    isCompleted ? "bg-brand" : "bg-border"
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div className="flex-1 pt-1">
              <p
                className={cn(
                  "font-medium transition-colors duration-300",
                  (isCompleted || isCurrent) ? "text-foreground" : "text-foreground-muted"
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-sm text-foreground-secondary">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
