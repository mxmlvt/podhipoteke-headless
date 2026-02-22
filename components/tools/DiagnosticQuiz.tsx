"use client";

import { useState } from "react";
import {
  Home,
  Building2,
  MapPin,
  Wheat,
  Store,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Briefcase,
  User,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { evaluateDiagnostic, type QuizAnswers, type DiagnosticResult } from "@/lib/diagnostic-logic";
import DiagnosticResultScreen from "./DiagnosticResult";

/* ─────────────── types ─────────────── */
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const TOTAL_STEPS = 7;

const initialAnswers: QuizAnswers = {
  has_property: false,
  property_type: null,
  property_value: 300_000,
  has_bik_issues: "nie",
  has_bailiff: false,
  is_business: false,
  loan_purpose: [],
};

const LOAN_PURPOSES = [
  "Spłata zobowiązań",
  "Zakup nieruchomości",
  "Remont",
  "Cele prywatne",
  "Działalność gospodarcza",
  "Inne",
];

const PROPERTY_TYPES = [
  { key: "mieszkanie", label: "Mieszkanie", icon: Building2 },
  { key: "dom", label: "Dom", icon: Home },
  { key: "dzialka", label: "Działka budowlana", icon: MapPin },
  { key: "grunt_rolny", label: "Grunt rolny", icon: Wheat },
  { key: "lokal", label: "Lokal usługowy", icon: Store },
] as const;

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
}

