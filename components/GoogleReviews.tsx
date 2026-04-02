"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Reviews data ──────────────────────────────────────────────────────────────
// TODO: zastąp poniższe dane prawdziwymi opiniami z Google Maps
const REVIEWS = [
  {
    name: "Tomasz Wiśniewski",
    initials: "TW",
    color: "#2299AA",
    rating: 5,
    date: "tydzień temu",
    text: "Skorzystałem z pożyczki pod zastaw mieszkania i jestem bardzo zadowolony. Cały proces przebiegł sprawnie, bez zbędnych formalności. Pieniądze otrzymałem w ciągu 48 godzin od podpisania umowy. Polecam każdemu, kto potrzebuje szybkiego finansowania.",
  },
  {
    name: "Anna Kowalczyk",
    initials: "AK",
    color: "#1c435e",
    rating: 5,
    date: "2 tygodnie temu",
    text: "Profesjonalna i rzetelna firma. Miałam wcześniej odmowę w bankach z powodu historii kredytowej, a tutaj dostałam pomoc bez zbędnych pytań. Piotr Adler wytłumaczył wszystko krok po kroku. Bardzo polecam!",
  },
  {
    name: "Marek Nowak",
    initials: "MN",
    color: "#40B0BF",
    rating: 5,
    date: "miesiąc temu",
    text: "Szybka decyzja, uczciwe warunki. Potrzebowałem pilnie środków na spłatę zobowiązań – dostałem je w dniu podpisania aktu notarialnego. Obsługa na najwyższym poziomie, kontakt bardzo dobry przez cały czas.",
  },
  {
    name: "Katarzyna Zielińska",
    initials: "KZ",
    color: "#2299AA",
    rating: 5,
    date: "miesiąc temu",
    text: "Zdecydowanie polecam podhipoteke24.pl! Miałam komornika, żaden bank nie chciał rozmawiać. Tu potraktowali mnie poważnie i w ciągu tygodnia miałam przelane pieniądze. Teraz jestem na prostej. Dziękuję!",
  },
  {
    name: "Robert Jabłoński",
    initials: "RJ",
    color: "#1c435e",
    rating: 5,
    date: "2 miesiące temu",
    text: "Korzystam już po raz drugi. Firma działa szybko i bez zbędnej biurokracji. Warunki umowy jasne i czytelne. Polecam każdemu, kto szuka rzetelnego pożyczkodawcy poza bankiem.",
  },
  {
    name: "Monika Lewandowska",
    initials: "ML",
    color: "#40B0BF",
    rating: 5,
    date: "2 miesiące temu",
    text: "Bardzo dobra obsługa. Potrzebowałam sfinansować remont domu – bank odmówił ze względu na wiek nieruchomości. Tu nie było problemu. Cały proces był przejrzysty i profesjonalny.",
  },
  {
    name: "Piotr Grabowski",
    initials: "PG",
    color: "#2299AA",
    rating: 5,
    date: "3 miesiące temu",
    text: "Skorzystałem z pożyczki pod zastaw działki. Nikt inny nie chciał tego sfinansować, a tutaj dostałem decyzję w 24h. Bardzo dobry kontakt z doradcą, wszystko wytłumaczone jasno.",
  },
  {
    name: "Elżbieta Wójcik",
    initials: "EW",
    color: "#1c435e",
    rating: 5,
    date: "3 miesiące temu",
    text: "Firma godna zaufania. Działam w biznesie i potrzebowałam szybkiego zastrzyku gotówki pod zastaw nieruchomości firmowej. Obsługa ekspresowa, brak biurokracji. Na pewno skorzystam ponownie.",
  },
];

const READ_MORE_LIMIT = 180;
const AUTOPLAY_MS = 5000;
const MAPS_LINK = "https://maps.app.goo.gl/bDgoSg3GVUSGHUDTA";

// ─── Star icon ─────────────────────────────────────────────────────────────────
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
          <polygon
            points="10,1 12.6,7 19,7.6 14,12.1 15.6,19 10,15.4 4.4,19 6,12.1 1,7.6 7.4,7"
            fill={i <= n ? "#FFC107" : "#e5e7eb"}
          />
        </svg>
      ))}
    </div>
  );
}

