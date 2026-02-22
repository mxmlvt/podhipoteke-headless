"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: number;
}

export interface ScheduleEntry {
  month: number;
  capital: number;
  interest: number;
  balance: number;
  total: number;
}

interface Props {
  schedule: ScheduleEntry[];
}

function fmt(v: number) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(v);
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-[#374151] mb-1">Miesiąc {label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {fmt(p.value ?? 0)}
        </p>
      ))}
    </div>
  );
}

export default function RepaymentChart({ schedule }: Props) {
  // Próbkowanie: max 72 punkty dla czytelności
  const step = Math.max(1, Math.ceil(schedule.length / 72));
  const data = schedule
    .filter((_, i) => i % step === 0 || i === schedule.length - 1)
    .map((s) => ({
      month: s.month,
      Kapitał: Math.round(s.capital),
      Odsetki: Math.round(s.interest),
    }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 8, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          tickFormatter={(v) => `${v}m`}
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
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
        <Line
          type="monotone"
          dataKey="Kapitał"
          stroke="#1c435e"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="Odsetki"
          stroke="#2299AA"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
