import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface BentoCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: "brand" | "accent" | "success" | "info";
    size?: "large" | "horizontal" | "square";
    children?: React.ReactNode;
}

const colorClasses = {
    brand: "text-brand bg-brand/10",
    accent: "text-accent bg-accent/10",
    success: "text-success bg-success/10",
    info: "text-info bg-info/10",
};

const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    horizontal: "md:col-span-2 md:row-span-1",
    square: "md:col-span-1 md:row-span-1",
};

export function BentoCard({
    title,
    description,
    icon: Icon,
    iconColor = "brand",
    size = "square",
    children,
}: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className={`group relative overflow-hidden rounded-2xl border border-border/60 glass-card p-6 card-hover ${sizeClasses[size]}`}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-brand/5 via-transparent to-accent/5" />

            <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-lg p-3 ${colorClasses[iconColor]}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                        {description}
                    </p>

                    {/* Custom content */}
                    {children && <div className="mt-auto pt-4">{children}</div>}
                </div>
            </div>
        </motion.div>
    );
}
