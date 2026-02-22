"use client";

import { useState, useMemo, useCallback } from "react";
import { FileText } from "lucide-react";
import dynamic from "next/dynamic";
import LeadCaptureModal from "@/components/shared/LeadCaptureModal";
import type { ScheduleEntry } from "./RepaymentChart";

// Recharts jest renderowany tylko po stronie klienta
const RepaymentChart = dynamic(() => import("./RepaymentChart"), { ssr: false });

type LoanType = "equal" | "declining";

interface CalcResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: ScheduleEntry[];
}

// ---------------------------------------------------------------
// Wzory matematyczne
// ---------------------------------------------------------------
function calcAnnuity(principal: number, months: number, annualRate: number): CalcResult {
  const r = annualRate / 100 / 12;
  const monthly =
    r === 0
      ? principal / months
      : (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);

  let balance = principal;
  let totalInterest = 0;
  const schedule: ScheduleEntry[] = [];

  for (let i = 1; i <= months; i++) {
    const interest = balance * r;
    const capital = monthly - interest;
    totalInterest += interest;
    balance = Math.max(0, balance - capital);
    schedule.push({
      month: i,
      capital: round2(capital),
      interest: round2(interest),
      balance: round2(balance),
      total: round2(monthly),
    });
  }

  return {
    monthlyPayment: round2(monthly),
    totalInterest: round2(totalInterest),
    totalPayment: round2(monthly * months),
    schedule,
  };
}