// ─── Google logo (simplified SVG) ──────────────────────────────────────────────
function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden>
      <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9L37.5 9C34 5.8 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7.3 19-20 0-1.3-.2-2.7-.4-4z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 2.9L37.5 9C34 5.8 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.8-1.8 13.4-4.7l-6.2-5.2C29.3 35.7 26.8 36 24 36c-5.2 0-9.6-3-11.3-7.4l-6.5 5C9.7 39.7 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.4 4.4-4.5 5.8l6.2 5.2C41.4 35.1 44 30 44 24c0-1.3-.2-2.7-.4-4z"/>
    </svg>
  );
}

// ─── Single review card ─────────────────────────────────────────────────────────
function ReviewCard({ r, expanded }: { r: typeof REVIEWS[0]; expanded: boolean }) {
  const [open, setOpen] = useState(false);
  const long = r.text.length > READ_MORE_LIMIT;
  const shown = !long || open || expanded ? r.text : r.text.slice(0, READ_MORE_LIMIT) + "…";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: r.color }}
        >
          {r.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#111827] text-sm truncate">{r.name}</p>
          <p className="text-[#9ca3af] text-xs">{r.date}</p>
        </div>
        <GoogleLogo />
      </div>

      {/* Stars */}
      <Stars n={r.rating} />

      {/* Text */}
      <p className="text-[#374151] text-sm leading-relaxed flex-1">
        {shown}
        {long && !expanded && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-1 text-[#2299AA] font-medium hover:underline focus:outline-none"
          >
            {open ? "mniej" : "więcej"}
          </button>
        )}
      </p>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function GoogleReviews() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = REVIEWS.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Responsive: 1 mobile, 2 tablet, 3 desktop
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Clamp current when visibleCount changes
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const next = useCallback(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);
  const prev = useCallback(() => setCurrent((c) => (c <= 0 ? maxIndex : c - 1)), [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (paused || expanded) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, expanded, next]);

  // Touch/swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    setPaused(false);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1080px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <GoogleLogo />
            <div>
              <p className="font-bold text-[#111827] text-lg leading-none">podhipoteke24.pl</p>
              <div className="flex items-center gap-2 mt-1">
                <Stars n={5} />
                <span className="font-bold text-[#111827]">5.0</span>
                <span className="text-[#6b7280] text-sm">· {REVIEWS.length} opinii</span>
              </div>
            </div>
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#2299AA] text-[#2299AA] font-semibold text-sm hover:bg-[#2299AA] hover:text-white transition-all duration-200 shrink-0"
          >
            Napisz opinię
          </a>
        </div>

        {/* ── Carousel (hidden when expanded) ── */}
        {!expanded && (
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Track */}
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * (100 / visibleCount)}%)` }}
            >
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className="shrink-0 px-2"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <ReviewCard r={r} expanded={false} />
                </div>
              ))}
            </div>

            {/* Prev / Next */}
            <button
              onClick={() => { prev(); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
              aria-label="Poprzednia opinia"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#1c435e] hover:bg-[#2299AA] hover:text-white transition-colors duration-200 z-10"
            >
              ‹
            </button>
            <button
              onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
              aria-label="Następna opinia"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#1c435e] hover:bg-[#2299AA] hover:text-white transition-colors duration-200 z-10"
            >
              ›
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
                  aria-label={`Przejdź do opinii ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 8,
                    height: 8,
                    background: i === current ? "#2299AA" : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Expanded grid ── */}
        {expanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} r={r} expanded />
            ))}
          </div>
        )}

        {/* Toggle button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#f4f4f4] text-[#1c435e] font-semibold text-sm hover:bg-[#2299AA] hover:text-white transition-all duration-200"
          >
            {expanded ? "Pokaż mniej" : `Pokaż wszystkie ${REVIEWS.length} opinii`}
          </button>
        </div>
      </div>
    </section>
  );
}
