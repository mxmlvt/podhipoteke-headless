"use client";

import { useState, useMemo } from "react";
import {
  Building2,
  Home,
  MapPin,
  Wheat,
  Store,
  type LucideIcon,
} from "lucide-react";
import { LTV_CONFIG, type PropertyType } from "@/lib/ltv-config";
import { submitLead } from "@/lib/leads";

// ── Ikony ──────────────────────────────────────────────────────
const ICONS: Record<string, LucideIcon> = {
  Building2,
  Home,
  MapPin,
  Wheat,
  Store,
};

function fmtPln(n: number, decimals = 0) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  }).format(n);
}

function round1k(n: number) {
  return Math.round(n / 1000) * 1000;
}

// ── Komponent ──────────────────────────────────────────────────
export default function LoanEstimator() {
  const [propertyType, setPropertyType] = useState<PropertyType>("mieszkanie");
  const [wartosc, setWartosc] = useState(500_000);
  const [hasHipoteka, setHasHipoteka] = useState(false);
  const [obciazenie, setObciazenie] = useState(100_000);

  // Formularz lead
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  const cfg = LTV_CONFIG[propertyType];

  const { minAmount, maxAmount, netValue, tooLow } = useMemo(() => {
    const obciazenieVal = hasHipoteka ? Math.min(obciazenie, wartosc) : 0;
    const net = wartosc - obciazenieVal;
    const minA = round1k(net * cfg.min);
    const maxA = round1k(net * cfg.max);
    return { minAmount: minA, maxAmount: maxA, netValue: net, tooLow: minA < 20_000 };
  }, [propertyType, wartosc, hasHipoteka, obciazenie, cfg]);

  const rangePercent = useMemo(() => {
    const mid = (minAmount + maxAmount) / 2;
    return Math.min(100, Math.max(10, (mid / 2_000_000) * 100));
  }, [minAmount, maxAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormError("");

    const result = await submitLead({
      source: "estymator-kwoty",
      ...form,
      tool_data: {
        typ_nieruchomosci: propertyType,
        wartosc,
        obciazenie: hasHipoteka ? obciazenie : 0,
        zakres_min: minAmount,
        zakres_max: maxAmount,
        ltv: `${Math.round(cfg.min * 100)}–${Math.round(cfg.max * 100)}%`,
      },
    });

    setSending(false);
    if (result.success) {
      setSent(true);
    } else {
      setFormError(result.error ?? "Błąd wysyłania. Spróbuj ponownie.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] " +
    "focus:outline-none focus:ring-2 focus:ring-[#2299AA]/30 focus:border-[#2299AA] transition-colors text-sm bg-white";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── Lewa: parametry ── */}
      <div className="space-y-8">
        {/* Typ nieruchomości */}
        <div>
          <p className="text-sm font-semibold text-[#374151] mb-3">Typ nieruchomości</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.entries(LTV_CONFIG) as [PropertyType, (typeof LTV_CONFIG)[PropertyType]][]).map(
              ([key, val]) => {
                const Icon = ICONS[val.icon];
                const active = propertyType === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPropertyType(key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-sm font-semibold ${
                      active
                        ? "border-[#2299AA] bg-[#e6f7f9] text-[#2299AA]"
                        : "border-[#e5e7eb] text-[#6b7280] hover:border-[#2299AA]/50 hover:bg-[#f0fafb]"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    {val.label}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Wartość nieruchomości */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-semibold text-[#374151]">Wartość nieruchomości</label>
            <span className="text-[#2299AA] font-bold text-xl tabular-nums">{fmtPln(wartosc)}</span>
          </div>
          <input
            type="range"
            min={50_000}
            max={10_000_000}
            step={50_000}
            value={wartosc}
            onChange={(e) => setWartosc(Number(e.target.value))}
            className="w-full h-2 rounded-full accent-[#2299AA] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[#9ca3af]">
            <span>50 000 zł</span>
            <span>10 000 000 zł</span>
          </div>
        </div>

        {/* Hipoteka */}
        <div>
          <p className="text-sm font-semibold text-[#374151] mb-3">
            Czy nieruchomość jest obciążona hipoteką?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[false, true].map((v) => (
              <button
                key={String(v)}
                onClick={() => setHasHipoteka(v)}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
                  hasHipoteka === v
                    ? "border-[#2299AA] bg-[#e6f7f9] text-[#2299AA]"
                    : "border-[#e5e7eb] text-[#6b7280] hover:border-[#2299AA]/50"
                }`}
              >
                {v ? "Tak" : "Nie"}
              </button>
            ))}
          </div>

          {hasHipoteka && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold text-[#374151]">Kwota obciążenia</label>
                <span className="text-[#2299AA] font-bold text-base tabular-nums">{fmtPln(obciazenie)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.max(wartosc, 100_000)}
                step={10_000}
                value={Math.min(obciazenie, wartosc)}
                onChange={(e) => setObciazenie(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-[#2299AA] cursor-pointer"
              />
              {obciazenie >= wartosc && (
                <p className="text-amber-600 text-xs">
                  ⚠ Kwota obciążenia nie może przekroczyć wartości nieruchomości.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Prawa: wynik ── */}
      <div className="space-y-6">
        {/* Wynik */}
        <div className="bg-[#1c435e] rounded-2xl p-6 md:p-8 text-white">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
            Szacowany zakres kwoty pożyczki
          </p>

          {tooLow ? (
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-4 mt-2">
              <p className="text-amber-300 font-semibold text-sm">
                Wartość nieruchomości po odliczeniu obciążeń jest zbyt niska.
              </p>
              <p className="text-white/60 text-xs mt-1">
                Minimalna kwota pożyczki to 20 000 zł. Spróbuj zwiększyć wartość nieruchomości lub zmniejszyć obciążenie.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-end gap-3 mb-5">
                <p className="text-3xl md:text-4xl font-bold text-[#5bd0e0] tabular-nums">
                  {fmtPln(minAmount)}
                </p>
                <p className="text-white/50 text-lg mb-0.5">–</p>
                <p className="text-3xl md:text-4xl font-bold text-[#5bd0e0] tabular-nums">
                  {fmtPln(maxAmount)}
                </p>
              </div>

              {/* Range bar */}
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-[#2299AA] to-[#5bd0e0] transition-all duration-300"
                  style={{ width: `${rangePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/40">
                <span>0 zł</span>
                <span>2 000 000 zł</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/10">
                <div>
                  <p className="text-white/50 text-xs mb-0.5">Wskaźnik LTV</p>
                  <p className="text-white font-semibold">
                    {Math.round(cfg.min * 100)}–{Math.round(cfg.max * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-0.5">Podstawa wyceny</p>
                  <p className="text-white font-semibold">{fmtPln(netValue)}</p>
                </div>
              </div>
            </>
          )}
          <p className="text-white/30 text-xs mt-4">
            * Szacunkowy zakres. Dokładna kwota zależy od stanu prawnego i lokalizacji nieruchomości.
          </p>
        </div>

        {/* Info o LTV */}
        <div className="bg-[#f0fafb] rounded-2xl p-5 border border-[#e6f7f9]">
          <p className="text-sm font-semibold text-[#374151] mb-1">
            Wskaźnik LTV dla {cfg.label.toLowerCase()}:{" "}
            <span className="text-[#2299AA]">
              {Math.round(cfg.min * 100)}–{Math.round(cfg.max * 100)}%
            </span>
          </p>
          <p className="text-xs text-[#6b7280]">
            LTV (Loan To Value) to stosunek kwoty pożyczki do wartości nieruchomości. Im niższe LTV, tym
            korzystniejsze warunki pożyczki.
          </p>
        </div>

        {/* Lead magnet – formularz inline */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#e6f7f9] flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-[#2299AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-[#111827] mb-1">Dziękujemy!</p>
              <p className="text-[#6b7280] text-sm">
                Nasz doradca skontaktuje się z Tobą w ciągu 24h z dokładną wyceną.
              </p>
            </div>
          ) : (
            <>
              <p className="font-semibold text-[#111827] mb-1">Chcesz dokładną wycenę?</p>
              <p className="text-sm text-[#6b7280] mb-4">
                Zostaw dane – doradca skontaktuje się w 24h z indywidualną ofertą.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Imię i nazwisko *"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="Numer telefonu *"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="Adres e-mail *"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Miasto"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className={inputClass}
                  />
                </div>

                {formError && (
                  <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending || tooLow}
                  className="w-full py-3 rounded-full bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors disabled:opacity-60 text-sm"
                >
                  {sending ? "Wysyłanie…" : "Poproś o dokładną wycenę →"}
                </button>
                <p className="text-xs text-[#9ca3af] text-center">🔒 Dane są bezpieczne. Nie wysyłamy spamu.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