function calcDeclining(principal: number, months: number, annualRate: number): CalcResult {
  const r = annualRate / 100 / 12;
  const capitalPart = principal / months;

  let balance = principal;
  let totalInterest = 0;
  let firstMonthTotal = 0;
  const schedule: ScheduleEntry[] = [];

  for (let i = 1; i <= months; i++) {
    const interest = balance * r;
    const total = capitalPart + interest;
    if (i === 1) firstMonthTotal = total;
    totalInterest += interest;
    balance = Math.max(0, balance - capitalPart);
    schedule.push({
      month: i,
      capital: round2(capitalPart),
      interest: round2(interest),
      balance: round2(balance),
      total: round2(total),
    });
  }

  return {
    monthlyPayment: round2(firstMonthTotal),
    totalInterest: round2(totalInterest),
    totalPayment: round2(principal + totalInterest),
    schedule,
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// ---------------------------------------------------------------
// Pomocnicze formatery
// ---------------------------------------------------------------
function fmtPln(n: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtYears(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mies.`;
  if (m === 0) return `${y} ${y === 1 ? "rok" : y < 5 ? "lata" : "lat"}`;
  return `${y} l. ${m} mies.`;
}

// ---------------------------------------------------------------
// Sub-komponent slidera
// ---------------------------------------------------------------
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  displayValue: string;
  minLabel?: string;
  maxLabel?: string;
}

function SliderInput({ label, value, min, max, step, onChange, displayValue, minLabel, maxLabel }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-semibold text-[#374151]">{label}</label>
        <span className="text-[#2299AA] font-bold text-xl tabular-nums">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full accent-[#2299AA] cursor-pointer"
      />
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-xs text-[#9ca3af]">
          <span>{minLabel ?? ""}</span>
          <span>{maxLabel ?? ""}</span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// Główny komponent
// ---------------------------------------------------------------
export default function RateCalculator() {
  const [kwota, setKwota] = useState(200_000);
  const [okres, setOkres] = useState(60);
  const [oprocentowanie, setOprocentowanie] = useState(12);
  const [typRat, setTypRat] = useState<LoanType>("equal");
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const results = useMemo(
    () =>
      typRat === "equal"
        ? calcAnnuity(kwota, okres, oprocentowanie)
        : calcDeclining(kwota, okres, oprocentowanie),
    [kwota, okres, oprocentowanie, typRat]
  );

  const handleModalSuccess = useCallback(async () => {
    setPdfLoading(true);
    try {
      const res = await fetch("/api/tools/pdf-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kwota,
          okres,
          oprocentowanie,
          typ_rat: typRat,
        }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "harmonogram-splat.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("PDF download error:", e);
    } finally {
      setPdfLoading(false);
      setModalOpen(false);
    }
  }, [kwota, okres, oprocentowanie, typRat]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── Lewa kolumna: parametry ── */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 md:p-8 shadow-sm space-y-8">
        <SliderInput
          label="Kwota pożyczki"
          value={kwota}
          min={20_000}
          max={2_000_000}
          step={10_000}
          onChange={setKwota}
          displayValue={fmtPln(kwota)}
          minLabel="20 000 zł"
          maxLabel="2 000 000 zł"
        />

        <SliderInput
          label="Okres spłaty"
          value={okres}
          min={6}
          max={180}
          step={6}
          onChange={setOkres}
          displayValue={fmtYears(okres)}
          minLabel="6 mies."
          maxLabel="15 lat"
        />

        <SliderInput
          label="Oprocentowanie roczne"
          value={oprocentowanie}
          min={5}
          max={25}
          step={0.5}
          onChange={setOprocentowanie}
          displayValue={`${oprocentowanie.toFixed(1)}%`}
          minLabel="5%"
          maxLabel="25%"
        />

        {/* Typ rat */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#374151]">Typ rat</p>
          <div className="grid grid-cols-2 gap-3">
            {(["equal", "declining"] as LoanType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTypRat(t)}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
                  typRat === t
                    ? "border-[#2299AA] bg-[#e6f7f9] text-[#2299AA]"
                    : "border-[#e5e7eb] text-[#6b7280] hover:border-[#2299AA]/50"
                }`}
              >
                {t === "equal" ? "Równe" : "Malejące"}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#9ca3af]">
            {typRat === "equal"
              ? "Annuitetowe – stała rata przez cały okres."
              : "Malejące – pierwsza rata najwyższa, sumaryczny koszt niższy."}
          </p>
        </div>
      </div>

      {/* ── Prawa kolumna: wyniki ── */}
      <div className="space-y-5">
        {/* Główny wynik */}
        <div className="bg-[#1c435e] rounded-2xl p-6 md:p-8 text-white">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
            {typRat === "equal" ? "Rata miesięczna" : "Pierwsza rata (najwyższa)"}
          </p>
          <p className="text-4xl md:text-5xl font-bold text-[#5bd0e0] mb-6 tabular-nums">
            {fmtPln(results.monthlyPayment)}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-5 border-t border-white/10">
            {[
              { label: "Suma odsetek",       value: fmtPln(results.totalInterest) },
              { label: "Całkowita spłata",   value: fmtPln(results.totalPayment) },
              { label: "RRSO (szacunkowe)", value: `${oprocentowanie.toFixed(1)}%` },
              { label: "Okres spłaty",       value: fmtYears(okres) },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-white/50 text-xs mb-0.5">{label}</p>
                <p className="text-white font-semibold tabular-nums">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">
            * RRSO może się różnić w zależności od prowizji i innych kosztów. Obliczenia mają charakter szacunkowy.
          </p>
        </div>

        {/* Wykres */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 shadow-sm">
          <p className="text-sm font-semibold text-[#374151] mb-4">
            Rozkład kapitału i odsetek w czasie
          </p>
          <RepaymentChart schedule={results.schedule} />
        </div>

        {/* Lead magnet */}
        <div className="bg-[#f0fafb] rounded-2xl border border-[#e6f7f9] p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-[#111827] mb-0.5">Pełny harmonogram spłat (PDF)</p>
            <p className="text-sm text-[#6b7280]">
              Każda rata miesiąc po miesiącu z podziałem na kapitał i odsetki
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            disabled={pdfLoading}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2299AA] text-white font-semibold hover:bg-[#2bb5c7] transition-colors text-sm disabled:opacity-60"
          >
            <FileText className="w-4 h-4" />
            {pdfLoading ? "Generowanie…" : "Pobierz PDF"}
          </button>
        </div>
      </div>

      {/* Modal */}
      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        heading="Pobierz harmonogram spłat"
        description="Otrzymasz PDF z harmonogramem miesiąc po miesiącu oraz porównaniem z rynkowym oprocentowaniem."
        fields={["name", "phone", "email"]}
        leadData={{
          source: "kalkulator-raty",
          tool_data: {
            kwota,
            okres_miesiecy: okres,
            oprocentowanie,
            typ_rat: typRat,
            rata_miesieczna: results.monthlyPayment,
            koszt_calkowity: results.totalInterest,
          },
        }}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
