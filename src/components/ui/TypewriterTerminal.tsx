import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Bot } from "lucide-react";

export function TypewriterTerminal() {
    const [stage, setStage] = useState<"typing" | "transforming" | "complete">("typing");
    const [typedText, setTypedText] = useState("");
    const sqlQuery = "SELECT order_total FROM orders WHERE status = 'shipped';";
    const naturalLanguage = "You shipped $42,000 worth of orders today.";

    useEffect(() => {
        if (stage === "typing") {
            if (typedText.length < sqlQuery.length) {
                const timeout = setTimeout(() => {
                    setTypedText(sqlQuery.slice(0, typedText.length + 1));
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                setTimeout(() => setStage("transforming"), 500);
            }
        } else if (stage === "transforming") {
            setTimeout(() => setStage("complete"), 800);
        } else if (stage === "complete") {
            setTimeout(() => {
                setTypedText("");
                setStage("typing");
            }, 3000);
        }
    }, [typedText, stage, sqlQuery.length]);

    return (
        <div className="relative rounded-2xl border border-border/60 bg-background-surface/80 backdrop-blur-md p-6 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-error" />
                <div className="h-3 w-3 rounded-full bg-warning" />
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="ml-2 text-xs text-foreground-muted font-mono">
                    orca-terminal
                </span>
            </div>

            {/* Terminal Content */}
            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    {stage === "typing" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-mono text-sm"
                        >
                            <div className="text-accent mb-2">$ orca query</div>
                            <div className="text-foreground">
                                {typedText}
                                <span className="inline-block w-2 h-4 bg-brand animate-pulse ml-1" />
                            </div>
                        </motion.div>
                    )}

                    {stage === "transforming" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-center py-8"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent"
                            />
                        </motion.div>
                    )}

                    {stage === "complete" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-3"
                        >
                            <div className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                                    <Bot className="h-4 w-4 text-brand" />
                                </div>
                                <div className="flex-1">
                                    <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-brand/20 to-accent/10 border border-brand/30 px-4 py-3">
                                        <p className="text-sm font-medium">{naturalLanguage}</p>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 text-success px-2 py-1 text-xs">
                                            ✓ SQL Executed
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-background-shell px-2 py-1 text-xs text-foreground-muted">
                                            240ms
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
