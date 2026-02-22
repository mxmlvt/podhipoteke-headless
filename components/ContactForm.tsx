"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const benefits = [
  "Szybka pożyczka pod nieruchomość bez BIK",
  "Nie wymagamy zaświadczeń z ZUS i US",
  "Nie badamy zdolności kredytowej",
  "Oferujemy elastyczne warunki spłat",
  "Decyzja kredytowa w 24 godziny",
  "Wypłata środków nawet w 48 godzin",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nip: "",
    amount: "",
    collateral: "",
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

  return (
    <section id="formularz" className="py-16 md:py-24 bg-gradient-to-br from-[#1c435e] to-[#0f2a3d]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 text-white">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Złóż wniosek
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Wypełnij formularz, a nasz doradca skontaktuje się z Tobą w ciągu 15 minut.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side – Benefits + contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5">Dlaczego warto nam zaufać?</h3>
            <ul className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00d2a0] shrink-0 mt-0.5" />
                  <span className="text-white/85">{b}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Dane kontaktowe</h3>
              <a
                href="tel:577873616"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-white/15">
                  <Phone className="w-4 h-4 text-[#00d2a0]" />
                </div>
                <span className="font-semibold">577 873 616</span>
              </a>
              <a
                href="mailto:kontakt@podhipoteke24.pl"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-white/15">
                  <Mail className="w-4 h-4 text-[#00d2a0]" />
                </div>
                kontakt@podhipoteke24.pl
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <div className="p-2.5 rounded-xl bg-white/15 shrink-0">
                  <MapPin className="w-4 h-4 text-[#00d2a0]" />
                </div>
                ul. Przykładowa 1, 00-000 Warszawa
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="p-2.5 rounded-xl bg-white/15">
                  <Clock className="w-4 h-4 text-[#00d2a0]" />
                </div>
                Pon–Pt: 8:00 – 18:00
              </div>
            </div>
          </div>

          {/* Right side – Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e6f7f9] flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#00d2a0]" />
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
                    placeholder="Imię i nazwisko"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Numer telefonu"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm"
                  />
                  <input
                    type="text"
                    name="nip"
                    placeholder="NIP firmy (opcjonalnie)"
                    value={formData.nip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm"
                  />
                </div>
                <input
                  type="text"
                  name="amount"
                  placeholder="Kwota pożyczki (np. 200 000 zł)"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm"
                />
                <input
                  type="text"
                  name="collateral"
                  placeholder="Zabezpieczenie (mieszkanie, dom, działka...)"
                  value={formData.collateral}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm"
                />
                <input
                  type="text"
                  name="period"
                  placeholder="Okres finansowania (ile miesięcy?)"
                  value={formData.period}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm"
                />
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-0.5 w-4 h-4 accent-[#00d2a0] shrink-0"
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
                  className="w-full btn-cta-shine !py-3.5"
                >
                  <Send className="w-4 h-4" />
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
