import { useEffect, useState } from "react";
import { MetricCard } from "@/components/ui/MetricCard";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  MessageSquare,
  FileText,
  TrendingUp,
  Upload,
  Plug,
  Settings,
  ArrowRight,
  Activity,
  Loader2
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Overview() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/api/rag/analytics");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-foreground-secondary mt-1">
          Welcome back! Here's what's happening with your AI assistant.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Total Queries"
            value={data?.totalQueries?.toString() || "0"}
            change="All time"
            changeType="neutral"
            icon={MessageSquare}
            iconColor="brand"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Documents Indexed"
            value={data?.documentsIndexed?.toString() || "0"}
            change="Active knowledge base"
            changeType="positive"
            icon={FileText}
            iconColor="accent"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="System Status"
            value="Online"
            change="RAG Pipeline Active"
            changeType="positive"
            icon={Activity}
            iconColor="success"
          />
        </motion.div>
      </motion.div>

      {/* Chart & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Query Trends</h2>
              <p className="text-sm text-foreground-secondary">Daily questions answered this week</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-brand" />
                <span className="text-foreground-secondary">Queries</span>
              </div>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chartData || []}>
                <defs>
                  <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(173, 42%, 38%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(173, 42%, 38%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
                <XAxis dataKey="date" stroke="hsl(218, 11%, 65%)" fontSize={12} />
                <YAxis stroke="hsl(218, 11%, 65%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 50%, 9%)",
                    border: "1px solid hsl(217, 33%, 17%)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(220, 14%, 91%)" }}
                />
                <Area
                  type="monotone"
                  dataKey="documents"
                  name="Queries"
                  stroke="hsl(173, 42%, 38%)"
                  fillOpacity={1}
                  fill="url(#colorDocs)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/dashboard/documents">
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border text-foreground hover:bg-background-shell group"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-brand/10 p-2">
                      <Upload className="h-4 w-4 text-brand" />
                    </div>
                    <span>Upload documents</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/dashboard/database">
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border text-foreground hover:bg-background-shell group"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2">
                      <Plug className="h-4 w-4 text-accent" />
                    </div>
                    <span>Connect database</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/dashboard/chatbot">
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border text-foreground hover:bg-background-shell group"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-info/10 p-2">
                      <Settings className="h-4 w-4 text-info" />
                    </div>
                    <span>Configure chatbot</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-foreground-secondary mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {data?.recentActivity?.length === 0 ? (
                <p className="text-sm text-foreground-muted">No activity yet</p>
              ) : (
                data?.recentActivity?.map((activity: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-background-shell/50 transition-colors"
                  >
                    <div className={`mt-1 h-2 w-2 rounded-full ${activity.type === 'query' ? 'bg-brand' : 'bg-accent'}`} />
                    <div>
                      <p className="text-sm text-foreground">
                        {activity.type === 'query' ? 'Query Answered' : 'Document Uploaded'}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        "{activity.description}" • {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
