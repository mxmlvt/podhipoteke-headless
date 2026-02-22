"use client";

import { useState } from "react";
import { Check, X, Star, FileText, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import {
  LOAN_PRODUCTS,
  calcMonthlyPayment,
  calcTotalCost,
  type LoanProduct,
} from "@/lib/comparison-data";
import LeadCaptureModal from "@/components/shared/LeadCaptureModal";

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
}
function fmtPct(n: number) {
  return n.toFixed(1).replace(".", ",") + "%";
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
    </div>
  );
}

/* ─── Product card for mobile ─── */
function ProductCard({
  product,
  loanAmount,
  term,
  isExpanded,
  onToggle,
}: {
  product: LoanProduct;
  loanAmount: number;
  term: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const midRate = (product.rate_min + product.rate_max) / 2;
  const monthly = calcMonthlyPayment(loanAmount, midRate, term);
  const total = calcTotalCost(loanAmount, midRate, term, product.commission, product.monthly_fee);

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden ${
        product.highlighted
          ? "border-[#2299AA] shadow-md"
          : "border-[#e5e7eb]"
      }`}
    >
      {product.highlighted && (
        <div className="bg-[#2299AA] text-white text-xs font-bold text-center py-1 tracking-wide flex items-center justify-center gap-1.5">
          <Star className="w-3 h-3" /> Rekomendowane
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-bold text-[#111827] text-sm">{product.name}</p>
            <p className="text-xs text-[#6b7280]">{product.provider}</p>
          </div>
          <button type="button" onClick={onToggle} className="text-[#9ca3af] hover:text-[#374151]">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[#f0fafb] rounded-xl p-3">
            <p className="text-xs text-[#9ca3af] mb-0.5">Rata miesięczna</p>
            <p className="font-bold text-[#1c435e] text-base">{fmt(Math.round(monthly))}</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-3">
            <p className="text-xs text-[#9ca3af] mb-0.5">Koszt całkowity</p>
            <p className="font-bold text-[#374151] text-base">{fmt(Math.round(total))}</p>
          </div>
        </div>

        <div className="flex gap-4 text-xs text-[#6b7280]">
          <span>Oprocent.: <strong>{fmtPct(product.rate_min)}–{fmtPct(product.rate_max)}</strong></span>
          <span>LTV max: <strong>{product.ltv_max}%</strong></span>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3 border-t border-[#f3f4f6] pt-4">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                {product.bik_check ? <X className="w-3.5 h-3.5 text-red-400" /> : <Check className="w-3.5 h-3.5 text-green-500" />}
                <span>{product.bik_check ? "Weryfikuje BIK" : "Bez BIK"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {product.income_check ? <X className="w-3.5 h-3.5 text-red-400" /> : <Check className="w-3.5 h-3.5 text-green-500" />}
                <span>{product.income_check ? "Wymaga zaświadczeń" : "Bez zaświadczeń"}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[#374151] mb-1.5">Zalety:</p>
              <ul className="space-y-1">
                {product.advantages.map((a) => (
                  <li key={a} className="flex items-center gap-1.5 text-xs text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2299AA] flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {product.note && (
              <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-2">{product.note}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function LoanComparison() {
  const [loanAmount, setLoanAmount] = useState(300_000);
  const [term, setTerm] = useState(120);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const params = new URLSearchParams({
        loan_amount: String(loanAmount),
        term: String(term),
      });
      const res = await fetch(`/api/tools/pdf-comparison?${params.toString()}`);
      if (!res.ok) throw new Error("PDF error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "porownanie-pozyczek-podhipoteke24.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silently ignore
    } finally {
      setPdfLoading(false);
    }
  }

  /* Best product by monthly payment among highlighted */
  const bestProduct = LOAN_PRODUCTS.filter((p) => p.highlighted).reduce<LoanProduct | null>(
    (best, p) => {
      if (!best) return p;
      const bMonthly = calcMonthlyPayment(loanAmount, (best.rate_min + best.rate_max) / 2, term);
      const pMonthly = calcMonthlyPayment(loanAmount, (p.rate_min + p.rate_max) / 2, term);
      return pMonthly < bMonthly ? p : best;
    },
    null
  );

  return (
    <div>
      {/* Params */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-sm p-6 mb-8">
        <h2 className="text-base font-bold text-[#111827] mb-5">Parametry pożyczki</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SliderInput
            label="Kwota pożyczki"
            value={loanAmount}
            min={30_000}
            max={2_000_000}
            step={10_000}
            display={fmt(loanAmount)}
            onChange={setLoanAmount}
          />
          <SliderInput
            label="Okres spłaty"
            value={term}
            min={12}
            max={240}
            step={12}
            display={`${term} mies. (${Math.round(term / 12)} lat)`}
            onChange={setTerm}
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f0fafb] border border-[#e6f7f9]">
              <th className="text-left p-4 text-xs font-bold text-[#374151] uppercase tracking-wide rounded-tl-xl">Produkt</th>
              <th className="text-center p-4 text-xs font-bold text-[#374151] uppercase tracking-wide">Oprocentowanie</th>
              <th className="text-center p-4 text-xs font-bold text-[#374151] uppercase tracking-wide">LTV max</th>
              <th className="text-center p-4 text-xs font-bold text-[#374151] uppercase tracking-wide">BIK</th>
              <th className="text-center p-4 text-xs font-bold text-[#374151] uppercase tracking-wide">Rata mies.</th>
              <th className="text-center p-4 text-xs font-bold text-[#374151] uppercase tracking-wide">Koszt całk.</th>
              <th className="text-center p-4 text-xs font-bold text-[#374151] uppercase tracking-wide rounded-tr-xl">Prowizja</th>
            </tr>
          </thead>
          <tbody>
            {LOAN_PRODUCTS.map((product, i) => {
              const midRate = (product.rate_min + product.rate_max) / 2;
              const monthly = calcMonthlyPayment(loanAmount, midRate, term);
              const total = calcTotalCost(loanAmount, midRate, term, product.commission, product.monthly_fee);
              const isLast = i === LOAN_PRODUCTS.length - 1;

              return (
                <tr
                  key={product.id}
                  className={`border-b border-[#f3f4f6] transition-colors ${
                    product.highlighted
                      ? "bg-[#e6f7f9]/40 hover:bg-[#e6f7f9]/60"
                      : "bg-white hover:bg-[#f9fafb]"
                  } ${isLast ? "rounded-b-xl" : ""}`}
                >
                  <td className="p-4">
                    <div className="flex items-start gap-2">
                      {product.highlighted && (
                        <Star className="w-3.5 h-3.5 text-[#2299AA] flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold text-[#111827] text-sm">{product.name}</p>
                        <p className="text-xs text-[#6b7280]">{product.provider}</p>
                        {product.advantages.slice(0, 2).map((a) => (
                          <span key={a} className="inline-flex items-center gap-1 text-xs text-[#2299AA] mr-2">
                            <Check className="w-2.5 h-2.5" />{a}
                          </span>
                        ))}
                        {product.note && (
                          <p className="text-xs text-amber-600 mt-0.5">{product.note}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-semibold text-[#374151] text-sm">
                      {fmtPct(product.rate_min)}–{fmtPct(product.rate_max)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-semibold text-[#374151] text-sm">
                      {product.ltv_max > 0 ? `${product.ltv_max}%` : "–"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {product.bik_check ? (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    ) : (
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`font-bold text-sm ${product.highlighted ? "text-[#2299AA]" : "text-[#374151]"}`}>
                      {fmt(Math.round(monthly))}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-semibold text-[#374151] text-sm">{fmt(Math.round(total))}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-sm text-[#6b7280]">{fmtPct(product.commission)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-xs text-[#9ca3af] mt-2">
          * Rata obliczona metodą annuitetową dla środka przedziału oprocentowania. Rzeczywiste warunki mogą się różnić.
        </p>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3 mb-6">
        {LOAN_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            loanAmount={loanAmount}
            term={term}
            isExpanded={expandedId === product.id}
            onToggle={() => toggleExpand(product.id)}
          />
        ))}
        <p className="text-xs text-[#9ca3af] text-center">
          * Rata obliczona metodą annuitetową dla środka przedziału oprocentowania.
        </p>
      </div>

      {/* Best offer highlight */}
      {bestProduct && (
        <div className="bg-gradient-to-r from-[#1c435e] to-[#2299AA] rounded-2xl p-5 mb-6 text-white flex flex-col sm:flex-row sm:items-center gap-4">
          <Star className="w-6 h-6 text-white flex-shrink-0 hidden sm:block" />
          <div className="flex-1">
            <p className="font-bold text-base mb-0.5">Najlepsza oferta dla Twoich parametrów</p>
            <p className="text-white/80 text-sm">{bestProduct.name} – {bestProduct.provider}</p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 px-6 py-2.5 rounded-full bg-white text-[#1c435e] font-bold text-sm hover:bg-[#f0fafb] transition-colors"
          >
            Zapytaj o tę ofertę
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex-1 py-3.5 rounded-full bg-[#2299AA] text-white font-bold text-sm hover:bg-[#1e8899] transition-all shadow-md hover:shadow-lg"
        >
          Umów bezpłatną konsultację
        </button>
        <button
          type="button"
          onClick={downloadPdf}
          disabled={pdfLoading}
          className="flex-1 py-3.5 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold text-sm hover:bg-[#1c435e] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {pdfLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generowanie PDF…
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              Pobierz porównanie (PDF)
            </>
          )}
        </button>
      </div>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        heading="Zapytaj o najlepszą ofertę"
        description="Doradca przygotuje spersonalizowane zestawienie ofert dopasowane do Twojej sytuacji."
        fields={["name", "phone", "email"]}
        leadData={{
          source: "porownywarka",
          tool_data: {
            loan_amount: loanAmount,
            term_months: term,
          },
        }}
        submitLabel="Wyślij zapytanie"
      />
    </div>
  );
}
