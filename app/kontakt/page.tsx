"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import PageHero from "@/components/PageHero";

const benefits = [
  "Szybka pożyczka pod nieruchomość bez BIK",
  "Nie wymagamy zaświadczeń z ZUS i US",
  "Nie badamy zdolności kredytowej",
  "Oferujemy elastyczne warunki spłat",
  "Decyzja kredytowa w 24 godziny",
  "Wypłata środków nawet w 48 godzin",
];

const inputCls =
  "w-full px-4 py-3 border border-[#e5e7eb] rounded-xl bg-white text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00d2a0]/40 focus:border-[#00d2a0] transition-colors text-sm";

export default function KontaktPage() {
  const [formMain, setFormMain] = useState({
    name: "", phone: "", email: "", nip: "",
    amount: "", collateral: "", period: "", consent: false,
  });
  const [formSimple, setFormSimple] = useState({
    name: "", email: "", phone: "", message: "", consent: false,
  });
  const [submittedMain, setSubmittedMain] = useState(false);
  const [submittedSimple, setSubmittedSimple] = useState(false);

  const handleMain = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormMain((p) => ({
      ...p,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  const handleSimple = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormSimple((p) => ({
      ...p,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <main>
      <PageHero
        heading="Kontakt"
        text="Masz pytania odnośnie naszej oferty? Skontaktuj się z nami – odpiszemy w ciągu kilku godzin."
        bgImage="/images/faq-bg.jpg"
        breadcrumbs={[
          { label: "Strona główna", href: "/" },
          { label: "Kontakt" },
        ]}
      />

      {/* ── SEKCJA 1: Złóż wniosek ── */}
      <section id="formularz" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              Złóż wniosek
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Wypełnij formularz
            </h2>
            <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
              Nasz doradca skontaktuje się z Tobą w ciągu 15 minut.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEWA: Trust + Dane kontaktowe box */}
            <div>
              <h3 className="text-xl font-bold text-[#111827] mb-5">
                Dlaczego warto nam zaufać?
              </h3>
              <ul className="space-y-3 mb-8">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00d2a0] shrink-0 mt-0.5" />
                    <span className="text-[#374151]">{b}</span>
                  </li>
                ))}
              </ul>
              {/* Dane kontaktowe – navy */}
              <div className="bg-[#1c435e] rounded-2xl p-6 space-y-4">
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

            {/* PRAWA: Formularz navy */}
            <div className="bg-gradient-to-br from-[#1c435e] to-[#0f2a3d] rounded-2xl p-8 shadow-xl">
              {submittedMain ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#00d2a0]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Dziękujemy!</h3>
                  <p className="text-white/70">Oddzwonimy w ciągu 15 minut.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-1">Wypełnij formularz</h3>
                  <p className="text-white/70 text-sm mb-6">
                    a nasz doradca skontaktuje się z Tobą w ciągu 15 minut
                  </p>
                  <form
                    onSubmit={(e) => { e.preventDefault(); setSubmittedMain(true); }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" name="name" placeholder="Imię i nazwisko"
                        value={formMain.name} onChange={handleMain} required className={inputCls} />
                      <input type="tel" name="phone" placeholder="Numer telefonu"
                        value={formMain.phone} onChange={handleMain} required className={inputCls} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="email" name="email" placeholder="Email"
                        value={formMain.email} onChange={handleMain} required className={inputCls} />
                      <input type="text" name="nip" placeholder="NIP firmy (opcjonalnie)"
                        value={formMain.nip} onChange={handleMain} className={inputCls} />
                    </div>
                    <input type="text" name="amount" placeholder="Kwota pożyczki (np. 200 000 zł)"
                      value={formMain.amount} onChange={handleMain} className={inputCls} />
                    <input type="text" name="collateral" placeholder="Zabezpieczenie (mieszkanie, dom, działka...)"
                      value={formMain.collateral} onChange={handleMain} className={inputCls} />
                    <input type="text" name="period" placeholder="Okres finansowania (ile miesięcy?)"
                      value={formMain.period} onChange={handleMain} className={inputCls} />
                    <label className="flex items-start gap-3 cursor-pointer pt-1">
                      <input type="checkbox" name="consent" checked={formMain.consent}
                        onChange={handleMain} required className="mt-0.5 w-4 h-4 accent-[#00d2a0] shrink-0" />
                      <span className="text-xs text-white/70 leading-relaxed">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{" "}
                        <a href="/polityka-prywatnosci" className="text-[#7de8f5] underline hover:text-white">
                          polityką prywatności
                        </a>{" "}
                        w celu obsługi mojego zapytania.
                      </span>
                    </label>
                    <button type="submit" className="w-full btn-cta-shine !py-3.5">
                      <Send className="w-4 h-4" />
                      Wyślij wniosek
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCJA 2: Dane + prosty formularz ── */}
      <section className="py-16 md:py-20 bg-[#f0fafb]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEWA: Dane kontaktowe + mapa */}
            <div>
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                Dane kontaktowe
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-8">
                Skontaktuj się z nami
              </h2>
              <div className="space-y-6 mb-8">
                <a href="tel:577873616" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0 group-hover:bg-[#d0ecf0] transition-colors">
                    <Phone className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Telefon</p>
                    <p className="text-[#111827] text-lg font-semibold group-hover:text-[#1c435e] transition-colors">
                      577 873 616
                    </p>
                  </div>
                </a>
                <a href="mailto:kontakt@podhipoteke24.pl" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0 group-hover:bg-[#d0ecf0] transition-colors">
                    <Mail className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">E-mail</p>
                    <p className="text-[#111827] text-lg font-semibold group-hover:text-[#1c435e] transition-colors">
                      kontakt@podhipoteke24.pl
                    </p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0">
                    <MapPin className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Adres</p>
                    <p className="text-[#111827] font-semibold">ul. Przykładowa 1, 00-000 Warszawa</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0">
                    <Clock className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Godziny pracy</p>
                    <p className="text-[#111827] font-semibold">Pon–Pt: 8:00 – 18:00</p>
                  </div>
                </div>
              </div>
              {/* Mapa placeholder */}
              <div className="rounded-2xl overflow-hidden border border-[#e5e7eb] h-48 bg-[#e6f7f9] flex items-center justify-center">
                <p className="text-[#6b7280] text-sm">Mapa Google</p>
              </div>
            </div>

            {/* PRAWA: Formularz prosty – bg-white */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                Formularz kontaktowy
              </span>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">Napisz do nas</h2>
              <p className="text-[#6b7280] text-sm mb-6">
                Odpiszemy w ciągu kilku godzin.
              </p>
              {submittedSimple ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-12 h-12 text-[#00d2a0] mb-3" />
                  <h3 className="text-lg font-bold text-[#111827] mb-1">Wiadomość wysłana!</h3>
                  <p className="text-[#6b7280] text-sm">Odezwiemy się wkrótce.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmittedSimple(true); }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Imię i nazwisko"
                      value={formSimple.name} onChange={handleSimple} required className={inputCls} />
                    <input type="tel" name="phone" placeholder="Numer telefonu"
                      value={formSimple.phone} onChange={handleSimple} required className={inputCls} />
                  </div>
                  <input type="email" name="email" placeholder="Email"
                    value={formSimple.email} onChange={handleSimple} required className={inputCls} />
                  <textarea name="message" placeholder="Treść wiadomości"
                    value={formSimple.message} onChange={handleSimple} rows={4}
                    className={inputCls + " resize-none"} />
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="consent" checked={formSimple.consent}
                      onChange={handleSimple} required className="mt-0.5 w-4 h-4 accent-[#00d2a0] shrink-0" />
                    <span className="text-xs text-[#6b7280] leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{" "}
                      <a href="/polityka-prywatnosci" className="text-[#2299AA] underline">
                        polityką prywatności
                      </a>.
                    </span>
                  </label>
                  <button type="submit" className="w-full btn-cta-shine !py-3.5">
                    <Send className="w-4 h-4" />
                    Wyślij wiadomość
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
