import Link from "next/link";
import { PhoneCall, Camera, CheckCircle, Banknote } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    number: "01",
    title: "Kontakt",
    desc: "Złóż wniosek online lub zadzwoń pod numer 577 873 616. Odpiszemy w ciągu kilku godzin.",
  },
  {
    icon: Camera,
    number: "02",
    title: "Wycena",
    desc: "Wyceniamy nieruchomość stanowiącą zabezpieczenie. Przyjmujemy zdjęcia oraz dokumenty zdalnie.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Decyzja",
    desc: "Wydajemy decyzję kredytową w ciągu 24 godzin. W 99,9% przypadków jest pozytywna.",
  },
  {
    icon: Banknote,
    number: "04",
    title: "Wypłata",
    desc: "Pieniądze trafiają na Twoje konto już w 2–4 dni od złożenia kompletnego wniosku.",
  },
];

export default function LoanProcess() {
  return (
    <section className="section-dark py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#7de8f5]">
            Jak to działa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Jak uzyskać pożyczkę?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Proces udzielania pożyczki jest niezwykle szybki i prosty – wszystko odbywa się online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+3rem)] right-0 h-0.5 bg-white/20 z-0" />
              )}
              <div className="relative z-10 bg-white/10 border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#2299AA] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-lg">
                    {step.number}
                  </div>
                  <div className="p-2 rounded-xl bg-white/10">
                    <step.icon className="w-5 h-5 text-[#7de8f5]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] hover:bg-[#2bb5c7] text-white font-bold text-base transition-colors shadow-lg"
          >
            Złóż wniosek
          </Link>
        </div>
      </div>
    </section>
  );
}
