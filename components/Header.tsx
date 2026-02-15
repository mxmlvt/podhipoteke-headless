"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Column 1: Pożyczki pod zastaw nieruchomości (parent) + sub-items
const col1 = {
  parent: { label: "Pożyczki pod zastaw nieruchomości", path: "/pozyczki-pod-zastaw-nieruchomosci" },
  children: [
    { label: "Pożyczki pod zastaw domu", path: "/pozyczki-pod-zastaw-domu" },
    { label: "Pożyczki pod zastaw działki", path: "/pozyczki-pod-zastaw-dzialki" },
    { label: "Pożyczki pod zastaw gruntów rolnych", path: "/pozyczki-pod-zastaw-gruntow-rolnych" },
    { label: "Pożyczki hipoteczne dla firm", path: "/pozyczki-hipoteczne-dla-firm" },
    { label: "Pożyczki oddłużeniowe", path: "/pozyczki-oddluzeniowe" },
  ],
};

// Column 2: Kredyty hipoteczne (parent) + sub-items
const col2 = {
  parent: { label: "Kredyty hipoteczne", path: "/kredyt-hipoteczny" },
  children: [
    { label: "Kredyt pod zastaw nieruchomości", path: "/kredyt-pod-zastaw-nieruchomosci" },
    { label: "Kredyt pod zastaw działki", path: "/kredyt-pod-zastaw-dzialki" },
    { label: "Kredyt pod zastaw mieszkania", path: "/kredyt-pod-zastaw-mieszkania" },
  ],
};

// Column 3: Pożyczki w Polsce (parent) + city items
const col3 = {
  parent: { label: "Pożyczki w Polsce", path: "/oferta" },
  children: [
    { label: "Pożyczki Warszawa", path: "/pozyczki-warszawa" },
    { label: "Pożyczki Poznań", path: "/pozyczki-poznan" },
    { label: "Pożyczki Łódź", path: "/pozyczki-lodz" },
    { label: "Pożyczki Wrocław", path: "/pozyczki-wroclaw" },
    { label: "Pożyczki Gdańsk", path: "/pozyczki-gdansk" },
    { label: "Pożyczki Białystok", path: "/pozyczki-bialystok" },
    { label: "Pożyczki Olsztyn", path: "/pozyczki-olsztyn" },
    { label: "Pożyczki Kraków", path: "/pozyczki-krakow" },
    { label: "Pożyczki Katowice", path: "/pozyczki-katowice" },
    { label: "Pożyczki Częstochowa", path: "/pozyczki-czestochowa" },
  ],
};

const topMenuItems = [
  { label: "Oferta", path: "/oferta", hasMega: true },
  { label: "FAQ", path: "/faq" },
  { label: "Blog", path: "/blog" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOfferOpen, setMobileOfferOpen] = useState(false);
  const [mobileCol, setMobileCol] = useState<string | null>(null);

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-[1330px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo-dark.png"
              alt="PodHipoteke24.pl"
              width={176}
              height={50}
              className="h-[45px] w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {topMenuItems.map((item) => (
              <div key={item.path} className="relative group">
                {item.hasMega ? (
                  <>
                    <button className="px-4 py-2 text-text-dark hover:text-primary font-semibold text-[1rem] transition-colors flex items-center gap-1">
                      {item.label}
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                    </button>

                    {/* Mega dropdown - 3 columns like original Divi */}
                    <div className="absolute top-full right-0 bg-white shadow-2xl rounded-lg py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-border-light min-w-[700px]">
                      <div className="grid grid-cols-3 gap-0 divide-x divide-border-light">
                        {/* Col 1: Pożyczki pod zastaw nieruchomości */}
                        <div className="px-5">
                          <Link href={col1.parent.path} className="block py-2 text-text-dark hover:text-primary font-semibold text-[15px] transition-colors">
                            {col1.parent.label} ›
                          </Link>
                          <div className="mt-1 space-y-0.5">
                            {col1.children.map((c) => (
                              <Link key={c.path} href={c.path} className="block py-1.5 text-text-body hover:text-primary transition-colors text-[14px]">
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Col 2: Kredyty hipoteczne */}
                        <div className="px-5">
                          <Link href={col2.parent.path} className="block py-2 text-text-dark hover:text-primary font-semibold text-[15px] transition-colors">
                            {col2.parent.label} ›
                          </Link>
                          <div className="mt-1 space-y-0.5">
                            {col2.children.map((c) => (
                              <Link key={c.path} href={c.path} className="block py-1.5 text-text-body hover:text-primary transition-colors text-[14px]">
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Col 3: Pożyczki w Polsce (cities) */}
                        <div className="px-5">
                          <Link href={col3.parent.path} className="block py-2 text-text-dark hover:text-primary font-semibold text-[15px] transition-colors">
                            {col3.parent.label} ›
                          </Link>
                          <div className="mt-1 space-y-0.5 max-h-[300px] overflow-y-auto">
                            {col3.children.map((c) => (
                              <Link key={c.path} href={c.path} className="block py-1.5 text-text-body hover:text-primary transition-colors text-[14px]">
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.path} className="px-4 py-2 text-text-dark hover:text-primary font-semibold text-[1rem] transition-colors">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA buttons */}
            <Link href="/kontakt" className="ml-3 btn-primary !px-5 !py-2">
              Złóż zapytanie
            </Link>
            <Link href="/kontakt" className="ml-2 px-4 py-2 text-text-dark hover:text-primary font-semibold text-[1rem] transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-text-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-secondary max-h-[80vh] overflow-y-auto">
            <nav className="px-4 py-4 flex flex-col gap-1">
              {/* Oferta with nested accordion */}
              <button
                onClick={() => setMobileOfferOpen(!mobileOfferOpen)}
                className="w-full text-left px-4 py-3 text-white font-semibold text-[1.1rem] flex items-center justify-between"
              >
                Oferta
                <svg className={`w-4 h-4 transition-transform ${mobileOfferOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {mobileOfferOpen && (
                <div className="pl-2">
                  {[col1, col2, col3].map((col) => (
                    <div key={col.parent.path}>
                      <button
                        onClick={() => setMobileCol(mobileCol === col.parent.label ? null : col.parent.label)}
                        className="w-full text-left px-4 py-2.5 text-white/90 font-medium text-[1rem] flex items-center justify-between"
                      >
                        {col.parent.label}
                        <svg className={`w-3.5 h-3.5 transition-transform ${mobileCol === col.parent.label ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                      </button>
                      {mobileCol === col.parent.label && (
                        <div className="pl-4">
                          {col.children.map((c) => (
                            <Link
                              key={c.path}
                              href={c.path}
                              className="block px-4 py-1.5 text-white/70 hover:text-white transition-colors text-[14px]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Other top-level items */}
              <Link href="/faq" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/blog" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/kontakt" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link>

              <Link
                href="/kontakt"
                className="mt-2 mx-4 bg-white text-primary px-6 py-3 rounded-[30px] font-semibold text-center text-[1.1rem]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Złóż zapytanie
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
