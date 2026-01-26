import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Terminal,
  Copy,
  CheckCircle2,
  Server,
  Activity,
  ArrowRight,
  Key,
  Database,
  Loader2,
  Columns,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { registerAgent, testAgentConnection, syncSchema, getTables, updateTableAccess, connectAgent } from "@/api/database";

export default function DatabasePage() {
  const [status, setStatus] = useState<"connected" | "disconnected">("disconnected");
  const [agentEndpoint, setAgentEndpoint] = useState("");
  const [agentToken, setAgentToken] = useState("");
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const tablesData = await getTables();
      if (tablesData && tablesData.length > 0) {
        setTables(tablesData);
        setStatus("connected");
      }
    } catch (error) {
      // Silent fail if not connected yet or no tables
      console.log("Not connected or no tables yet");
    }
  };

  const generateToken = () => {
    const token = `agent_${crypto.randomUUID().replace(/-/g, "")}`;
    setAgentToken(token);
  };

  const handleTestConnection = async () => {
    if (!agentEndpoint || !agentToken) {
      toast.error("Please provide both endpoint and token");
      return;
    }

    setLoading(true);
    try {
      await testAgentConnection({ agent_url: agentEndpoint, agent_token: agentToken });
      toast.success("Connection successful! You can now save.");
    } catch (error: any) {
      const msg = error.response?.data?.error || error.message || "Connection failed";
      toast.error(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndSync = async () => {
    if (!agentEndpoint || !agentToken) {
      toast.error("Please provide both endpoint and token");
      return;
    }

    setLoading(true);
    try {
      // Consolidated call (Test -> Save -> Sync)
      const data = await connectAgent({ agent_url: agentEndpoint, agent_token: agentToken });

      setTables(data.tables || []);
      setStatus("connected");
      toast.success("Agent saved and schema synced successfully!");
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.error || error.message || "Failed to save";
      toast.error(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResync = async () => {
    setSyncing(true);
    try {
      await syncSchema();
      const tablesData = await getTables();
      setTables(tablesData);
      toast.success("Schema resynced successfully");
    } catch (error: any) {
      toast.error("Failed to resync schema");
    } finally {
      setSyncing(false);
    }
  };

  const handleToggleTable = async (tableName: string, currentAllowed: boolean) => {
    try {
      const newAllowed = !currentAllowed;
      // Optimistic update
      setTables(prev => prev.map(t => t.name === tableName ? { ...t, allowed: newAllowed } : t));

      await updateTableAccess(tableName, newAllowed);
      toast.success(`Table ${tableName} ${newAllowed ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error("Failed to update table access");
      // Revert on error
      setTables(prev => prev.map(t => t.name === tableName ? { ...t, allowed: currentAllowed } : t));
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      {/* Header */}
      {/* ... (keep header) ... */}

      {/* ... (keep step 1 & 2) ... */}

      {/* Step 3 — Register Agent */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-brand" />
            Step 3 — Register Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Agent Endpoint</label>
            <Input
              placeholder="http://10.0.0.5:3001"
              value={agentEndpoint}
              onChange={(e) => setAgentEndpoint(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Agent Token</label>
            <Input value={agentToken} onChange={(e) => setAgentToken(e.target.value)} placeholder="Paste token here if already generated" />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={loading}
            >
              Test Connection
            </Button>
            <Button
              className="bg-brand hover:bg-brand-dark"
              onClick={handleSaveAndSync}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "Saving..." : "Save & Sync Schema"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ... (rest of file) ... */}

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-info" />
            Agent Status
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {status === "connected" ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <Server className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium">
                {status === "connected" ? "Connected" : "Not Connected"}
              </p>
              <p className="text-xs text-muted-foreground">
                {status === "connected" ? "Schema synced and ready for queries" : "Waiting for connection..."}
              </p>
            </div>
          </div>
          <StatusBadge status={status === "connected" ? "success" : "warning"}>
            {status}
          </StatusBadge>
        </CardContent>
      </Card>

      {/* Tables List */}
      {status === "connected" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-accent" />
              Schema Browser
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleResync} disabled={syncing}>
              {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              <span className="ml-2">Resync</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Columns</TableHead>
                  <TableHead>Access Control</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tables.map((table) => (
                  <TableRow key={table.name}>
                    <TableCell className="font-mono text-sm">
                      {table.name}
                    </TableCell>
                    <TableCell>{table.columns.length}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={table.allowed}
                          onCheckedChange={() => handleToggleTable(table.name, table.allowed)}
                        />
                        <span className={table.allowed ? "text-success text-xs" : "text-muted-foreground text-xs"}>
                          {table.allowed ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {tables.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">No tables found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Next */}
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="font-medium">Next step</p>
            <p className="text-sm text-muted-foreground">
              Start asking questions using Database Chat
            </p>
          </div>
          <Button className="gap-2">
            Go to Database Chat <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
