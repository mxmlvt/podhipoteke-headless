"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function fmt(v: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(v);
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-[#374151] mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {fmt(p.value ?? 0)}
        </p>
      ))}
    </div>
  );
}

interface Props {
  currentMonthly: number;
  newMonthly: number;
  currentTotal: number;
  newTotal: number;
}

export default function SavingsChart({ currentMonthly, newMonthly, currentTotal, newTotal }: Props) {
  const monthlyData = [
    { name: "Rata miesięczna", "Obecne zobowiązania": Math.round(currentMonthly), "Po konsolidacji": Math.round(newMonthly) },
  ];
  const totalData = [
    { name: "Koszt całkowity", "Obecne zobowiązania": Math.round(currentTotal), "Po konsolidacji": Math.round(newTotal) },
  ];
  const data = [...monthlyData, ...totalData];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }} barGap={6} barCategoryGap="35%">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          tickFormatter={(v) => `${Math.round(v / 1000)}k`}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
        <Bar dataKey="Obecne zobowiązania" fill="#1c435e" radius={[6, 6, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-current-${index}`} fill="#1c435e" />
          ))}
        </Bar>
        <Bar dataKey="Po konsolidacji" fill="#2299AA" radius={[6, 6, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-new-${index}`} fill="#2299AA" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
