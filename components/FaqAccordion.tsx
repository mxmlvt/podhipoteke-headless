"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/content-parser";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-[#111827] mb-5">
        Najczęściej zadawane pytania
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-[#e5e7eb] rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-[#f8f9fa] hover:bg-[#edf8fa] transition-colors duration-200"
              >
                <span className="font-semibold text-[#1c435e] text-base leading-snug">
                  {item.question}
                </span>
                <span
                  className="shrink-0 text-[#2299AA] text-xl font-light transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? "600px" : "0px" }}
              >
                <p className="px-5 py-4 text-[#555] leading-relaxed text-sm bg-white">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
