import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { cn } from "@/lib/utils";

export type DataSourceType = "document" | "database";

interface DataPoint {
  [key: string]: string | number;
}

interface HighlightPoint {
  index: number;
  type: "spike" | "drop" | "warning";
}

interface DataLineChartProps {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  sourceType?: DataSourceType;
  height?: number;
  showGrid?: boolean;
  showHighlights?: boolean;
  className?: string;
  highlightThreshold?: number; // percentage change to trigger highlight
}

// Chart color tokens using CSS variables
const chartColors = {
  document: "hsl(173, 42%, 38%)", // brand teal
  database: "hsl(37, 91%, 55%)", // amber
  grid: "hsl(217, 33%, 17%)", // border
  axis: "hsl(218, 11%, 46%)", // foreground-muted (neutral.300 equivalent)
  success: "hsl(142, 71%, 45%)",
  warning: "hsl(48, 97%, 63%)",
  error: "hsl(0, 84%, 60%)",
};

export function DataLineChart({
  data,
  xKey,
  yKey,
  sourceType = "document",
  height = 200,
  showGrid = true,
  showHighlights = true,
  className,
  highlightThreshold = 20,
}: DataLineChartProps) {
  // Calculate highlights based on data changes
  const highlights = useMemo<HighlightPoint[]>(() => {
    if (!showHighlights || data.length < 2) return [];

    const points: HighlightPoint[] = [];

    for (let i = 1; i < data.length; i++) {
      const prev = Number(data[i - 1][yKey]) || 0;
      const curr = Number(data[i][yKey]) || 0;

      if (prev === 0) continue;

      const change = ((curr - prev) / prev) * 100;

      if (change >= highlightThreshold) {
        points.push({ index: i, type: "spike" });
      } else if (change <= -highlightThreshold) {
        points.push({ index: i, type: "drop" });
      }
    }

    return points;
  }, [data, yKey, showHighlights, highlightThreshold]);

  const lineColor = sourceType === "document" ? chartColors.document : chartColors.database;

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              vertical={false}
            />
          )}
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: chartColors.axis }}
            axisLine={{ stroke: chartColors.grid }}
            tickLine={{ stroke: chartColors.grid }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: chartColors.axis }}
            axisLine={{ stroke: chartColors.grid }}
            tickLine={{ stroke: chartColors.grid }}
            width={50}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
              return value.toString();
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 50%, 9%)",
              border: "1px solid hsl(217, 33%, 17%)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(220, 14%, 91%)",
            }}
            labelStyle={{ color: "hsl(218, 11%, 65%)" }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={lineColor}
            strokeWidth={2}
            dot={{ fill: lineColor, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: lineColor, stroke: "hsl(220, 50%, 9%)", strokeWidth: 2 }}
          />
          {/* Highlight reference dots for spikes/drops */}
          {highlights.map((highlight) => (
            <ReferenceDot
              key={`highlight-${highlight.index}`}
              x={data[highlight.index][xKey]}
              y={Number(data[highlight.index][yKey])}
              r={6}
              fill={highlight.type === "spike" ? chartColors.success : chartColors.error}
              stroke="hsl(220, 50%, 9%)"
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
