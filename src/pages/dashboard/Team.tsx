import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Users,
  UserPlus,
  Search,
  MoreVertical,
  Mail,
  Shield,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { inviteApi } from "@/api/invites";
import { workspaceApi } from "@/api/workspaces";
import { useAuthStore } from "@/store/useAuthStore";

const roles = [
  {
    value: "admin",
    label: "Company Admin",
    description: "Full access to workspace, connections, and team management",
  },
  {
    value: "member",
    label: "Team Member",
    description: "Can use chatbot and view analytics (if allowed)",
  },
];

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const { currentWorkspace } = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);

  // Invite state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [isInviting, setIsInviting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (currentWorkspace?.id) {
      fetchMembers();
    }
  }, [currentWorkspace?.id]);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const members = await workspaceApi.listMembers(currentWorkspace!.id);
      setTeamMembers(members);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter(
    (member) =>
      (member.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateRole = (memberId: number, newRole: string) => {
    setTeamMembers(
      teamMembers.map((m) =>
        m.id === memberId ? { ...m, role: newRole } : m
      )
    );
  };

  const handleInvite = async () => {
    if (!inviteEmail || !currentWorkspace) return;

    setIsInviting(true);
    try {
      await inviteApi.create({
        email: inviteEmail,
        role: inviteRole,
        workspaceId: currentWorkspace.id,
      });
      setIsDialogOpen(false);
      setInviteEmail("");
      setInviteRole("member");
      fetchMembers(); // Reload list to show pending invite
    } catch (error) {
      console.error("Failed to invite:", error);
      // Ideally show error toast here
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team & Roles</h1>
          <p className="text-foreground-secondary mt-1">
            Manage team members and their permissions
          </p>
        </div>
      </div>

      {/* Only show invite button if user is admin */}
      {teamMembers.find((m: any) => m.email?.toLowerCase() === useAuthStore.getState().user?.email?.toLowerCase())?.role === "admin" && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background-surface border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Invite Team Member</DialogTitle>
              <DialogDescription className="text-foreground-secondary">
                Send an invitation to join your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-foreground">Email Address</Label>
                <Input
                  placeholder="colleague@company.com"
                  className="bg-background-shell border-border text-foreground"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger className="bg-background-shell border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background-surface border-border">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full bg-brand text-brand-foreground hover:bg-brand-dark gap-2"
                onClick={handleInvite}
                disabled={isInviting}
              >
                <Mail className="h-4 w-4" />
                {isInviting ? "Sending..." : "Send Invitation"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* Role Descriptions */}
      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role.value}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className={`h-5 w-5 ${role.value === "admin" ? "text-accent" : "text-brand"}`} />
              <h3 className="font-semibold text-foreground">{role.label}</h3>
            </div>
            <p className="text-sm text-foreground-secondary">{role.description}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background-shell border-border text-foreground placeholder:text-foreground-muted"
          />
        </div>
        <div className="text-sm text-foreground-secondary">
          {filteredMembers.length} members
        </div>
      </div>

      {/* Team Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-foreground-secondary">Member</TableHead>
              <TableHead className="text-foreground-secondary">Role</TableHead>
              <TableHead className="text-foreground-secondary">Status</TableHead>
              <TableHead className="text-foreground-secondary">Joined</TableHead>
              <TableHead className="text-foreground-secondary w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-foreground-secondary">
                  Loading members...
                </TableCell>
              </TableRow>
            ) : filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-foreground-secondary">
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id} className="border-border hover:bg-background-shell/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand font-semibold">
                        {(member.name || member.email).split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name || member.email}</p>
                        {member.name && <p className="text-sm text-foreground-muted">{member.email}</p>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={member.role}
                      onValueChange={(value) => updateRole(member.id, value)}
                    >
                      <SelectTrigger className="w-[150px] bg-background-shell border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background-surface border-border">
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {member.status === "active" ? (
                      <StatusBadge status="success">Active</StatusBadge>
                    ) : (
                      <StatusBadge status="warning">Pending</StatusBadge>
                    )}
                  </TableCell>
                  <TableCell className="text-foreground-secondary">{member.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-foreground-secondary hover:text-foreground"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-background-surface border-border"
                      >
                        <DropdownMenuItem className="gap-2">
                          <Mail className="h-4 w-4" />
                          Resend invite
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-error">
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div >
  );
}
