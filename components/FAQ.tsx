"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "Kto może skorzystać z pożyczki?",
    a: "O pożyczkę mogą ubiegać się firmy każdego rodzaju. Spółki prawa handlowego takie jak spółki osobowe czy kapitałowe, ale również osoby fizyczne które prowadzą jednoosobową działalność gospodarczą.",
  },
  {
    q: "Jaką kwotę pożyczki mogę otrzymać?",
    a: "Nasza firma gwarantuje pożyczki od 50.000 zł do 2.000.000 zł",
  },
  {
    q: "Ile mam czasu na spłatę pożyczki?",
    a: "Termin spłaty pożyczki jest kwestią zupełnie elastyczną. Do każdego klienta podchodzimy całkowicie indywidualnie. Zawsze znajdujemy rozwiązanie, które satysfakcjonuje obie strony transakcji.",
  },
  {
    q: "Jakie dokumenty przygotować przy pożyczce pod działkę rolną?",
    a: "Jedyne wymagane dokumenty przy pożyczce pod działkę rolną to wypis z rejestru gruntów oraz numer księgi wieczystej.",
  },
  {
    q: "Czy wpisy w KRD, BIK, BIG i ERIF mają wpływ na decyzję o udzieleniu pożyczki?",
    a: "Na decyzję o udzieleniu pożyczki nie mają wpływu wpisy w żadnym rejestrze dłużników.",
  },
  {
    q: "Jakie jest zabezpieczenie udzielanej pożyczki?",
    a: "Pożyczka udzielana jest pod zastaw nieruchomości. Wymagany jest wpis w księdze wieczystej domu, mieszkania lub działki rolnej.",
  },
  {
    q: "Jak długo muszę czekać na pieniądze?",
    a: "Od dnia złożenia wniosku i dostarczenia wszystkich dokumentów do momentu otrzymania funduszy mija zwykle od 2 do 4 dni.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1330px] mx-auto px-4">
        <h2 className="section-heading text-primary mb-12">CZĘSTO ZADAWANE PYTANIA</h2>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="accordion-title w-full text-left"
              >
                <span>{item.q}</span>
                <svg
                  className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="accordion-content">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