/* ─────────────── sub-components ─────────────── */
function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 font-medium ${
        selected
          ? "border-[#2299AA] bg-[#e6f7f9] text-[#1c435e]"
          : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#2299AA]/50 hover:bg-[#f0fafb]"
      }`}
    >
      {children}
    </button>
  );
}

function YesNoCard({
  label,
  icon: Icon,
  selected,
  onClick,
  accent,
}: {
  label: string;
  icon: React.ElementType;
  selected: boolean;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 font-semibold ${
        selected
          ? `border-[#2299AA] bg-[#e6f7f9] text-[#1c435e]`
          : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#2299AA]/50 hover:bg-[#f0fafb]"
      }`}
    >
      <Icon
        className={`w-8 h-8 ${selected ? accent ?? "text-[#2299AA]" : "text-[#9ca3af]"}`}
      />
      <span className="text-base">{label}</span>
    </button>
  );
}

/* ─────────────── step wrappers ─────────────── */
function StepHeading({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-6 text-center">
      <span className="inline-block mb-2 text-xs font-bold uppercase tracking-widest text-[#2299AA]">
        Krok {step} z {TOTAL_STEPS}
      </span>
      <h2 className="text-xl md:text-2xl font-bold text-[#111827] mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-[#6b7280]">{subtitle}</p>}
    </div>
  );
}

/* ─────────────── main component ─────────────── */
export default function DiagnosticQuiz() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function togglePurpose(p: string) {
    setAnswers((prev) => ({
      ...prev,
      loan_purpose: prev.loan_purpose.includes(p)
        ? prev.loan_purpose.filter((x) => x !== p)
        : [...prev.loan_purpose, p],
    }));
  }

  function nextStep() {
    if (step < TOTAL_STEPS) setStep((s) => (s + 1) as Step);
    else finish();
  }

  function prevStep() {
    if (step > 1) setStep((s) => (s - 1) as Step);
  }

  function finish() {
    setLoading(true);
    // slight delay for UX feel
    setTimeout(() => {
      setResult(evaluateDiagnostic(answers));
      setLoading(false);
    }, 800);
  }

  function restart() {
    setAnswers(initialAnswers);
    setResult(null);
    setStep(1);
  }

  /* progress width */
  const progress = (step / TOTAL_STEPS) * 100;

  /* can go next? */
  function canNext(): boolean {
    switch (step) {
      case 1: return true; // yes/no always has a value
      case 2: return answers.has_property ? answers.property_type !== null : true;
      case 3: return true;
      case 4: return answers.loan_purpose.length > 0;
      case 5: return true;
      case 6: return true;
      case 7: return true;
      default: return true;
    }
  }

  if (result) {
    return <DiagnosticResultScreen result={result} answers={answers} onRestart={restart} />;
  }

  if (loading) {
    return (
      <div className="max-w-[620px] mx-auto bg-white rounded-3xl shadow-xl border border-[#e5e7eb] p-12 text-center">
        <Loader2 className="w-12 h-12 text-[#2299AA] animate-spin mx-auto mb-4" />
        <p className="text-[#374151] font-semibold text-lg">Analizujemy Twoją sytuację…</p>
        <p className="text-[#6b7280] text-sm mt-1">Przygotowujemy wynik diagnostyki</p>
      </div>
    );
  }

  return (
    <div className="max-w-[620px] mx-auto">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#6b7280] mb-1.5">
          <span>Postęp</span>
          <span>{step}/{TOTAL_STEPS}</span>
        </div>
        <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2299AA] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-[#e5e7eb] p-6 md:p-8">

        {/* ── Step 1: has_property ── */}
        {step === 1 && (
          <div>
            <StepHeading
              step={1}
              title="Czy posiadasz nieruchomość?"
              subtitle="Pożyczka hipoteczna wymaga nieruchomości jako zabezpieczenia"
            />
            <div className="flex gap-3">
              <YesNoCard
                label="Tak, posiadam"
                icon={CheckCircle2}
                selected={answers.has_property === true}
                onClick={() => update("has_property", true)}
                accent="text-green-500"
              />
              <YesNoCard
                label="Nie posiadam"
                icon={XCircle}
                selected={answers.has_property === false}
                onClick={() => update("has_property", false)}
                accent="text-red-400"
              />
            </div>
          </div>
        )}

        {/* ── Step 2: property_type ── */}
        {step === 2 && (
          <div>
            <StepHeading
              step={2}
              title={answers.has_property ? "Jaki typ nieruchomości posiadasz?" : "Czy planujesz nabyć nieruchomość?"}
              subtitle={answers.has_property ? "Wybierz typ nieruchomości stanowiącej zabezpieczenie" : "Możemy sfinansować zakup pod zastaw innej nieruchomości"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROPERTY_TYPES.map(({ key, label, icon: Icon }) => (
                <OptionCard
                  key={key}
                  selected={answers.property_type === key}
                  onClick={() => update("property_type", key)}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${answers.property_type === key ? "text-[#2299AA]" : "text-[#9ca3af]"}`} />
                  <span>{label}</span>
                </OptionCard>
              ))}
              {!answers.has_property && (
                <OptionCard
                  selected={answers.property_type === null && step === 2}
                  onClick={() => update("property_type", null)}
                >
                  <HelpCircle className="w-5 h-5 text-[#9ca3af] flex-shrink-0" />
                  <span>Brak / nie wiem</span>
                </OptionCard>
              )}
            </div>
          </div>
        )}

        {/* ── Step 3: property_value ── */}
        {step === 3 && (
          <div>
            <StepHeading
              step={3}
              title="Jaka jest szacunkowa wartość nieruchomości?"
              subtitle="Podaj przybliżoną wartość rynkową nieruchomości"
            />
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-[#1c435e]">
                {fmt(answers.property_value)}
              </span>
            </div>
            <input
              type="range"
              min={50_000}
              max={5_000_000}
              step={50_000}
              value={answers.property_value}
              onChange={(e) => update("property_value", Number(e.target.value))}
              className="w-full accent-[#2299AA] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[#9ca3af] mt-1">
              <span>50 000 zł</span>
              <span>5 000 000 zł</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[200_000, 500_000, 1_000_000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update("property_value", v)}
                  className={`py-2 rounded-xl text-sm font-medium border transition-colors ${
                    answers.property_value === v
                      ? "border-[#2299AA] bg-[#e6f7f9] text-[#1c435e]"
                      : "border-[#e5e7eb] text-[#6b7280] hover:border-[#2299AA]/50"
                  }`}
                >
                  {fmt(v)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: loan_purpose ── */}
        {step === 4 && (
          <div>
            <StepHeading
              step={4}
              title="Na co potrzebujesz środków?"
              subtitle="Możesz wybrać więcej niż jedną opcję"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOAN_PURPOSES.map((p) => (
                <OptionCard
                  key={p}
                  selected={answers.loan_purpose.includes(p)}
                  onClick={() => togglePurpose(p)}
                >
                  <div className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                    answers.loan_purpose.includes(p)
                      ? "border-[#2299AA] bg-[#2299AA]"
                      : "border-[#d1d5db]"
                  }`}>
                    {answers.loan_purpose.includes(p) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{p}</span>
                </OptionCard>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 5: has_bik_issues ── */}
        {step === 5 && (
          <div>
            <StepHeading
              step={5}
              title="Czy masz wpisy w BIK, KRD lub BIG?"
              subtitle="Negatywna historia kredytowa nie wyklucza pożyczki – pytamy dla doboru produktu"
            />
            <div className="flex flex-col gap-3">
              {([
                { val: "nie", label: "Nie, historia kredytowa jest czysta", icon: CheckCircle2, accent: "text-green-500" },
                { val: "tak", label: "Tak, mam negatywne wpisy", icon: XCircle, accent: "text-amber-500" },
                { val: "nie_wiem", label: "Nie sprawdzałem / nie wiem", icon: HelpCircle, accent: "text-[#9ca3af]" },
              ] as const).map(({ val, label, icon: Icon, accent }) => (
                <OptionCard
                  key={val}
                  selected={answers.has_bik_issues === val}
                  onClick={() => update("has_bik_issues", val)}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${answers.has_bik_issues === val ? accent : "text-[#9ca3af]"}`} />
                  <span>{label}</span>
                </OptionCard>
              ))}
            </div>
            {answers.has_bik_issues === "tak" && (
              <div className="mt-4 p-3 bg-[#f0fafb] rounded-xl border border-[#e6f7f9] text-sm text-[#2299AA]">
                ℹ️ Udzielamy pożyczek bez weryfikacji BIK. Wpisy nie dyskwalifikują.
              </div>
            )}
          </div>
        )}

        {/* ── Step 6: has_bailiff ── */}
        {step === 6 && (
          <div>
            <StepHeading
              step={6}
              title="Czy toczy się wobec Ciebie egzekucja komornicza?"
              subtitle="Zajęcia komornicze są możliwe do obsługi, ale wpływają na warunki"
            />
            <div className="flex gap-3">
              <YesNoCard
                label="Tak, jest zajęcie"
                icon={XCircle}
                selected={answers.has_bailiff === true}
                onClick={() => update("has_bailiff", true)}
                accent="text-amber-500"
              />
              <YesNoCard
                label="Nie ma zajęcia"
                icon={CheckCircle2}
                selected={answers.has_bailiff === false}
                onClick={() => update("has_bailiff", false)}
                accent="text-green-500"
              />
            </div>
          </div>
        )}

        {/* ── Step 7: is_business ── */}
        {step === 7 && (
          <div>
            <StepHeading
              step={7}
              title="Czy finansowanie jest dla firmy?"
              subtitle="Oferta dla firm i osób prywatnych różni się warunkami"
            />
            <div className="flex gap-3">
              <YesNoCard
                label="Dla firmy"
                icon={Briefcase}
                selected={answers.is_business === true}
                onClick={() => update("is_business", true)}
                accent="text-[#2299AA]"
              />
              <YesNoCard
                label="Osoba prywatna"
                icon={User}
                selected={answers.is_business === false}
                onClick={() => update("is_business", false)}
                accent="text-[#2299AA]"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#f3f4f6]">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#6b7280] hover:text-[#374151] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Wstecz
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={!canNext()}
            className="flex items-center gap-1.5 px-7 py-3 rounded-full bg-[#2299AA] text-white font-bold text-sm hover:bg-[#1e8899] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {step === TOTAL_STEPS ? "Sprawdź wynik" : "Dalej"}
            {step < TOTAL_STEPS && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
