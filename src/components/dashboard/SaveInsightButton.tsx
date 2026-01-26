import { useState } from "react";
import { Bookmark, BookmarkCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SaveInsightButtonProps {
  insightId: string;
  onSave?: (id: string) => void;
  onUnsave?: (id: string) => void;
  isSaved?: boolean;
  className?: string;
}

export function SaveInsightButton({
  insightId,
  onSave,
  onUnsave,
  isSaved = false,
  className,
}: SaveInsightButtonProps) {
  const [saved, setSaved] = useState(isSaved);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (saved) {
      setSaved(false);
      onUnsave?.(insightId);
    } else {
      setSaved(true);
      onSave?.(insightId);
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2000);
    }
  };

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClick}
          className={cn(
            "h-8 px-2 gap-1.5",
            saved 
              ? "text-brand hover:text-brand hover:bg-brand/10" 
              : "text-foreground-secondary hover:text-foreground",
            className
          )}
        >
          {showConfirm ? (
            <>
              <Check className="h-4 w-4" />
              <span className="text-xs">Saved!</span>
            </>
          ) : saved ? (
            <>
              <BookmarkCheck className="h-4 w-4" />
              <span className="text-xs">Saved</span>
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" />
              <span className="text-xs">Save</span>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-background-surface border-border">
        {saved ? "Remove from saved insights" : "Save to insights"}
      </TooltipContent>
    </Tooltip>
  );
}
