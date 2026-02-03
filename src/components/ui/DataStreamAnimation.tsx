import { motion } from "framer-motion";
import { FileText, Database, Brain } from "lucide-react";

export function DataStreamAnimation() {
    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* SVG Container */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Document to Brain */}
                <motion.path
                    d="M 80 60 Q 150 60, 200 100"
                    stroke="hsl(var(--brand))"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{
                        pathLength: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 0.5 },
                    }}
                />

                {/* Database to Brain */}
                <motion.path
                    d="M 80 140 Q 150 140, 200 100"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{
                        pathLength: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3,
                        },
                        opacity: { duration: 0.5 },
                    }}
                />

                {/* Brain to Output */}
                <motion.path
                    d="M 200 100 L 320 100"
                    stroke="hsl(var(--brand))"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{
                        pathLength: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.6,
                        },
                        opacity: { duration: 0.5 },
                    }}
                />

                {/* Pulse circles at connection points */}
                <motion.circle
                    cx="80"
                    cy="60"
                    r="4"
                    fill="hsl(var(--brand))"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle
                    cx="80"
                    cy="140"
                    r="4"
                    fill="hsl(var(--accent))"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.3,
                    }}
                />
                <motion.circle
                    cx="200"
                    cy="100"
                    r="6"
                    fill="hsl(var(--brand))"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.6,
                    }}
                />
            </svg>

            {/* Icons */}
            <div className="absolute left-4 top-8">
                <motion.div
                    className="rounded-lg bg-brand/10 p-3 border border-brand/20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FileText className="h-6 w-6 text-brand" />
                </motion.div>
            </div>

            <div className="absolute left-4 bottom-8">
                <motion.div
                    className="rounded-lg bg-accent/10 p-3 border border-accent/20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                    }}
                >
                    <Database className="h-6 w-6 text-accent" />
                </motion.div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className="rounded-full bg-gradient-to-br from-brand to-accent p-4 shadow-lg glow-brand"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Brain className="h-8 w-8 text-white" />
                </motion.div>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <motion.div
                    className="rounded-lg bg-success/10 p-3 border border-success/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 1,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                    }}
                >
                    <div className="text-xs font-medium text-success">✓ Answer</div>
                </motion.div>
            </div>
        </div>
    );
}
