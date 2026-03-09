import type { ServiceData } from "@/lib/service-page-data";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import GoogleReviews from "@/components/GoogleReviews";
import Link from "next/link";

interface Props {
  data: ServiceData;
}

export default function ServicePageTemplate({ data }: Props) {
  const {
    introHeading,
    introText,
    keyFacts,
    acceptedTypes,
    requirements,
    faqs,
    ctaHeading,
    ctaText,
    slug,
  } = data;

  // JSON-LD FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // JSON-LD BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://podhipoteke24.pl/" },
      { "@type": "ListItem", position: 2, name: "Oferta", item: "https://podhipoteke24.pl/oferta" },
      {
        "@type": "ListItem",
        position: 3,
        name: data.h1,
        item: `https://podhipoteke24.pl/oferta/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── 1. Intro ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                {data.badge}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4 leading-snug">
                {introHeading}
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">{introText}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#formularz"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#2299AA] text-white font-semibold text-sm hover:bg-[#1c8898] transition-colors"
                >
                  Złóż wniosek
                </Link>
                <a
                  href="tel:577873616"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold text-sm hover:bg-[#1c435e] hover:text-white transition-all"
                >
                  Zadzwoń: 577 873 616
                </a>
              </div>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-2 gap-4">
              {keyFacts.map((f) => (
                <div
                  key={f.label}
                  className="bg-[#f0fafb] rounded-2xl p-5 text-center border border-[#d4eef2]"
                >
                  <p className="text-3xl font-extrabold text-[#1c435e]">{f.value}</p>
                  <p className="text-xs text-[#6b7280] mt-1">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Co przyjmujemy jako zabezpieczenie ─────────────────── */}
      <section className="py-14 md:py-20 bg-[#f4f6f8]">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1c435e]/10 text-[#1c435e]">
              Zabezpieczenia
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Co przyjmujemy jako zabezpieczenie?
            </h2>
            <p className="text-[#6b7280] mt-2 text-sm max-w-xl mx-auto">
              Akceptujemy szeroki zakres nieruchomości – oceń, czy Twoja nieruchomość się kwalifikuje
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {acceptedTypes.map((t) => (
              <div
                key={t.title}
                className="bg-white rounded-2xl p-5 border border-[#e5e7eb] flex gap-4 items-start shadow-sm"
              >
                <span className="text-3xl shrink-0">{t.icon}</span>
                <div>
                  <h3 className="font-bold text-[#111827] text-sm mb-1">{t.title}</h3>
                  <p className="text-[#6b7280] text-xs leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Wymagania ──────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                Wymagania
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Minimalne wymagania do udzielenia pożyczki
              </h2>
              <ul className="space-y-3">
                {requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#2299AA]/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-[#2299AA]" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-[#374151] text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-[#fef9ec] border border-[#fcd34d] rounded-xl text-sm text-[#92400e]">
                <strong>Nie wymagamy:</strong> zaświadczeń o dochodach, wyciągów bankowych,
                zatrudnienia ani pozytywnej historii kredytowej.
              </div>
            </div>

            {/* Jak to działa – mini steps */}
            <div className="bg-[#f0fafb] rounded-2xl p-6 border border-[#d4eef2]">
              <h3 className="font-bold text-[#1c435e] text-base mb-5">
                Jak wygląda proces pożyczki?
              </h3>
              <ol className="space-y-4">
                {[
                  { n: "01", title: "Złóż wniosek", text: "Przez formularz online lub telefon – podaj kwotę i nieruchomość." },
                  { n: "02", title: "Bezpłatna wycena", text: "Nasz rzeczoznawca wycenia nieruchomość i wydajemy wstępną decyzję." },
                  { n: "03", title: "Umowa notarialna", text: "Podpisanie umowy pożyczki i wpis hipoteki – u notariusza w Twoim mieście." },
                  { n: "04", title: "Wypłata środków", text: "Pieniądze na Twoim koncie w dniu podpisania aktu notarialnego." },
                ].map((s) => (
                  <li key={s.n} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#2299AA] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {s.n}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1c435e] text-sm">{s.title}</p>
                      <p className="text-[#6b7280] text-xs leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Opinie klientów ────────────────────────────────────── */}
      <GoogleReviews />

      {/* ── 5. Narzędzia online ───────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#f0fafb]">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Sprawdź przed złożeniem wniosku
            </h2>
            <p className="text-[#6b7280] mt-2 text-sm">
              Bezpłatne narzędzia online – bez rejestracji
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: "/narzedzia/ile-moge-pozyczyc",
                icon: "🏠",
                title: "Ile mogę pożyczyć?",
                text: "Wpisz wartość nieruchomości i oblicz maksymalną kwotę pożyczki.",
              },
              {
                href: "/narzedzia/kalkulator-raty",
                icon: "🧮",
                title: "Kalkulator raty",
                text: "Sprawdź wysokość miesięcznej raty przy różnych kwotach i okresach.",
              },
              {
                href: "/narzedzia/diagnostyka",
                icon: "📋",
                title: "Diagnostyka zdolności",
                text: "Oceń szanse na udzielenie pożyczki na podstawie swojej sytuacji.",
              },
            ].map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#d4eef2] flex flex-col gap-3 hover:shadow-md hover:border-[#2299AA] transition-all duration-200 group"
              >
                <span className="text-3xl">{t.icon}</span>
                <h3 className="font-bold text-[#111827] group-hover:text-[#2299AA] transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{t.text}</p>
                <span className="text-[#2299AA] text-sm font-semibold mt-auto">Sprawdź →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[780px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              FAQ
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Najczęstsze pytania
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ── 7. CTA ────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#0f2a3d]">
        <div className="max-w-[780px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {ctaHeading}
          </h2>
          <p className="text-white/70 mb-8">{ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formularz" className="btn-cta-shine !px-10 !py-4">
              Złóż wniosek online
            </a>
            <a
              href="tel:577873616"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-[#1c435e] transition-all duration-300"
            >
              Zadzwoń: 577 873 616
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. Formularz kontaktowy ───────────────────────────────── */}
      <ContactForm />
    </>
  );
}
