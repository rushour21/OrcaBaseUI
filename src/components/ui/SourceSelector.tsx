import { motion } from "framer-motion";
import { FileText, Database } from "lucide-react";
import { useState } from "react";

export function SourceSelector() {
    const [mode, setMode] = useState<"pdf" | "sql">("pdf");

    return (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-background-shell p-8">
            <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                    background:
                        mode === "pdf"
                            ? "linear-gradient(135deg, hsl(var(--brand) / 0.05) 0%, transparent 100%)"
                            : "linear-gradient(135deg, hsl(var(--accent) / 0.05) 0%, transparent 100%)",
                }}
                transition={{ duration: 0.6 }}
            />

            <div className="max-w-3xl mx-auto text-center space-y-6">
                <motion.h3
                    className="text-2xl font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    AI that adapts to your{" "}
                    <span className="text-gradient">data source</span>
                </motion.h3>

                <p className="text-foreground-secondary">
                    Watch how OrcaBase intelligently switches between document search and
                    database queries
                </p>

                {/* Toggle */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center rounded-full border border-border bg-background p-1 gap-1">
                        <motion.button
                            onClick={() => setMode("pdf")}
                            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${mode === "pdf"
                                    ? "text-brand-foreground"
                                    : "text-foreground-secondary hover:text-foreground"
                                }`}
                        >
                            {mode === "pdf" && (
                                <motion.div
                                    layoutId="activeMode"
                                    className="absolute inset-0 bg-brand rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                PDF Mode
                            </span>
                        </motion.button>

                        <motion.button
                            onClick={() => setMode("sql")}
                            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${mode === "sql"
                                    ? "text-brand-foreground"
                                    : "text-foreground-secondary hover:text-foreground"
                                }`}
                        >
                            {mode === "sql" && (
                                <motion.div
                                    layoutId="activeMode"
                                    className="absolute inset-0 bg-accent rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                SQL Mode
                            </span>
                        </motion.button>
                    </div>
                </div>

                {/* Mode Description */}
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border border-border bg-background-surface p-6"
                >
                    {mode === "pdf" ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 text-brand">
                                <FileText className="h-5 w-5" />
                                <span className="font-semibold">Document RAG Active</span>
                            </div>
                            <p className="text-sm text-foreground-secondary">
                                AI searches through your PDFs, policies, and knowledge base
                                using semantic search and vector embeddings.
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs">
                                    Vector Search
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs">
                                    Semantic Matching
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs">
                                    Context Aware
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 text-accent">
                                <Database className="h-5 w-5" />
                                <span className="font-semibold">Text-to-SQL Active</span>
                            </div>
                            <p className="text-sm text-foreground-secondary">
                                AI translates natural language into SQL queries and executes
                                them on your read-only database connection.
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs">
                                    Natural Language
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs">
                                    SQL Generation
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs">
                                    Read-Only
                                </span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
