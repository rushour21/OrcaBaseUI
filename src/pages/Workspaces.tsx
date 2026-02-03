import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/Logo.png";
import {
  Building2,
  Plus,
  ArrowRight,
  Loader2,
  LogOut,
  LayoutGrid,
  Mail,
  Check,
  X,
  Shield,
  Bell
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { inviteApi } from "@/api/invites";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function Workspaces() {
  const navigate = useNavigate();
  const { workspaces, switchWorkspace, createWorkspace, isLoading: isWorkspacesLoading } = useWorkspace();
  const { user, logout } = useAuthStore();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Invites state
  const [invites, setInvites] = useState<any[]>([]);
  const [isLoadingInvites, setIsLoadingInvites] = useState(true);
  const [isAcceptingId, setIsAcceptingId] = useState<string | null>(null);

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      const data = await inviteApi.listMyInvites();
      setInvites(data);
    } catch (err) {
      console.error("Failed to fetch invites", err);
    } finally {
      setIsLoadingInvites(false);
    }
  };

  const handleAcceptInvite = async (inviteId: string) => {
    setIsAcceptingId(inviteId);
    try {
      await inviteApi.accept(inviteId);
      // Refresh the page to show new workspace in list
      window.location.reload();
    } catch (err) {
      console.error("Failed to accept invite", err);
      setIsAcceptingId(null);
    }
  };

  const handleSelect = (id: string) => {
    switchWorkspace(id);
    navigate("/dashboard");
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;

    setIsCreating(true);
    try {
      await createWorkspace(newWorkspaceName);
      setShowCreateDialog(false);
      setNewWorkspaceName(""); // Reset input
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create workspace");
    } finally {
      setIsCreating(false);
    }
  };

  if (isWorkspacesLoading) return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-brand h-10 w-10" />
        <p className="text-muted-foreground animate-pulse">Loading workspaces...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Navbar / Header */}
      <header className="relative z-10 w-full border-b border-border bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="OrcaBase Logo" className="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
            <p className="text-base md:text-lg font-bold text-foreground">ORCA<span className="text-gradient">BASE</span></p>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  {invites.length > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-background-surface border-border">
                <div className="px-4 py-3 font-medium border-b border-border">
                  Notifications
                </div>
                {invites.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No new notifications
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {invites.map((invite: any) => (
                      <div key={invite.id} className="p-4 border-b border-border last:border-0 hover:bg-background-shell/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-foreground">
                              Invitation to join <span className="text-brand">{invite.workspace_name}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Role: <span className="capitalize">{invite.role}</span>
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="h-8 bg-brand text-brand-foreground hover:bg-brand-dark"
                            onClick={() => handleAcceptInvite(invite.id)}
                            disabled={isAcceptingId === invite.id}
                          >
                            {isAcceptingId === invite.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Accept"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-background-shell border border-border">
              <div className="h-6 w-6 rounded-full bg-gradient-brand flex items-center justify-center text-[10px] text-white font-bold">
                {user?.email?.[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-foreground">{user?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { logout(); navigate("/login"); }}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Select a workspace to prompt, manage, and collaborate with your AI agents.
          </p>
        </div>



        {/* Workspaces List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground-secondary">
              <LayoutGrid className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Your Workspaces</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Card */}
            <button
              onClick={() => setShowCreateDialog(true)}
              className="group relative flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-border hover:border-brand/50 hover:bg-brand/5 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-full bg-background-surface border border-border flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-brand/50 transition-all duration-300 shadow-sm">
                <Plus className="h-6 w-6 text-muted-foreground group-hover:text-brand" />
              </div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-brand transition-colors">Create Workspace</h3>
              <p className="text-sm text-muted-foreground mt-1">Start a new team or project</p>
            </button>

            {/* Existing Workspaces */}
            {workspaces.map(ws => (
              <div
                key={ws.id}
                onClick={() => handleSelect(ws.id)}
                className="group relative flex flex-col p-6 h-48 bg-card/60 backdrop-blur-md border border-border rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-elegant hover:border-brand/50 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/0 to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex justify-between items-start mb-auto">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-background-surface to-background border border-white/5 flex items-center justify-center shadow-inner">
                    <Building2 className="h-6 w-6 text-brand" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="h-5 w-5 text-brand" />
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="font-bold text-xl text-foreground mb-1 group-hover:text-brand transition-colors line-clamp-1">
                    {ws.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground bg-background/50 px-2 py-0.5 rounded border border-white/5">
                      {ws.id.slice(0, 8)}...
                    </span>
                    {/* Could add member count here if available */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Workspace Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-background-surface/95 backdrop-blur-xl border-border sm:max-w-md shadow-2xl">
          <DialogHeader>
            <div className="h-12 w-12 bg-brand/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Plus className="h-6 w-6 text-brand" />
            </div>
            <DialogTitle className="text-center text-xl">Create a new workspace</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Give your new workspace a name to get started.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateWorkspace} className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="workspace-name"
                    placeholder="e.g. Acme Corp"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    className="pl-9 bg-background/50 border-input focus:border-brand transition-colors"
                    autoFocus
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-8 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowCreateDialog(false)}
                className="hover:bg-background/50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand hover:bg-brand-dark text-white min-w-[100px]"
                disabled={!newWorkspaceName.trim() || isCreating}
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}