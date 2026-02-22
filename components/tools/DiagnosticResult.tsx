"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  RotateCcw,
  Loader2,
  Phone,
  ArrowRight,
} from "lucide-react";
import type { DiagnosticResult, QuizAnswers } from "@/lib/diagnostic-logic";
import { submitLead } from "@/lib/leads";
import Link from "next/link";

interface Props {
  result: DiagnosticResult;
  answers: QuizAnswers;
  onRestart: () => void;
}

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
}

const STATUS_CONFIG = {
  qualified: {
    icon: CheckCircle2,
    iconColor: "text-green-500",
    badgeBg: "bg-green-50",
    badgeBorder: "border-green-200",
    badgeText: "text-green-700",
    badgeLabel: "Kwalifikujesz się",
    headerBg: "bg-gradient-to-r from-[#1c435e] to-[#2299AA]",
  },
  conditional: {
    icon: AlertCircle,
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-50",
    badgeBorder: "border-amber-200",
    badgeText: "text-amber-700",
    badgeLabel: "Wymaga analizy",
    headerBg: "bg-gradient-to-r from-[#7c5a2a] to-[#c9832b]",
  },
  not_qualified: {
    icon: XCircle,
    iconColor: "text-red-400",
    badgeBg: "bg-red-50",
    badgeBorder: "border-red-200",
    badgeText: "text-red-700",
    badgeLabel: "Brak kwalifikacji",
    headerBg: "bg-gradient-to-r from-[#374151] to-[#6b7280]",
  },
};

export default function DiagnosticResultScreen({ result, answers, onRestart }: Props) {
  const cfg = STATUS_CONFIG[result.status];
  const Icon = cfg.icon;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await submitLead({
      source: "diagnostyka",
      name,
      phone,
      email,
      tool_data: {
        status: result.status,
        recommended_product: result.recommended_product,
        estimated_amount: result.estimated_amount,
        answers: {
          has_property: answers.has_property,
          property_type: answers.property_type,
          property_value: answers.property_value,
          has_bik_issues: answers.has_bik_issues,
          has_bailiff: answers.has_bailiff,
          is_business: answers.is_business,
          loan_purpose: answers.loan_purpose,
        },
      },
    });
    setSending(false);
    if (res.success) {
      setSent(true);
      // trigger PDF download after successful lead submission
      handlePdfDownload();
    } else {
      setError(res.error ?? "Błąd wysyłania. Spróbuj ponownie.");
    }
  }

  async function handlePdfDownload() {
    setDownloading(true);
    try {
      const params = new URLSearchParams({
        status: result.status,
        title: result.title,
        description: result.description,
        recommended_product: result.recommended_product,
        estimated_min: String(result.estimated_amount?.min ?? 0),
        estimated_max: String(result.estimated_amount?.max ?? 0),
        next_steps: result.next_steps.join("||"),
        required_documents: result.required_documents.join("||"),
        property_type: answers.property_type ?? "",
        property_value: String(answers.property_value),
        has_bik_issues: answers.has_bik_issues,
        has_bailiff: String(answers.has_bailiff),
        is_business: String(answers.is_business),
        loan_purpose: answers.loan_purpose.join("||"),
        name,
      });
      const response = await fetch(`/api/tools/pdf-diagnostic?${params.toString()}`);
      if (!response.ok) throw new Error("PDF error");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagnostyka-finansowa-podhipoteke24.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silently ignore PDF errors – lead is already captured
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="max-w-[680px] mx-auto">
      {/* Result card */}
      <div className="bg-white rounded-3xl shadow-xl border border-[#e5e7eb] overflow-hidden">

        {/* Header */}
        <div className={`${cfg.headerBg} p-6 md:p-8 text-white`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className={`inline-block mb-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${cfg.badgeBg} ${cfg.badgeBorder} ${cfg.badgeText}`}>
                {cfg.badgeLabel}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {result.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          <p className="text-[#374151] leading-relaxed">{result.description}</p>

          {/* Estimated amount */}
          {result.estimated_amount && result.estimated_amount.min > 0 && (
            <div className="bg-[#f0fafb] border border-[#e6f7f9] rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#2299AA] mb-3">
                Szacowana kwota pożyczki
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#1c435e]">
                  {fmt(result.estimated_amount.min)}
                </span>
                <span className="text-[#6b7280] font-medium">–</span>
                <span className="text-3xl font-bold text-[#1c435e]">
                  {fmt(result.estimated_amount.max)}
                </span>
              </div>
              {result.recommended_product && (
                <p className="text-sm text-[#6b7280] mt-2">
                  Produkt: <span className="font-semibold text-[#374151]">{result.recommended_product}</span>
                </p>
              )}
            </div>
          )}

          {/* Next steps */}
          {result.next_steps.length > 0 && (
            <div>
              <p className="text-sm font-bold text-[#111827] mb-3 uppercase tracking-wide">
                Kolejne kroki
              </p>
              <ol className="space-y-2">
                {result.next_steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2299AA] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[#374151] text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Required docs */}
          {result.required_documents.length > 0 && (
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-5">
              <p className="text-sm font-bold text-[#111827] mb-3 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2299AA]" />
                Dokumenty do przygotowania
              </p>
              <ul className="space-y-1.5">
                {result.required_documents.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2299AA] flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lead form / CTA */}
          {result.status !== "not_qualified" && (
            <div className="border-t border-[#f3f4f6] pt-6">
              {sent ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-[#111827] text-lg">Dziękujemy!</p>
                  <p className="text-[#6b7280] text-sm mt-1">
                    Doradca skontaktuje się z Tobą w ciągu 24 godzin.
                  </p>
                  {downloading && (
                    <p className="text-[#2299AA] text-sm mt-2 flex items-center justify-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Pobieranie raportu PDF…
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-[#111827] mb-1">
                    Zostaw dane – doradca oddzwoni w 24h
                  </p>
                  <p className="text-xs text-[#6b7280] mb-4">
                    Otrzymasz też bezpłatny raport PDF z wynikiem diagnostyki
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Imię i nazwisko *"
                        className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:border-[#2299AA] focus:ring-1 focus:ring-[#2299AA]/30"
                      />
                      <input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Numer telefonu *"
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:border-[#2299AA] focus:ring-1 focus:ring-[#2299AA]/30"
                      />
                    </div>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Adres e-mail *"
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:border-[#2299AA] focus:ring-1 focus:ring-[#2299AA]/30"
                    />
                    {error && (
                      <p className="text-red-500 text-xs">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3.5 rounded-full bg-[#2299AA] text-white font-bold text-sm hover:bg-[#1e8899] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Wysyłanie…
                        </>
                      ) : (
                        <>
                          Pobierz raport PDF i zostaw kontakt
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[#9ca3af] text-xs text-center">
                      Bezpłatna konsultacja. Bez zobowiązań. Oddzwaniamy w 24h.
                    </p>
                  </form>
                </>
              )}
            </div>
          )}

          {/* Not qualified CTA */}
          {result.status === "not_qualified" && (
            <div className="border-t border-[#f3f4f6] pt-6 text-center">
              <p className="text-[#374151] text-sm mb-4">
                Zadzwoń do nas – być może mamy inne rozwiązanie dla Twojej sytuacji.
              </p>
              <Link
                href="tel:577873616"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1c435e] text-white font-bold text-sm hover:bg-[#254d6b] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Zadzwoń: 577 873 616
              </Link>
            </div>
          )}

          {/* Restart */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={onRestart}
              className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#6b7280] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Wypełnij quiz ponownie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
