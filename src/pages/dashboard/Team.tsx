import { useState } from "react";
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

const mockTeamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@acme.com",
    role: "admin",
    status: "active",
    joined: "2024-01-01",
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@acme.com",
    role: "admin",
    status: "active",
    joined: "2024-01-05",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@acme.com",
    role: "member",
    status: "active",
    joined: "2024-01-10",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@acme.com",
    role: "member",
    status: "active",
    joined: "2024-01-12",
  },
  {
    id: 5,
    name: "Alex Johnson",
    email: "alex@acme.com",
    role: "member",
    status: "pending",
    joined: "2024-01-15",
  },
];

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
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateRole = (memberId: number, newRole: string) => {
    setTeamMembers(
      teamMembers.map((m) =>
        m.id === memberId ? { ...m, role: newRole } : m
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team & Roles</h1>
          <p className="text-foreground-secondary mt-1">
            Manage team members and their permissions
          </p>
        </div>
        <Dialog>
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
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Role</Label>
                <Select defaultValue="member">
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
              <Button className="w-full bg-brand text-brand-foreground hover:bg-brand-dark gap-2">
                <Mail className="h-4 w-4" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
            {filteredMembers.map((member) => (
              <TableRow key={member.id} className="border-border hover:bg-background-shell/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand font-semibold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-foreground-muted">{member.email}</p>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
