import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Copy,
  Trash2,
  Check,
  AlertTriangle,
} from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useToast } from "@/components/ui/use-toast";
import api from "@/api/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const { currentWorkspace, refreshWorkspaces } = useWorkspace();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState(currentWorkspace?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyApiKey = () => {
    if (currentWorkspace?.public_api_key) {
      navigator.clipboard.writeText(currentWorkspace.public_api_key);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "API key copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveWorkspaceName = async () => {
    if (!workspaceName.trim()) {
      toast({
        title: "Error",
        description: "Workspace name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      await api.patch(`/api/workspaces/${currentWorkspace?.id}`, {
        name: workspaceName,
      });
      toast({
        title: "Success",
        description: "Workspace name updated",
      });
      await refreshWorkspaces();
    } catch (error: any) {
      console.error("Failed to update workspace", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update workspace",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteWorkspace = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/api/workspaces/${currentWorkspace?.id}`);
      toast({
        title: "Success",
        description: "Workspace deleted successfully",
      });
      // Refresh workspaces and navigate to dashboard
      await refreshWorkspaces();
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Failed to delete workspace", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete workspace",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Workspace Settings</h1>
        <p className="text-foreground-secondary mt-1">
          Manage your workspace configuration
        </p>
      </div>

      {/* Workspace Settings */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">General</h2>

        <div className="space-y-6">
          {/* Workspace Name */}
          <div className="space-y-2">
            <Label className="text-foreground">Workspace Name</Label>
            <div className="flex gap-2">
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="max-w-md bg-background-shell border-border text-foreground"
                placeholder="Enter workspace name"
              />
              <Button
                onClick={handleSaveWorkspaceName}
                disabled={isSaving || workspaceName === currentWorkspace?.name}
                className="bg-brand text-brand-foreground hover:bg-brand-dark"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label className="text-foreground">Public API Key</Label>
            <p className="text-xs text-foreground-muted mb-2">
              Use this key to integrate the chatbot widget on your website
            </p>
            <div className="flex items-center gap-2">
              <Input
                value={currentWorkspace?.public_api_key || ""}
                readOnly
                className="max-w-md bg-background-shell border-border text-foreground-secondary font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyApiKey}
                className="border-border text-foreground-secondary hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-error/30 bg-error/5 p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-error mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-error mb-1">Danger Zone</h2>
            <p className="text-sm text-foreground-secondary">
              Permanently delete this workspace and all its data including documents, chat history, and analytics. This action cannot be undone.
            </p>
          </div>
        </div>
        <Button
          variant="destructive"
          className="gap-2"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4" />
          Delete Workspace
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-background border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground-secondary">
              This will permanently delete the workspace <span className="font-semibold text-foreground">"{currentWorkspace?.name}"</span> and all associated data including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>All uploaded documents and embeddings</li>
                <li>Chat history and sessions</li>
                <li>Analytics and usage data</li>
                <li>Team members and invitations</li>
              </ul>
              <p className="mt-3 font-semibold text-error">This action cannot be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteWorkspace}
              disabled={isDeleting}
              className="bg-error text-error-foreground hover:bg-error/90"
            >
              {isDeleting ? "Deleting..." : "Delete Workspace"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
