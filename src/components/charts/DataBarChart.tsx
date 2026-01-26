import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

export type DataSourceType = "document" | "database";

interface DataPoint {
  [key: string]: string | number;
}

interface DataBarChartProps {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  sourceType?: DataSourceType;
  height?: number;
  showGrid?: boolean;
  highlightBars?: boolean;
  className?: string;
  highlightThreshold?: number;
  layout?: "vertical" | "horizontal";
}

// Chart color tokens using CSS variables
const chartColors = {
  document: "hsl(173, 42%, 38%)", // brand teal
  database: "hsl(37, 91%, 55%)", // amber
  grid: "hsl(217, 33%, 17%)", // border
  axis: "hsl(218, 11%, 46%)", // foreground-muted
  success: "hsl(142, 71%, 45%)",
  warning: "hsl(48, 97%, 63%)",
  error: "hsl(0, 84%, 60%)",
};

export function DataBarChart({
  data,
  xKey,
  yKey,
  sourceType = "database",
  height = 200,
  showGrid = true,
  highlightBars = true,
  className,
  highlightThreshold = 20,
  layout = "horizontal",
}: DataBarChartProps) {
  // Calculate bar colors based on comparison with average
  const barColors = useMemo(() => {
    if (!highlightBars || data.length < 2) {
      const baseColor = sourceType === "document" ? chartColors.document : chartColors.database;
      return data.map(() => baseColor);
    }

    const values = data.map((d) => Number(d[yKey]) || 0);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    return values.map((val) => {
      const percentDiff = ((val - avg) / avg) * 100;

      if (percentDiff >= highlightThreshold) {
        return chartColors.success; // spike
      } else if (percentDiff <= -highlightThreshold) {
        return chartColors.error; // drop
      } else {
        return sourceType === "document" ? chartColors.document : chartColors.database;
      }
    });
  }, [data, yKey, highlightBars, highlightThreshold, sourceType]);

  const baseColor = sourceType === "document" ? chartColors.document : chartColors.database;

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              vertical={layout === "horizontal" ? false : true}
              horizontal={layout === "horizontal" ? true : false}
            />
          )}
          {layout === "horizontal" ? (
            <>
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
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: chartColors.axis }}
                axisLine={{ stroke: chartColors.grid }}
                tickLine={{ stroke: chartColors.grid }}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fontSize: 11, fill: chartColors.axis }}
                axisLine={{ stroke: chartColors.grid }}
                tickLine={{ stroke: chartColors.grid }}
                width={80}
              />
            </>
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 50%, 9%)",
              border: "1px solid hsl(217, 33%, 17%)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(220, 14%, 91%)",
            }}
            labelStyle={{ color: "hsl(218, 11%, 65%)" }}
            cursor={{ fill: "hsl(217, 33%, 17%, 0.3)" }}
          />
          <Bar
            dataKey={yKey}
            fill={baseColor}
            radius={layout === "horizontal" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
