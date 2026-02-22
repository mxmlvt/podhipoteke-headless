"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Check, Phone, Send } from "lucide-react";
import { IMAGES } from "@/lib/images";

const trustItems = [
  { text: "20 lat doświadczenia" },
  { text: "Bez BIK" },
  { text: "Decyzja w 24h" },
  { text: "Do 2 mln zł" },
];

const kwotaOptions = [
  { value: "50-100k", label: "50 000 – 100 000 zł" },
  { value: "100-200k", label: "100 000 – 200 000 zł" },
  { value: "200-500k", label: "200 000 – 500 000 zł" },
  { value: "500k-1m", label: "500 000 – 1 000 000 zł" },
  { value: "1-2m", label: "1 000 000 – 2 000 000 zł" },
];

export default function Hero() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", kwota: "", rodo: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[700px] overflow-hidden">
      {/* Background image */}
      <Image
        src={IMAGES.hero.main}
        alt="Pożyczki pod hipotekę nieruchomości"
        fill
        sizes="100vw"
        quality={90}
        priority
        className="object-cover object-center"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f2a3d]/95 via-[#1c435e]/88 to-[#1c435e]/60" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center">

          {/* LEFT: content */}
          <div className="text-white">
            {/* Badge */}
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-[#2299AA]/25 text-[#7de8f5] border border-[#2299AA]/40 uppercase tracking-wider">
              Pożyczki pozabankowe pod zastaw
            </span>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-white leading-tight mb-5">
              Ekspresowe pożyczki<br className="hidden md:block" /> pod hipotekę nieruchomości
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-xl mb-8 max-w-xl leading-relaxed">
              Kwoty od 50 000 do 2 000 000 zł. Bez BIK. Decyzja w 24h.
            </p>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-3 mb-7">
              {trustItems.map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium border border-white/20"
                >
                  <Check className="w-3.5 h-3.5 text-[#2299AA] shrink-0" />
                  {item.text}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#f59e0b]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-white font-bold text-lg">4.8</span>
              <span className="text-white/60 text-sm">· Opinie klientów</span>
            </div>
          </div>

          {/* RIGHT: contact form card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {!sent ? (
              <>
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-[#111827]">Zamów ofertę pożyczki</h2>
                  <p className="text-[#6b7280] text-sm mt-1">Kontakt do 15 minut</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Imię</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:ring-2 focus:ring-[#2299AA]/40 focus:border-[#2299AA] transition-colors"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Telefon</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:ring-2 focus:ring-[#2299AA]/40 focus:border-[#2299AA] transition-colors"
                      placeholder="+48 000 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:ring-2 focus:ring-[#2299AA]/40 focus:border-[#2299AA] transition-colors"
                      placeholder="jan@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Kwota pożyczki</label>
                    <select
                      required
                      value={form.kwota}
                      onChange={(e) => setForm({ ...form, kwota: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm focus:outline-none focus:ring-2 focus:ring-[#2299AA]/40 focus:border-[#2299AA] transition-colors bg-white text-[#374151]"
                    >
                      <option value="">Wybierz kwotę</option>
                      {kwotaOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="rodo-hero"
                      required
                      checked={form.rodo}
                      onChange={(e) => setForm({ ...form, rodo: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded accent-[#2299AA]"
                    />
                    <label htmlFor="rodo-hero" className="text-xs text-[#6b7280] leading-relaxed">
                      Wyrażam zgodę na przetwarzanie danych osobowych w celu kontaktu w sprawie oferty pożyczki.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-cta-shine !py-3 disabled:opacity-70"
                  >
                    {loading ? "Wysyłanie..." : (
                      <>
                        <Send className="w-4 h-4" />
                        Wyślij zapytanie
                      </>
                    )}
                  </button>
                </form>
                <div className="mt-4 text-center text-sm text-[#6b7280]">
                  Lub zadzwoń:{" "}
                  <a href="tel:577873616" className="font-bold text-[#1c435e] hover:text-[#2299AA]">
                    577 873 616
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#e6f7f9] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#2299AA]" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">Dziękujemy!</h3>
                <p className="text-[#6b7280]">Skontaktujemy się z Tobą w ciągu 15 minut.</p>
                <a
                  href="tel:577873616"
                  className="mt-5 inline-flex items-center gap-2 text-[#1c435e] font-semibold hover:text-[#2299AA]"
                >
                  <Phone className="w-4 h-4" />
                  577 873 616
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
