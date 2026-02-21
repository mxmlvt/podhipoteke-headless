"use client";

import { useState } from "react";
import { Phone, Mail, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nip: "",
    amount: "",
    collateral: "",
    purpose: "",
    period: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    "Szybka pożyczka pod nieruchomość",
    "Nie wymagamy zaświadczeń z ZUS i US",
    "Nie weryfikujemy w bazach BIK, BIG i KRD",
    "Nie badamy zdolności kredytowej",
    "Oferujemy atrakcyjne warunki spłat",
    "Decyzja kredytowa w 24 godziny",
    "Wypłata środków w ekspresowym tempie",
  ];

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-[#f7f8fa]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Złóż wniosek
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Wypełnij formularz, a nasz doradca skontaktuje się z Tobą w ciągu kilku godzin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side – Benefits */}
          <div>
            <h3 className="text-xl font-bold text-[#111827] mb-6">
              Dlaczego warto nam zaufać?
            </h3>
            <ul className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2299AA] shrink-0 mt-0.5" />
                  <span className="text-[#374151]">{b}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white rounded-xl p-6 border border-[#e5e7eb]">
              <h3 className="text-lg font-bold text-[#111827] mb-4">Kontakt bezpośredni</h3>
              <div className="space-y-3">
                <a
                  href="mailto:kontakt@podhipoteke24.pl"
                  className="flex items-center gap-3 text-[#374151] hover:text-[#1c435e] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#e8f4f6]">
                    <Mail className="w-4 h-4 text-[#2299AA]" />
                  </div>
                  kontakt@podhipoteke24.pl
                </a>
                <a
                  href="tel:577873616"
                  className="flex items-center gap-3 text-[#374151] hover:text-[#1c435e] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#e8f4f6]">
                    <Phone className="w-4 h-4 text-[#2299AA]" />
                  </div>
                  577 873 616
                </a>
              </div>
            </div>
          </div>

          {/* Right side – Form */}
          <div className="bg-white rounded-xl p-8 border border-[#e5e7eb] shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">Dziękujemy!</h3>
                <p className="text-[#6b7280]">
                  Twój wniosek został wysłany. Skontaktujemy się z Tobą wkrótce.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Twoje imię i nazwisko"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:border-[#2299AA] transition-colors text-sm"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Twój numer telefonu"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:border-[#2299AA] transition-colors text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Twój email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:border-[#2299AA] transition-colors text-sm"
                  />
                  <input
                    type="text"
                    name="nip"
                    placeholder="NIP firmy (opcjonalnie)"
                    value={formData.nip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:border-[#2299AA] transition-colors text-sm"
                  />
                </div>
                <input
                  type="text"
                  name="amount"
                  placeholder="Jaką kwotę chcesz pożyczyć?"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:border-[#2299AA] transition-colors text-sm"
                />
                <input
                  type="text"
                  name="collateral"
                  placeholder="Rodzaj zabezpieczenia (mieszkanie, dom, działka...)"
                  value={formData.collateral}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:border-[#2299AA] transition-colors text-sm"
                />
                <input
                  type="text"
                  name="period"
                  placeholder="Okres finansowania (ile miesięcy?)"
                  value={formData.period}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:border-[#2299AA] transition-colors text-sm"
                />
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-0.5 w-4 h-4 accent-[#2299AA] shrink-0"
                  />
                  <span className="text-xs text-[#6b7280] leading-relaxed">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{" "}
                    <a href="/polityka-prywatnosci" className="text-[#2299AA] underline">
                      polityką prywatności
                    </a>{" "}
                    w celu obsługi mojego zapytania.
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#1c435e] text-white font-bold text-base hover:bg-[#254d6b] transition-colors"
                >
                  Wyślij wniosek
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
