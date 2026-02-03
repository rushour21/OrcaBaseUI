import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

export function FloatingWidget() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="absolute -bottom-4 -right-4 cursor-grab active:cursor-grabbing"
        >
            <div className="relative">
                <motion.div
                    className="rounded-full bg-brand p-4 shadow-lg"
                    animate={{
                        boxShadow: isHovered
                            ? "0 20px 60px -10px hsl(var(--brand) / 0.5)"
                            : "0 10px 30px -10px hsl(var(--brand) / 0.3)",
                    }}
                >
                    <MessageSquare className="h-6 w-6 text-brand-foreground" />
                </motion.div>

                {/* Tooltip on hover */}
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                        scale: isHovered ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full right-0 mb-2 pointer-events-none"
                >
                    <div className="rounded-lg bg-background-surface border border-border shadow-xl px-3 py-2 whitespace-nowrap">
                        <p className="text-xs font-medium text-foreground">Quick Answer</p>
                        <p className="text-[10px] text-foreground-muted">
                            Drag me around!
                        </p>
                    </div>
                    <div className="absolute top-full right-4 -mt-1">
                        <div className="border-8 border-transparent border-t-background-surface" />
                    </div>
                </motion.div>

                {/* Pulse ring */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-brand"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            </div>
        </motion.div>
    );
}
