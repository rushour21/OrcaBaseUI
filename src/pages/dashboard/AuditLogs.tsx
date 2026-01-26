import { useState } from "react";
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Download,
  User,
  Database,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { DataFreshnessIndicator } from "@/components/dashboard/DataFreshnessIndicator";

interface AuditLogEntry {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  action: string;
  actionType: "query" | "config" | "data" | "auth";
  dataSource: string | null;
  timestamp: Date;
  ipAddress: string;
}

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: "1",
    user: { name: "John Doe", email: "john@acme.com", avatar: "JD" },
    action: "Show sales trend for last 14 days",
    actionType: "query",
    dataSource: "orders_db",
    timestamp: new Date(Date.now() - 300000),
    ipAddress: "192.168.1.45",
  },
  {
    id: "2",
    user: { name: "Sarah Chen", email: "sarah@acme.com", avatar: "SC" },
    action: "Updated chatbot greeting message",
    actionType: "config",
    dataSource: null,
    timestamp: new Date(Date.now() - 1800000),
    ipAddress: "192.168.1.22",
  },
  {
    id: "3",
    user: { name: "Mike Johnson", email: "mike@acme.com", avatar: "MJ" },
    action: "Why did orders drop yesterday?",
    actionType: "query",
    dataSource: "orders_db",
    timestamp: new Date(Date.now() - 3600000),
    ipAddress: "10.0.0.15",
  },
  {
    id: "4",
    user: { name: "Emily Davis", email: "emily@acme.com", avatar: "ED" },
    action: "Uploaded Company_Policies.pdf",
    actionType: "data",
    dataSource: "documents",
    timestamp: new Date(Date.now() - 7200000),
    ipAddress: "192.168.1.88",
  },
  {
    id: "5",
    user: { name: "John Doe", email: "john@acme.com", avatar: "JD" },
    action: "What is our remote work policy?",
    actionType: "query",
    dataSource: "Company_Policies.pdf",
    timestamp: new Date(Date.now() - 10800000),
    ipAddress: "192.168.1.45",
  },
  {
    id: "6",
    user: { name: "Admin User", email: "admin@acme.com", avatar: "AU" },
    action: "Created new API key",
    actionType: "auth",
    dataSource: null,
    timestamp: new Date(Date.now() - 14400000),
    ipAddress: "10.0.0.1",
  },
  {
    id: "7",
    user: { name: "Sarah Chen", email: "sarah@acme.com", avatar: "SC" },
    action: "How many orders shipped this week?",
    actionType: "query",
    dataSource: "orders_db",
    timestamp: new Date(Date.now() - 18000000),
    ipAddress: "192.168.1.22",
  },
  {
    id: "8",
    user: { name: "Mike Johnson", email: "mike@acme.com", avatar: "MJ" },
    action: "Connected production database",
    actionType: "data",
    dataSource: "postgres_main",
    timestamp: new Date(Date.now() - 86400000),
    ipAddress: "10.0.0.15",
  },
];

const actionTypeConfig = {
  query: { label: "Query", icon: MessageSquare, color: "bg-brand/10 text-brand border-brand/20" },
  config: { label: "Config", icon: Settings, color: "bg-accent/10 text-accent-foreground border-accent/20" },
  data: { label: "Data", icon: Database, color: "bg-success/10 text-success border-success/20" },
  auth: { label: "Auth", icon: User, color: "bg-warning/10 text-warning border-warning/20" },
};

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { currentWorkspace } = useWorkspace();
  const logsPerPage = 10;

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.dataSource?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesType = actionFilter === "all" || log.actionType === actionFilter;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-foreground-secondary mt-1">
            {currentWorkspace.name} • Track all user activity and system events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DataFreshnessIndicator lastUpdated={new Date()} />
          <Button variant="outline" className="border-border text-foreground-secondary hover:text-foreground">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="rounded-lg border border-brand/20 bg-brand/5 p-4 flex items-start gap-3">
        <ClipboardList className="h-5 w-5 text-brand shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Enterprise Audit Trail</p>
          <p className="text-xs text-foreground-secondary mt-0.5">
            All user queries, configuration changes, and data access events are logged for compliance and security monitoring.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <Input
            placeholder="Search by user, action, or data source..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background-shell border-border"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-36 bg-background-shell border-border">
            <Filter className="h-4 w-4 mr-2 text-foreground-muted" />
            <SelectValue placeholder="Action type" />
          </SelectTrigger>
          <SelectContent className="bg-background-surface border-border">
            <SelectItem value="all">All actions</SelectItem>
            <SelectItem value="query">Queries</SelectItem>
            <SelectItem value="config">Config</SelectItem>
            <SelectItem value="data">Data</SelectItem>
            <SelectItem value="auth">Auth</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-border text-foreground-secondary hover:text-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          Date range
        </Button>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-foreground-secondary font-medium">User</TableHead>
              <TableHead className="text-foreground-secondary font-medium">Action / Question</TableHead>
              <TableHead className="text-foreground-secondary font-medium">Type</TableHead>
              <TableHead className="text-foreground-secondary font-medium">Data Source</TableHead>
              <TableHead className="text-foreground-secondary font-medium">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((log) => {
              const typeConfig = actionTypeConfig[log.actionType];
              const TypeIcon = typeConfig.icon;
              
              return (
                <TableRow key={log.id} className="border-border hover:bg-background-shell/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand text-xs font-semibold">
                        {log.user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{log.user.name}</p>
                        <p className="text-xs text-foreground-muted">{log.user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-foreground max-w-[300px] truncate">
                      {log.action}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${typeConfig.color}`}
                    >
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {typeConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {log.dataSource ? (
                      <div className="flex items-center gap-1.5 text-sm text-foreground-secondary">
                        {log.dataSource.endsWith(".pdf") ? (
                          <FileText className="h-3.5 w-3.5" />
                        ) : (
                          <Database className="h-3.5 w-3.5" />
                        )}
                        {log.dataSource}
                      </div>
                    ) : (
                      <span className="text-xs text-foreground-muted">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground-secondary">
                      {formatTimestamp(log.timestamp)}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-foreground-muted">
            Showing {(currentPage - 1) * logsPerPage + 1} to {Math.min(currentPage * logsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-foreground-secondary px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-border"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
