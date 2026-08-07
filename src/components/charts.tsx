import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const axis = {
  stroke: "#64748B",
  fontSize: 10,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "#FFFFFF",
    border: "1px solid #E6E7E8",
    borderRadius: 12,
    fontSize: 11,
    color: "#1F2937",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  itemStyle: { color: "#1F2937" },
  labelStyle: { color: "#495057", fontSize: 10, fontWeight: 700 },
};

// Executive Unified Steel Blue Chart Palette (Zero Orange)
const palette = [
  "#2F4F6F", // Steel Blue (Primary)
  "#2E7D32", // Forest Green (Secondary)
  "#495057", // Slate Gray
  "#0284C7", // Sky Blue
  "#243F5A", // Deep Steel
  "#64748B", // Muted Slate
];

export function AreaTrend({
  data,
  x,
  series,
  height = 240,
}: {
  data: Record<string, unknown>[];
  x: string;
  series: { key: string; label: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette[i % palette.length]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={palette[i % palette.length]} stopOpacity={0.03} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E6E7E8" vertical={false} />
        <XAxis dataKey={x} {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 10, color: "#495057" }} />
        {series.map((s, i) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={palette[i % palette.length]}
            strokeWidth={2}
            fill={`url(#grad-${s.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarSeries({
  data,
  x,
  series,
  height = 240,
  stacked,
}: {
  data: Record<string, unknown>[];
  x: string;
  series: { key: string; label: string }[];
  height?: number;
  stacked?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E6E7E8" vertical={false} />
        <XAxis dataKey={x} {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "#F6F6F4", opacity: 0.8 }} />
        <Legend wrapperStyle={{ fontSize: 10, color: "#495057" }} />
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            {...(stacked ? { stackId: "a" } : {})}
            radius={[4, 4, 0, 0]}
            fill={palette[i % palette.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineSeries({
  data,
  x,
  series,
  height = 240,
}: {
  data: Record<string, unknown>[];
  x: string;
  series: { key: string; label: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E6E7E8" vertical={false} />
        <XAxis dataKey={x} {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 10, color: "#495057" }} />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={palette[i % palette.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  height = 240,
  inner = 55,
}: {
  data: { name: string; value: number }[];
  height?: number;
  inner?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={inner}
          outerRadius={inner + 30}
          paddingAngle={2}
          stroke="#FFFFFF"
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 10, color: "#495057" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RadarSpread({
  data,
  height = 240,
}: {
  data: { subject: string; value: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="70%">
        <PolarGrid stroke="#E6E7E8" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#495057", fontSize: 9 }} />
        <Radar
          dataKey="value"
          stroke="#2F4F6F"
          fill="#2F4F6F"
          fillOpacity={0.25}
        />
        <Tooltip {...tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
