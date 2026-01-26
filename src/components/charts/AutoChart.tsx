import { useMemo } from "react";
import { DataLineChart, DataSourceType } from "./DataLineChart";
import { DataBarChart } from "./DataBarChart";
import { cn } from "@/lib/utils";

interface DataPoint {
  [key: string]: string | number;
}

interface AutoChartProps {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  sourceType?: DataSourceType;
  height?: number;
  showGrid?: boolean;
  showHighlights?: boolean;
  className?: string;
  highlightThreshold?: number;
  forceChartType?: "line" | "bar";
}

/**
 * AutoChart - Automatically selects the best chart type based on data shape
 * 
 * Selection rules:
 * - Time series data (dates, sequential values) → Line chart
 * - Categorical comparisons (< 10 items, non-sequential) → Bar chart
 * - Many data points (> 20) → Line chart
 * - Few data points (≤ 5) → Bar chart
 */
export function AutoChart({
  data,
  xKey,
  yKey,
  sourceType = "document",
  height = 200,
  showGrid = true,
  showHighlights = true,
  className,
  highlightThreshold = 20,
  forceChartType,
}: AutoChartProps) {
  const chartType = useMemo(() => {
    if (forceChartType) return forceChartType;
    if (!data || data.length === 0) return "bar";

    // Check if x values look like dates or time-based
    const firstXValue = String(data[0][xKey] || "");
    const isTimeSeries =
      /^\d{4}[-/]\d{2}[-/]\d{2}/.test(firstXValue) || // ISO date
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(firstXValue) || // Month names
      /^\d{1,2}[:/]\d{2}/.test(firstXValue) || // Time format
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/i.test(firstXValue) || // Day names
      /^Week \d+/i.test(firstXValue) || // Week format
      /^Q[1-4]/i.test(firstXValue); // Quarter format

    if (isTimeSeries) return "line";

    // Many data points → line chart for better readability
    if (data.length > 20) return "line";

    // Few data points → bar chart for comparison
    if (data.length <= 5) return "bar";

    // Check if values are sequential (incrementing pattern suggests time series)
    const xValues = data.map((d) => d[xKey]);
    const hasSequentialPattern = xValues.every((val, i) => {
      if (i === 0) return true;
      const prev = String(xValues[i - 1]);
      const curr = String(val);
      // Check for numeric sequence
      if (!isNaN(Number(prev)) && !isNaN(Number(curr))) {
        return Number(curr) > Number(prev);
      }
      return false;
    });

    if (hasSequentialPattern) return "line";

    // Default to bar for categorical data
    return "bar";
  }, [data, xKey, forceChartType]);

  if (!data || data.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-foreground-muted text-sm",
          className
        )}
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  if (chartType === "line") {
    return (
      <DataLineChart
        data={data}
        xKey={xKey}
        yKey={yKey}
        sourceType={sourceType}
        height={height}
        showGrid={showGrid}
        showHighlights={showHighlights}
        className={className}
        highlightThreshold={highlightThreshold}
      />
    );
  }

  return (
    <DataBarChart
      data={data}
      xKey={xKey}
      yKey={yKey}
      sourceType={sourceType}
      height={height}
      showGrid={showGrid}
      highlightBars={showHighlights}
      className={className}
      highlightThreshold={highlightThreshold}
    />
  );
}
