import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Mail,
  Download,
  Eye,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Report {
  id: string;
  name: string;
  description: string;
  schedule: string;
  frequency: "weekly" | "monthly";
  metrics: string[];
  lastSent: string;
  nextSend: string;
  format: "HTML" | "PDF";
  recipients: number;
  trendData: { date: string; value: number }[];
  keyMetrics: { label: string; value: string; change: number }[];
  aiSummary: string;
}

const reports: Report[] = [
  {
    id: "weekly-summary",
    name: "Weekly Summary",
    description: "Overview of key business metrics and trends from the past week",
    schedule: "Every Monday, 9:00 AM",
    frequency: "weekly",
    metrics: ["Total Queries", "Success Rate", "Response Time", "User Satisfaction"],
    lastSent: "Dec 23, 2025",
    nextSend: "Dec 30, 2025",
    format: "HTML",
    recipients: 12,
    trendData: [
      { date: "Mon", value: 420 },
      { date: "Tue", value: 380 },
      { date: "Wed", value: 510 },
      { date: "Thu", value: 470 },
      { date: "Fri", value: 590 },
      { date: "Sat", value: 320 },
      { date: "Sun", value: 280 },
    ],
    keyMetrics: [
      { label: "Total Queries", value: "2,970", change: 12 },
      { label: "Success Rate", value: "94.2%", change: 2.1 },
      { label: "Avg Response", value: "1.2s", change: -8 },
    ],
    aiSummary: "Query volume increased 12% week-over-week, with Friday showing peak activity. Response times improved by 8%, likely due to recent infrastructure optimizations. User satisfaction remains stable at 4.6/5 stars.",
  },
  {
    id: "monthly-performance",
    name: "Monthly Performance",
    description: "Comprehensive monthly analysis with department breakdowns",
    schedule: "1st of each month, 8:00 AM",
    frequency: "monthly",
    metrics: ["Revenue Impact", "Cost Savings", "Query Volume", "Department Usage", "Top Questions"],
    lastSent: "Dec 1, 2025",
    nextSend: "Jan 1, 2026",
    format: "PDF",
    recipients: 8,
    trendData: [
      { date: "W1", value: 2100 },
      { date: "W2", value: 2450 },
      { date: "W3", value: 2280 },
      { date: "W4", value: 2970 },
    ],
    keyMetrics: [
      { label: "Total Queries", value: "9,800", change: 18 },
      { label: "Cost Savings", value: "$12.4K", change: 24 },
      { label: "Active Users", value: "156", change: 15 },
    ],
    aiSummary: "December showed strong growth with 18% more queries than November. The Sales team drove 40% of total usage, primarily for pricing and inventory questions. Estimated cost savings reached $12.4K through automated responses.",
  },
];

function MiniTrendChart({ data, color }: { data: { date: string; value: number }[]; color: string }) {
  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ReportCard({
  report,
  isSelected,
  onSelect,
}: {
  report: Report;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all card-hover ${
        isSelected ? "ring-2 ring-brand border-brand" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{report.name}</CardTitle>
            <p className="text-sm text-foreground-secondary">{report.description}</p>
          </div>
          <Badge
            variant="outline"
            className={
              report.frequency === "weekly"
                ? "border-brand/30 bg-brand/10 text-brand"
                : "border-accent/30 bg-accent/10 text-accent"
            }
          >
            {report.frequency}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-foreground-secondary">
            <Calendar className="h-4 w-4" />
            <span>{report.schedule}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground-secondary">
            <Mail className="h-4 w-4" />
            <span>{report.recipients} recipients</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {report.metrics.slice(0, 3).map((metric) => (
            <Badge key={metric} variant="secondary" className="text-xs">
              {metric}
            </Badge>
          ))}
          {report.metrics.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{report.metrics.length - 3} more
            </Badge>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-foreground-secondary">
            <Clock className="h-4 w-4" />
            <span>Last sent: {report.lastSent}</span>
          </div>
          <Badge
            variant="outline"
            className={
              report.format === "HTML"
                ? "border-info/30 bg-info/10 text-info"
                : "border-warning/30 bg-warning/10 text-warning"
            }
          >
            {report.format}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function ReportPreviewPanel({ report }: { report: Report }) {
  return (
    <Card className="h-fit sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand" />
            <CardTitle className="text-lg">Report Preview</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View Full
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        <p className="text-sm text-foreground-secondary">{report.name}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Key Metrics
          </h4>
          <div className="grid gap-3">
            {report.keyMetrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary"
              >
                <div>
                  <p className="text-sm text-foreground-secondary">{metric.label}</p>
                  <p className="text-xl font-semibold">{metric.value}</p>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    metric.change > 0 ? "text-success" : metric.change < 0 ? "text-error" : "text-foreground-secondary"
                  }`}
                >
                  {metric.change > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : metric.change < 0 ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : null}
                  <span>{metric.change > 0 ? "+" : ""}{metric.change}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Trend Chart */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground-secondary">Trend</h4>
          <div className="p-3 rounded-lg bg-surface-secondary">
            <MiniTrendChart
              data={report.trendData}
              color={report.frequency === "weekly" ? "hsl(var(--brand))" : "hsl(var(--accent))"}
            />
          </div>
        </div>

        {/* AI Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            AI Summary
          </h4>
          <div className="p-4 rounded-lg bg-surface-secondary border border-border">
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {report.aiSummary}
            </p>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground-secondary">Delivery</h4>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary">
            <div className="space-y-1">
              <p className="text-sm">Next scheduled send</p>
              <p className="text-sm font-medium">{report.nextSend}</p>
            </div>
            <Badge
              className={
                report.format === "HTML"
                  ? "bg-info/10 text-info border-info/30"
                  : "bg-warning/10 text-warning border-warning/30"
              }
              variant="outline"
            >
              {report.format}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<Report>(reports[0]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-foreground-secondary">
              Automated reports and performance summaries
            </p>
          </div>
          <Button className="bg-brand hover:bg-brand-hover">
            <FileText className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Report Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Scheduled Reports</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  isSelected={selectedReport.id === report.id}
                  onSelect={() => setSelectedReport(report)}
                />
              ))}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="hidden lg:block">
            <ReportPreviewPanel report={selectedReport} />
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="lg:hidden">
          <ReportPreviewPanel report={selectedReport} />
        </div>
      </div>
    </>
  );
}
