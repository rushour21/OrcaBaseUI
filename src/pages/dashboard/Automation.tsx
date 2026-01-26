import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bell,
  Plus,
  Zap,
  Pause,
  Play,
  Trash2,
  Edit,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    name: "Daily orders below 50",
    metric: "orders",
    condition: "<",
    threshold: "50",
    frequency: "daily",
    status: "active" as const,
    lastTriggered: "Dec 25, 2024 at 9:00 AM",
    triggerCount: 3,
  },
  {
    id: 2,
    name: "Refunds increased by 20%",
    metric: "refunds",
    condition: "% change",
    threshold: "20",
    frequency: "daily",
    status: "active" as const,
    lastTriggered: "Dec 22, 2024 at 11:30 AM",
    triggerCount: 1,
  },
  {
    id: 3,
    name: "Revenue drops below $5,000",
    metric: "revenue",
    condition: "<",
    threshold: "5000",
    frequency: "daily",
    status: "paused" as const,
    lastTriggered: "Dec 18, 2024 at 8:00 AM",
    triggerCount: 5,
  },
  {
    id: 4,
    name: "New signups exceed 100",
    metric: "signups",
    condition: ">",
    threshold: "100",
    frequency: "weekly",
    status: "active" as const,
    lastTriggered: "Never",
    triggerCount: 0,
  },
  {
    id: 5,
    name: "Customer churn rate above 5%",
    metric: "churn_rate",
    condition: ">",
    threshold: "5",
    frequency: "weekly",
    status: "active" as const,
    lastTriggered: "Dec 20, 2024 at 2:00 PM",
    triggerCount: 2,
  },
];

const metrics = [
  { value: "orders", label: "Orders" },
  { value: "revenue", label: "Revenue" },
  { value: "refunds", label: "Refunds" },
  { value: "signups", label: "New Signups" },
  { value: "active_users", label: "Active Users" },
  { value: "churn_rate", label: "Churn Rate" },
  { value: "avg_order_value", label: "Avg Order Value" },
  { value: "support_tickets", label: "Support Tickets" },
];

const conditions = [
  { value: "<", label: "Less than", icon: TrendingDown },
  { value: ">", label: "Greater than", icon: TrendingUp },
  { value: "% change", label: "Percentage change", icon: AlertTriangle },
];

const frequencies = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

