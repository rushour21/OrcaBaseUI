import { cn } from "@/lib/utils";
import { Shield, Users, Eye } from "lucide-react";
import { UserRole } from "@/contexts/WorkspaceContext";

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
  showLabel?: boolean;
}

const roleConfig: Record<UserRole, { label: string; icon: typeof Shield; colorClass: string }> = {
  admin: {
    label: "Admin",
    icon: Shield,
    colorClass: "bg-brand/10 text-brand border-brand/20",
  },
  team_member: {
    label: "Team Member",
    icon: Users,
    colorClass: "bg-accent/10 text-accent-foreground border-accent/20",
  },
  visitor: {
    label: "Visitor",
    icon: Eye,
    colorClass: "bg-foreground-muted/10 text-foreground-secondary border-foreground-muted/20",
  },
};

export function RoleBadge({ role, className, showLabel = true }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border",
        config.colorClass,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}
