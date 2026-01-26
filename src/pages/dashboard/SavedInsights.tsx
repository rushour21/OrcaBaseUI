import { useState } from "react";
import { 
  Bookmark, 
  BarChart3, 
  MessageSquare, 
  Trash2, 
  ExternalLink,
  Clock,
  Database,
  FileText,
  TrendingUp,
  TrendingDown,
  Filter,
  Search
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
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface SavedInsight {
  id: string;
  title: string;
  type: "chart" | "answer";
  source: "database" | "document";
  savedAt: Date;
  preview: string;
  trend?: "up" | "down" | "neutral";
  value?: string;
}

const mockSavedInsights: SavedInsight[] = [
  {
    id: "1",
    title: "Sales Trend - Last 14 Days",
    type: "chart",
    source: "database",
    savedAt: new Date(Date.now() - 3600000 * 2),
    preview: "Total revenue: $284,592 with 12% growth",
    trend: "up",
    value: "$284,592",
  },
  {
    id: "2",
    title: "Why did orders drop on Dec 25th?",
    type: "answer",
    source: "database",
    savedAt: new Date(Date.now() - 3600000 * 24),
    preview: "Orders dropped 32% due to Christmas Day holiday. This is expected based on historical patterns.",
    trend: "down",
  },
  {
    id: "3",
    title: "Remote Work Policy Summary",
    type: "answer",
    source: "document",
    savedAt: new Date(Date.now() - 3600000 * 48),
    preview: "Employees can work remotely up to 3 days per week after completing probation period.",
  },
  {
    id: "4",
    title: "Monthly Active Users Trend",
    type: "chart",
    source: "database",
    savedAt: new Date(Date.now() - 3600000 * 72),
    preview: "MAU increased 18% month-over-month, reaching 45,230 users.",
    trend: "up",
    value: "45,230",
  },
];

function formatSavedDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffHours < 1) return "Less than an hour ago";
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

export default function SavedInsights() {
  const [insights, setInsights] = useState(mockSavedInsights);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const { currentWorkspace } = useWorkspace();

  const filteredInsights = insights.filter((insight) => {
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || insight.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string) => {
    setInsights(insights.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Insights</h1>
          <p className="text-foreground-secondary mt-1">
            {currentWorkspace.name} • Charts and answers you've saved for quick reference
          </p>
        </div>
        <Badge variant="outline" className="border-brand/30 text-brand">
          <Bookmark className="h-3 w-3 mr-1" />
          {insights.length} saved
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <Input
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background-shell border-border"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40 bg-background-shell border-border">
            <Filter className="h-4 w-4 mr-2 text-foreground-muted" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-background-surface border-border">
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="chart">Charts</SelectItem>
            <SelectItem value="answer">Answers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Insights Grid */}
      {filteredInsights.length === 0 ? (
        <EmptyState
          type="no-data"
          title="No saved insights"
          description="Save charts and AI answers to access them quickly later. Click the bookmark icon on any insight to save it."
          icon={<Bookmark className="h-6 w-6 text-foreground-muted" />}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className="group rounded-xl border border-border bg-card p-5 hover:border-brand/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    insight.type === "chart" ? "bg-brand/10" : "bg-accent/10"
                  }`}>
                    {insight.type === "chart" ? (
                      <BarChart3 className="h-4 w-4 text-brand" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-accent-foreground" />
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      insight.source === "database" 
                        ? "border-brand/30 text-brand" 
                        : "border-accent/30 text-accent-foreground"
                    }`}
                  >
                    {insight.source === "database" ? (
                      <Database className="h-3 w-3 mr-1" />
                    ) : (
                      <FileText className="h-3 w-3 mr-1" />
                    )}
                    {insight.source === "database" ? "Database" : "Document"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-foreground-muted hover:text-foreground">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-foreground-muted hover:text-error"
                    onClick={() => handleDelete(insight.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Title & Preview */}
              <h3 className="font-medium text-foreground mb-2 line-clamp-1">
                {insight.title}
              </h3>
              <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">
                {insight.preview}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                  <Clock className="h-3 w-3" />
                  {formatSavedDate(insight.savedAt)}
                </div>
                {insight.trend && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    insight.trend === "up" ? "text-success" : 
                    insight.trend === "down" ? "text-error" : "text-foreground-muted"
                  }`}>
                    {insight.trend === "up" && <TrendingUp className="h-3 w-3" />}
                    {insight.trend === "down" && <TrendingDown className="h-3 w-3" />}
                    {insight.value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
