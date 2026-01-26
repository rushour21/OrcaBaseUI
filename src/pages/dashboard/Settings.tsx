import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Building2,
  Bell,
  Shield,
  Key,
  Trash2,
  Upload,
  Copy,
  RefreshCw,
} from "lucide-react";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Acme Corp");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground-secondary mt-1">
          Manage your workspace preferences and configuration
        </p>
      </div>

      <Tabs defaultValue="workspace" className="space-y-6">
        <TabsList className="bg-background-shell border border-border">
          <TabsTrigger value="workspace" className="data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
            <Building2 className="h-4 w-4 mr-2" />
            Workspace
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* Workspace Tab */}
        <TabsContent value="workspace" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Workspace Settings</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-foreground">Workspace Name</Label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="max-w-md bg-background-shell border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Workspace Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent text-accent-foreground text-2xl font-bold">
                    A
                  </div>
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-background-shell gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-xs text-foreground-muted">
                  Recommended: 256x256px, PNG or JPG
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Workspace ID</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value="ws_abc123xyz789"
                    readOnly
                    className="max-w-md bg-background-shell border-border text-foreground-secondary font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border text-foreground-secondary hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="bg-brand text-brand-foreground hover:bg-brand-dark">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-error/30 bg-error/5 p-6">
            <h2 className="text-lg font-semibold text-error mb-2">Danger Zone</h2>
            <p className="text-sm text-foreground-secondary mb-4">
              Permanently delete this workspace and all its data. This action cannot be undone.
            </p>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Workspace
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Email Notifications</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-background-shell p-4">
                <div>
                  <p className="font-medium text-foreground">Weekly Usage Report</p>
                  <p className="text-sm text-foreground-secondary">
                    Receive a summary of queries and analytics
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background-shell p-4">
                <div>
                  <p className="font-medium text-foreground">Usage Alerts</p>
                  <p className="text-sm text-foreground-secondary">
                    Get notified when reaching 80% of query limit
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background-shell p-4">
                <div>
                  <p className="font-medium text-foreground">Document Indexing</p>
                  <p className="text-sm text-foreground-secondary">
                    Notify when document indexing completes or fails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background-shell p-4">
                <div>
                  <p className="font-medium text-foreground">Product Updates</p>
                  <p className="text-sm text-foreground-secondary">
                    New features and improvements
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <Button className="mt-6 bg-brand text-brand-foreground hover:bg-brand-dark">
              Save Preferences
            </Button>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Security Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-background-shell p-4">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-foreground-secondary">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-background"
                >
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background-shell p-4">
                <div>
                  <p className="font-medium text-foreground">Session Timeout</p>
                  <p className="text-sm text-foreground-secondary">
                    Automatically log out after inactivity
                  </p>
                </div>
                <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>Never</option>
                </select>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background-shell p-4">
                <div>
                  <p className="font-medium text-foreground">Login Notifications</p>
                  <p className="text-sm text-foreground-secondary">
                    Get alerted of new login attempts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Active Sessions</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background-shell">
                <div>
                  <p className="font-medium text-foreground">Chrome on macOS</p>
                  <p className="text-sm text-foreground-muted">Current session • Mumbai, India</p>
                </div>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-background-shell">
                <div>
                  <p className="font-medium text-foreground">Safari on iPhone</p>
                  <p className="text-sm text-foreground-muted">2 days ago • Delhi, India</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
                <p className="text-sm text-foreground-secondary">
                  Manage API keys for programmatic access
                </p>
              </div>
              <Button className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2">
                <Key className="h-4 w-4" />
                Create New Key
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background-shell">
                <div>
                  <p className="font-medium text-foreground">Production Key</p>
                  <p className="text-sm text-foreground-muted font-mono">sk_live_****************************7f2d</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground-muted">Created Jan 5, 2024</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground-secondary hover:text-foreground gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Rotate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background-shell">
                <div>
                  <p className="font-medium text-foreground">Development Key</p>
                  <p className="text-sm text-foreground-muted font-mono">sk_test_****************************3a1b</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground-muted">Created Jan 10, 2024</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground-secondary hover:text-foreground gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Rotate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-warning/5 border border-warning/20">
              <p className="text-sm text-foreground">
                <strong>Security tip:</strong> Never share your API keys publicly or commit them to version control.
                Use environment variables instead.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
