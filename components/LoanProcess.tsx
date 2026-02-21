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
    desc: "Pieniądze trafiają na Twoje konto już w 2-4 dni od złożenia kompletnego wniosku.",
  },
];

export default function LoanProcess() {
  return (
    <section className="py-16 md:py-24 bg-[#f7f8fa]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Jak uzyskać pożyczkę?
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Proces udzielania pożyczki jest niezwykle szybki i prosty – wszystko odbywa się online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+3rem)] right-0 h-0.5 bg-[#e5e7eb] z-0" />
              )}
              <div className="relative z-10 bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1c435e] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {step.number}
                  </div>
                  <div className="p-2 rounded-lg bg-[#e8f4f6]">
                    <step.icon className="w-5 h-5 text-[#2299AA]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">{step.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#1c435e] text-white font-bold text-base hover:bg-[#254d6b] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Złóż wniosek online
          </Link>
        </div>
      </div>
    </section>
  );
}
