import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Plus, ArrowRight, Loader2, LogOut, LayoutGrid } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Workspaces() {
  const navigate = useNavigate();
  const { workspaces, switchWorkspace, createWorkspace, isLoading } = useWorkspace();
  const { user, logout } = useAuthStore();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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

  if (isLoading) return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-brand h-10 w-10" />
        <p className="text-muted-foreground animate-pulse">Loading workspaces...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient">Universal AI</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Select a workspace to continue
            </p>
          </div>

          <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm p-2 pr-6 rounded-full border border-border">
            <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold shadow-lg">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{user?.email}</span>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="text-xs text-muted-foreground hover:text-brand transition-colors text-left flex items-center gap-1"
              >
                <LogOut className="h-3 w-3" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Workspaces Grid */}
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
            <p className="text-sm text-muted-foreground mt-1">Start a new project</p>
          </button>

          {/* Existing Workspaces */}
          {workspaces.map(ws => (
            <div
              key={ws.id}
              onClick={() => handleSelect(ws.id)}
              className="group relative flex flex-col p-6 h-48 bg-card/40 backdrop-blur-md border border-border rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-elegant hover:border-brand/50 hover:-translate-y-1"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Workspace Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-background-surface/95 backdrop-blur-xl border-border sm:max-w-md shadow-2xl">
          <DialogHeader>
            <div className="h-12 w-12 bg-brand/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <LayoutGrid className="h-6 w-6 text-brand" />
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