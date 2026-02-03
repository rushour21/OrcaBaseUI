import { motion } from "framer-motion";
import { Activity, Zap, TrendingUp } from "lucide-react";

export function PerformanceMetrics() {
    const metrics = [
        { icon: Activity, label: "Latency", value: "240ms", color: "success" },
        { icon: TrendingUp, label: "Accuracy", value: "99.2%", color: "success" },
        { icon: Zap, label: "Tokens Optimized", value: "1.2M", color: "success" },
        { icon: Activity, label: "Uptime", value: "99.9%", color: "success" },
        { icon: TrendingUp, label: "Queries/sec", value: "1,847", color: "success" },
        { icon: Zap, label: "Avg Response", value: "1.2s", color: "success" },
    ];

    // Duplicate for seamless loop
    const duplicatedMetrics = [...metrics, ...metrics];

    return (
        <div className="relative overflow-hidden border-y border-border bg-background-shell/60 py-6">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none z-10" />

            <div className="flex items-center gap-3 mb-3 justify-center">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <p className="text-xs tracking-[0.2em] uppercase text-foreground-secondary font-semibold">
                    System Health • Live Metrics
                </p>
            </div>

            <div className="relative flex overflow-hidden">
                <motion.div
                    className="flex gap-8 pr-8"
                    animate={{
                        x: [0, -50 * metrics.length + "%"],
                    }}
                    transition={{
                        x: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedMetrics.map((metric, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-background-surface/80 border border-border/60 backdrop-blur-sm shrink-0"
                        >
                            <div className="rounded-full bg-success/10 p-2">
                                <metric.icon className="h-4 w-4 text-success" />
                            </div>
                            <div>
                                <p className="text-xs text-foreground-muted">{metric.label}</p>
                                <p className="text-sm font-semibold text-success">
                                    {metric.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
