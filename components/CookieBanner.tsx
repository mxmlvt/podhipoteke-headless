"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "ph24-cookies-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "all");
    setVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem(CONSENT_KEY, "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e7eb] shadow-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-sm text-[#374151] leading-relaxed">
            Ta strona korzysta z plików cookies w celu zapewnienia najlepszej jakości usług.{" "}
            <Link href="/polityka-cookies" className="text-[#00cc9b] underline hover:text-[#1c435e]">
              Dowiedz się więcej
            </Link>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={acceptNecessary}
              className="px-5 py-2 rounded-full border-2 border-[#1c435e] text-[#1c435e] text-sm font-semibold hover:bg-[#e6f7f9] transition-colors whitespace-nowrap"
            >
              Tylko niezbędne
            </button>
            <button
              onClick={accept}
              className="btn-cta-shine !px-6 !py-2 !text-sm whitespace-nowrap"
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