export default function Automation() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: "",
    metric: "",
    condition: "",
    threshold: "",
    frequency: "daily",
  });

  const handleToggleStatus = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? { ...alert, status: alert.status === "active" ? "paused" : "active" }
          : alert
      )
    );
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleCreateAlert = () => {
    if (!newAlert.name || !newAlert.metric || !newAlert.condition || !newAlert.threshold) {
      return;
    }

    const alert = {
      id: Date.now(),
      name: newAlert.name,
      metric: newAlert.metric,
      condition: newAlert.condition,
      threshold: newAlert.threshold,
      frequency: newAlert.frequency,
      status: "active" as const,
      lastTriggered: "Never",
      triggerCount: 0,
    };

    setAlerts((prev) => [alert, ...prev]);
    setNewAlert({ name: "", metric: "", condition: "", threshold: "", frequency: "daily" });
    setDialogOpen(false);
  };

  const getConditionDisplay = (condition: string, threshold: string, metric: string) => {
    const metricLabel = metrics.find((m) => m.value === metric)?.label || metric;
    if (condition === "% change") {
      return `${metricLabel} changes by ${threshold}%`;
    }
    return `${metricLabel} ${condition} ${threshold}`;
  };

  const activeCount = alerts.filter((a) => a.status === "active").length;
  const pausedCount = alerts.filter((a) => a.status === "paused").length;
  const triggeredToday = alerts.filter((a) => a.lastTriggered.includes("Dec 26")).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Automation</h1>
          <p className="text-foreground-secondary mt-1">
            Set up alerts and automated actions based on your data
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-brand-foreground hover:bg-brand-dark">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background-surface border-border sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Alert</DialogTitle>
              <DialogDescription className="text-foreground-secondary">
                Get notified when your metrics meet specific conditions
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Alert Name */}
              <div className="space-y-2">
                <Label className="text-foreground">Alert Name</Label>
                <Input
                  placeholder="e.g., Daily orders below 50"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                  className="bg-background-shell border-border text-foreground placeholder:text-foreground-muted"
                />
              </div>

              {/* Metric Selector */}
              <div className="space-y-2">
                <Label className="text-foreground">Metric</Label>
                <Select
                  value={newAlert.metric}
                  onValueChange={(value) => setNewAlert({ ...newAlert, metric: value })}
                >
                  <SelectTrigger className="bg-background-shell border-border text-foreground">
                    <SelectValue placeholder="Select a metric" />
                  </SelectTrigger>
                  <SelectContent className="bg-background-surface border-border">
                    {metrics.map((metric) => (
                      <SelectItem key={metric.value} value={metric.value}>
                        {metric.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Condition Selector */}
              <div className="space-y-2">
                <Label className="text-foreground">Condition</Label>
                <div className="grid grid-cols-3 gap-2">
                  {conditions.map((cond) => (
                    <button
                      key={cond.value}
                      onClick={() => setNewAlert({ ...newAlert, condition: cond.value })}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all",
                        newAlert.condition === cond.value
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-border bg-background-shell text-foreground-secondary hover:border-brand/50"
                      )}
                    >
                      <cond.icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{cond.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Threshold Input */}
              <div className="space-y-2">
                <Label className="text-foreground">
                  Threshold {newAlert.condition === "% change" && "(%)"}
                </Label>
                <Input
                  type="number"
                  placeholder={newAlert.condition === "% change" ? "e.g., 20" : "e.g., 50"}
                  value={newAlert.threshold}
                  onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
                  className="bg-background-shell border-border text-foreground placeholder:text-foreground-muted"
                />
              </div>

              {/* Frequency Selector */}
              <div className="space-y-2">
                <Label className="text-foreground">Check Frequency</Label>
                <Select
                  value={newAlert.frequency}
                  onValueChange={(value) => setNewAlert({ ...newAlert, frequency: value })}
                >
                  <SelectTrigger className="bg-background-shell border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background-surface border-border">
                    {frequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-border text-foreground-secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateAlert}
                className="bg-brand text-brand-foreground hover:bg-brand-dark"
                disabled={!newAlert.name || !newAlert.metric || !newAlert.condition || !newAlert.threshold}
              >
                Create Alert
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Zap className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeCount}</p>
              <p className="text-sm text-foreground-secondary">Active Alerts</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Pause className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pausedCount}</p>
              <p className="text-sm text-foreground-secondary">Paused Alerts</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
              <Bell className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{triggeredToday}</p>
              <p className="text-sm text-foreground-secondary">Triggered Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">All Alerts</h2>
          <p className="text-sm text-foreground-secondary">{alerts.length} total</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-foreground-secondary">Name</TableHead>
              <TableHead className="text-foreground-secondary">Condition</TableHead>
              <TableHead className="text-foreground-secondary">Frequency</TableHead>
              <TableHead className="text-foreground-secondary">Status</TableHead>
              <TableHead className="text-foreground-secondary">Last Triggered</TableHead>
              <TableHead className="text-foreground-secondary text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} className="border-border">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        alert.status === "active" ? "bg-brand/10" : "bg-foreground-muted/10"
                      )}
                    >
                      <Bell
                        className={cn(
                          "h-4 w-4",
                          alert.status === "active" ? "text-brand" : "text-foreground-muted"
                        )}
                      />
                    </div>
                    <span className="font-medium text-foreground">{alert.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-foreground-secondary">
                    {getConditionDisplay(alert.condition, alert.threshold, alert.metric)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-foreground-secondary">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="capitalize">{alert.frequency}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alert.status === "active"}
                      onCheckedChange={() => handleToggleStatus(alert.id)}
                      className="data-[state=checked]:bg-brand"
                    />
                    <span
                      className={cn(
                        "text-xs font-medium capitalize",
                        alert.status === "active" ? "text-success" : "text-foreground-muted"
                      )}
                    >
                      {alert.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {alert.lastTriggered === "Never" ? (
                      <span className="text-foreground-muted text-sm">Never</span>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                        <span className="text-foreground-secondary text-sm">
                          {alert.lastTriggered}
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground-secondary hover:text-foreground hover:bg-background-shell"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleStatus(alert.id)}
                      className="h-8 w-8 text-foreground-secondary hover:text-foreground hover:bg-background-shell"
                    >
                      {alert.status === "active" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="h-8 w-8 text-foreground-secondary hover:text-error hover:bg-error/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-background-shell flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-foreground-muted" />
            </div>
            <p className="text-foreground-secondary mb-2">No alerts configured</p>
            <p className="text-sm text-foreground-muted mb-4">
              Create your first alert to start monitoring your metrics
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-brand text-brand-foreground hover:bg-brand-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
