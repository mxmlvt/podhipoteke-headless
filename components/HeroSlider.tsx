"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    heading: "POŻYCZKI POD NIERUCHOMOŚCI",
    text: "Ekspresowo wycenimy Twoją nieruchomość i wypłacimy Ci środki",
    button: "Dowiedz się więcej",
    bg: "/images/slide-1.jpg",
  },
  {
    heading: "EKSPRESOWE POŻYCZKI DLA FIRM",
    text: "Skontaktuj się z nami i poznaj możliwości rozwoju swojej firmy",
    button: "Dowiedz się więcej",
    bg: "/images/slide-2.jpg",
  },
  {
    heading: "DORADZTWO FINANSOWE",
    text: "Otrzymaj środki już w 24 godziny!",
    button: "Dowiedz się więcej",
    bg: "/images/slide-3.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-[1330px] mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-[4.2rem] font-medium text-white leading-tight mb-6">
                {slide.heading}
              </h1>
              <p className="text-white text-lg md:text-2xl mb-8 max-w-3xl mx-auto">
                {slide.text}
              </p>
              <Link href="/kontakt" className="btn-primary !px-8 !py-3 !text-lg">
                {slide.button}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slider dots - Divi style controllers */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Poprzedni"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Następny"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
      </button>
    </section>
  );
}
