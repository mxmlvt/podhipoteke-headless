"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, TrendingDown, FileText, Loader2 } from "lucide-react";
import LeadCaptureModal from "@/components/shared/LeadCaptureModal";

const SavingsChart = dynamic(() => import("./SavingsChart"), { ssr: false });

/* ─── types ─── */
interface Liability {
  id: number;
  name: string;
  monthly: number;
  balance: number;
  rate: number;
}

/* ─── helpers ─── */
let nextId = 4;

function fmtPLN(n: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtPct(n: number) {
  return n.toFixed(1).replace(".", ",") + "%";
}

function calcAnnuity(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

/* ─── SliderInput ─── */
function SliderInput({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <label className="text-sm font-medium text-[#374151]">{label}</label>
        <span className="text-sm font-bold text-[#1c435e]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#2299AA] cursor-pointer"
      />
      <div className="flex justify-between text-xs text-[#9ca3af] mt-0.5">
        <span>{min === 0.5 ? fmtPct(min) : min.toLocaleString("pl-PL")}</span>
        <span>{max === 30 ? fmtPct(max) : max.toLocaleString("pl-PL")}</span>
      </div>
    </div>
  );
}

/* ─── LiabilityRow ─── */
function LiabilityRow({
  item,
  onChange,
  onRemove,
  canRemove,
}: {
  item: Liability;
  onChange: (updated: Liability) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  function set<K extends keyof Liability>(key: K, value: Liability[K]) {
    onChange({ ...item, [key]: value });
  }

  return (
    <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <input
          value={item.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Nazwa zobowiązania (np. Kredyt gotówkowy)"
          className="flex-1 text-sm font-medium text-[#374151] bg-transparent focus:outline-none placeholder-[#d1d5db]"
        />
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 p-1.5 rounded-lg text-[#9ca3af] hover:text-red-400 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-[#9ca3af] block mb-1">Rata miesięczna (zł)</label>
          <input
            type="number"
            min={0}
            value={item.monthly || ""}
            onChange={(e) => set("monthly", Number(e.target.value))}
            placeholder="0"
            className="w-full px-3 py-2 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:border-[#2299AA] focus:ring-1 focus:ring-[#2299AA]/30 text-[#374151]"
          />
        </div>
        <div>
          <label className="text-xs text-[#9ca3af] block mb-1">Saldo (zł)</label>
          <input
            type="number"
            min={0}
            value={item.balance || ""}
            onChange={(e) => set("balance", Number(e.target.value))}
            placeholder="0"
            className="w-full px-3 py-2 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:border-[#2299AA] focus:ring-1 focus:ring-[#2299AA]/30 text-[#374151]"
          />
        </div>
        <div>
          <label className="text-xs text-[#9ca3af] block mb-1">Oprocentowanie (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={item.rate || ""}
            onChange={(e) => set("rate", Number(e.target.value))}
            placeholder="0"
            className="w-full px-3 py-2 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:border-[#2299AA] focus:ring-1 focus:ring-[#2299AA]/30 text-[#374151]"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
const DEFAULT_LIABILITIES: Liability[] = [
  { id: 1, name: "Kredyt gotówkowy", monthly: 800, balance: 25_000, rate: 12 },
  { id: 2, name: "Karta kredytowa", monthly: 500, balance: 15_000, rate: 22 },
  { id: 3, name: "Chwilówka", monthly: 400, balance: 8_000, rate: 30 },
];

export default function ConsolidationCalculator() {
  const [liabilities, setLiabilities] = useState<Liability[]>(DEFAULT_LIABILITIES);
  const [term, setTerm] = useState(120); // months
  const [rate, setRate] = useState(9.5); // annual %
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  /* totals */
  const totalBalance = liabilities.reduce((s, l) => s + (l.balance || 0), 0);
  const currentMonthly = liabilities.reduce((s, l) => s + (l.monthly || 0), 0);
  const newMonthly = calcAnnuity(totalBalance, rate, term);
  const monthlySaving = currentMonthly - newMonthly;
  const currentTotal = currentMonthly * term; // simplified (same term)
  const newTotal = newMonthly * term;
  const totalSaving = currentTotal - newTotal;

  const addLiability = useCallback(() => {
    setLiabilities((prev) => [
      ...prev,
      { id: nextId++, name: "", monthly: 0, balance: 0, rate: 10 },
    ]);
  }, []);

  const removeLiability = useCallback((id: number) => {
    setLiabilities((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateLiability = useCallback((updated: Liability) => {
    setLiabilities((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }, []);

  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const params = new URLSearchParams({
        term: String(term),
        rate: String(rate),
        total_balance: String(totalBalance),
        current_monthly: String(Math.round(currentMonthly)),
        new_monthly: String(Math.round(newMonthly)),
        monthly_saving: String(Math.round(monthlySaving)),
        total_saving: String(Math.round(totalSaving > 0 ? totalSaving : 0)),
        liabilities: JSON.stringify(
          liabilities.map((l) => ({
            name: l.name || "Zobowiązanie",
            monthly: l.monthly,
            balance: l.balance,
            rate: l.rate,
          }))
        ),
      });
      const res = await fetch(`/api/tools/pdf-consolidation?${params.toString()}`);
      if (!res.ok) throw new Error("PDF error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "konsolidacja-podhipoteke24.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silently ignore
    } finally {
      setPdfLoading(false);
    }
  }

  const saving = monthlySaving > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left: liabilities + settings */}
      <div className="lg:col-span-3 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#111827] mb-1">Twoje obecne zobowiązania</h2>
          <p className="text-sm text-[#6b7280]">Wpisz raty, salda i oprocentowanie swoich kredytów</p>
        </div>

        <div className="space-y-3">
          {liabilities.map((l) => (
            <LiabilityRow
              key={l.id}
              item={l}
              onChange={updateLiability}
              onRemove={() => removeLiability(l.id)}
              canRemove={liabilities.length > 1}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addLiability}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-dashed border-[#2299AA]/50 text-[#2299AA] text-sm font-medium hover:border-[#2299AA] hover:bg-[#e6f7f9] transition-colors w-full justify-center"
        >
          <Plus className="w-4 h-4" />
          Dodaj kolejne zobowiązanie
        </button>

        {/* Consolidation settings */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 space-y-5">
          <h3 className="text-sm font-bold text-[#111827]">Parametry pożyczki konsolidacyjnej</h3>
          <SliderInput
            label="Okres spłaty"
            value={term}
            min={12}
            max={240}
            step={12}
            display={`${term} mies. (${Math.round(term / 12)} lat)`}
            onChange={setTerm}
          />
          <SliderInput
            label="Oprocentowanie roczne"
            value={rate}
            min={0.5}
            max={30}
            step={0.5}
            display={fmtPct(rate)}
            onChange={setRate}
          />
        </div>
      </div>

      {/* Right: results */}
      <div className="lg:col-span-2 space-y-4">
        {/* Summary card */}
        <div className="bg-[#1c435e] rounded-3xl p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">Wynik konsolidacji</p>

          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/75">Suma zobowiązań</span>
              <span className="font-bold text-lg">{fmtPLN(totalBalance)}</span>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/75">Obecna suma rat</span>
              <span className="font-bold">{fmtPLN(currentMonthly)}/mies.</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/75">Nowa rata</span>
              <span className="font-bold text-[#2299AA]">{fmtPLN(Math.round(newMonthly))}/mies.</span>
            </div>

            <div className="h-px bg-white/10" />

            <div className="bg-white/10 rounded-2xl p-4 text-center">
              {saving ? (
                <>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <TrendingDown className="w-4 h-4 text-[#2299AA]" />
                    <span className="text-xs text-white/70 uppercase tracking-wide font-bold">Oszczędność miesięczna</span>
                  </div>
                  <p className="text-3xl font-bold text-[#2299AA]">{fmtPLN(Math.round(monthlySaving))}</p>
                  <p className="text-xs text-white/60 mt-1">
                    Łącznie przez {term} mies.: {fmtPLN(Math.round(totalSaving))}
                  </p>
                </>
              ) : (
                <p className="text-sm text-white/70">
                  Dostosuj parametry pożyczki, aby zobaczyć oszczędności
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Chart */}
        {totalBalance > 0 && (
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
            <p className="text-xs font-bold text-[#374151] uppercase tracking-wide mb-3">Porównanie kosztów</p>
            <SavingsChart
              currentMonthly={currentMonthly}
              newMonthly={Math.round(newMonthly)}
              currentTotal={currentTotal}
              newTotal={Math.round(newTotal)}
            />
          </div>
        )}

        {/* Liability breakdown */}
        <div className="bg-[#f0fafb] rounded-2xl border border-[#e6f7f9] p-5">
          <p className="text-xs font-bold text-[#2299AA] uppercase tracking-wide mb-3">Twoje zobowiązania</p>
          <div className="space-y-2">
            {liabilities.filter((l) => l.balance > 0).map((l) => (
              <div key={l.id} className="flex justify-between text-sm">
                <span className="text-[#374151] truncate flex-1 mr-2">{l.name || "Zobowiązanie"}</span>
                <span className="font-semibold text-[#1c435e] flex-shrink-0">{fmtPLN(l.balance)}</span>
              </div>
            ))}
            {liabilities.filter((l) => l.balance > 0).length === 0 && (
              <p className="text-sm text-[#9ca3af]">Wpisz salda zobowiązań powyżej</p>
            )}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full py-3.5 rounded-full bg-[#2299AA] text-white font-bold text-sm hover:bg-[#1e8899] transition-all shadow-md hover:shadow-lg"
          >
            Umów bezpłatną konsultację
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={pdfLoading || totalBalance === 0}
            className="w-full py-3 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold text-sm hover:bg-[#1c435e] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {pdfLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generowanie PDF…
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Pobierz plan konsolidacji (PDF)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lead modal */}
      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        heading="Umów bezpłatną konsultację"
        description="Doradca omówi z Tobą możliwości konsolidacji i przedstawi spersonalizowaną ofertę."
        fields={["name", "phone", "email"]}
        leadData={{
          source: "kalkulator-konsolidacji",
          tool_data: {
            total_balance: totalBalance,
            current_monthly: Math.round(currentMonthly),
            new_monthly: Math.round(newMonthly),
            monthly_saving: Math.round(monthlySaving),
            term_months: term,
            rate_pct: rate,
            liabilities: liabilities.map((l) => ({
              name: l.name || "Zobowiązanie",
              monthly: l.monthly,
              balance: l.balance,
              rate: l.rate,
            })),
          },
        }}
        submitLabel="Wyślij i umów konsultację"
      />
    </div>
  );
}
