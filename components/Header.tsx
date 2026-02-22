"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Column 1: Pożyczki pod zastaw nieruchomości
const col1 = {
  parent: { label: "Pożyczki pod zastaw nieruchomości", path: "/oferta/pozyczki-pod-zastaw-nieruchomosci" },
  children: [
    { label: "Pożyczki pod zastaw domu", path: "/oferta/pozyczki-pod-zastaw-domu" },
    { label: "Pożyczki pod zastaw działki", path: "/oferta/pozyczki-pod-zastaw-dzialki" },
    { label: "Pożyczki pod zastaw gruntów rolnych", path: "/oferta/pozyczki-pod-zastaw-gruntow-rolnych" },
    { label: "Pożyczki hipoteczne dla firm", path: "/oferta/pozyczki-hipoteczne-dla-firm" },
    { label: "Pożyczki oddłużeniowe", path: "/oferta/pozyczki-oddluzeniowe-2" },
  ],
};

// Column 2: Kredyty hipoteczne
const col2 = {
  parent: { label: "Kredyty hipoteczne", path: "/oferta/kredyt-hipoteczny" },
  children: [
    { label: "Kredyt pod zastaw nieruchomości", path: "/oferta/kredyt-pod-zastaw-nieruchomosci" },
    { label: "Kredyt pod zastaw działki", path: "/oferta/kredyt-pod-zastaw-dzialki" },
    { label: "Kredyt pod zastaw mieszkania", path: "/oferta/kredyt-pod-zastaw-mieszkania" },
  ],
};

// Column 3: Pożyczki w Polsce (miasta)
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

// Narzędzia (nowe)
const toolsItems = [
  { label: "Kalkulator raty", path: "/kalkulator-raty" },
  { label: "Ile mogę pożyczyć?", path: "/ile-moge-pozyczyc" },
  { label: "Porównywarka kredytów", path: "/porownywarka-kredytow" },
  { label: "Diagnostyka finansowa", path: "/diagnostyka-finansowa" },
  { label: "Kalkulator konsolidacji", path: "/kalkulator-konsolidacji" },
];

const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg className={`w-3.5 h-3.5 ${className}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOfferOpen, setMobileOfferOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
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
            {/* O nas */}
            <Link href="/o-nas" className="px-4 py-2 text-text-dark hover:text-accent font-semibold text-[1rem] transition-colors">
              O nas
            </Link>

            {/* Oferta dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-text-dark hover:text-accent font-semibold text-[1rem] transition-colors flex items-center gap-1">
                Oferta
                <ChevronDown />
              </button>
              <div className="absolute top-full left-0 bg-white shadow-2xl rounded-lg py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-border-light min-w-[700px]">
                <div className="grid grid-cols-3 gap-0 divide-x divide-border-light">
                  {/* Col 1 */}
                  <div className="px-5">
                    <Link href={col1.parent.path} className="block py-2 text-text-dark hover:text-accent font-semibold text-[15px] transition-colors">
                      {col1.parent.label} ›
                    </Link>
                    <div className="mt-1 space-y-0.5">
                      {col1.children.map((c) => (
                        <Link key={c.path} href={c.path} className="block py-1.5 text-text-body hover:text-accent transition-colors text-[14px]">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Col 2 */}
                  <div className="px-5">
                    <Link href={col2.parent.path} className="block py-2 text-text-dark hover:text-accent font-semibold text-[15px] transition-colors">
                      {col2.parent.label} ›
                    </Link>
                    <div className="mt-1 space-y-0.5">
                      {col2.children.map((c) => (
                        <Link key={c.path} href={c.path} className="block py-1.5 text-text-body hover:text-accent transition-colors text-[14px]">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Col 3: Pożyczki w Polsce */}
                  <div className="px-5">
                    <Link href={col3.parent.path} className="block py-2 text-text-dark hover:text-accent font-semibold text-[15px] transition-colors">
                      {col3.parent.label} ›
                    </Link>
                    <div className="mt-1 space-y-0.5 max-h-[300px] overflow-y-auto">
                      {col3.children.map((c) => (
                        <Link key={c.path} href={c.path} className="block py-1.5 text-text-body hover:text-accent transition-colors text-[14px]">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narzędzia dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-text-dark hover:text-accent font-semibold text-[1rem] transition-colors flex items-center gap-1">
                Narzędzia
                <ChevronDown />
              </button>
              <div className="absolute top-full left-0 bg-white shadow-2xl rounded-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-border-light min-w-[220px]">
                {toolsItems.map((t) => (
                  <Link key={t.path} href={t.path} className="block px-5 py-2 text-text-body hover:text-accent hover:bg-bg-light transition-colors text-[14px]">
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <Link href="/faq" className="px-4 py-2 text-text-dark hover:text-accent font-semibold text-[1rem] transition-colors">
              FAQ
            </Link>

            {/* Blog */}
            <Link href="/blog" className="px-4 py-2 text-text-dark hover:text-accent font-semibold text-[1rem] transition-colors">
              Blog
            </Link>

            {/* Kontakt z numerem */}
            <Link href="/kontakt" className="px-4 py-2 text-text-dark hover:text-accent font-semibold text-[1rem] transition-colors">
              Kontakt
            </Link>

            {/* CTA button */}
            <a href="tel:577873616" className="ml-2 btn-outline-white !text-primary !border-primary hover:!bg-primary hover:!text-white !px-5 !py-2 !text-[0.95rem]">
              577 873 616
            </a>
            <Link href="#formularz" className="ml-2 btn-cta-shine !px-5 !py-2 !text-[0.95rem]">
              Złóż zapytanie
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
          <div className="lg:hidden bg-primary max-h-[80vh] overflow-y-auto">
            <nav className="px-4 py-4 flex flex-col gap-1">
              <Link href="/" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>Strona główna</Link>
              <Link href="/o-nas" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>O nas</Link>

              {/* Oferta accordion */}
              <button
                onClick={() => setMobileOfferOpen(!mobileOfferOpen)}
                className="w-full text-left px-4 py-3 text-white font-semibold text-[1.1rem] flex items-center justify-between"
              >
                Oferta
                <ChevronDown className={`transition-transform ${mobileOfferOpen ? "rotate-180" : ""}`} />
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
                        <ChevronDown className={`transition-transform ${mobileCol === col.parent.label ? "rotate-180" : ""}`} />
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

              {/* Narzędzia accordion */}
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="w-full text-left px-4 py-3 text-white font-semibold text-[1.1rem] flex items-center justify-between"
              >
                Narzędzia
                <ChevronDown className={`transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileToolsOpen && (
                <div className="pl-6">
                  {toolsItems.map((t) => (
                    <Link
                      key={t.path}
                      href={t.path}
                      className="block px-4 py-1.5 text-white/70 hover:text-white transition-colors text-[14px]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/faq" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/blog" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/kontakt" className="block px-4 py-3 text-white font-semibold text-[1.1rem]" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link>

              <a
                href="tel:577873616"
                className="mt-2 mx-4 border-2 border-white/60 text-white px-6 py-3 rounded-[30px] font-semibold text-center text-[1.1rem]"
              >
                Zadzwoń: 577 873 616
              </a>
              <Link
                href="#formularz"
                className="mt-2 mx-4 btn-cta-shine text-center text-[1.1rem]"
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
