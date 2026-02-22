"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// ──── Dane menu ────────────────────────────────────────────────────────────────

const ofertaGroups = [
  {
    heading: "Pożyczki pod zastaw nieruchomości",
    items: [
      { label: "Pożyczki pod zastaw nieruchomości", path: "/oferta/pozyczki-pod-zastaw-nieruchomosci" },
      { label: "Pożyczki pod zastaw domu", path: "/oferta/pozyczki-pod-zastaw-domu" },
      { label: "Pożyczki pod zastaw działki", path: "/oferta/pozyczki-pod-zastaw-dzialki" },
      { label: "Pożyczki pod zastaw gruntów rolnych", path: "/oferta/pozyczki-pod-zastaw-gruntow-rolnych" },
      { label: "Pożyczki hipoteczne dla firm", path: "/oferta/pozyczki-hipoteczne-dla-firm" },
      { label: "Pożyczki oddłużeniowe", path: "/oferta/pozyczki-oddluzeniowe-2" },
    ],
  },
  {
    heading: "Kredyty hipoteczne",
    items: [
      { label: "Kredyt pod zastaw nieruchomości", path: "/oferta/kredyt-pod-zastaw-nieruchomosci" },
      { label: "Kredyt pod zastaw działki", path: "/oferta/kredyt-pod-zastaw-dzialki" },
      { label: "Kredyt pod zastaw mieszkania", path: "/oferta/kredyt-pod-zastaw-mieszkania" },
    ],
  },
  {
    heading: "Pożyczki w Polsce",
    items: [
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
  },
];

const narzedziaItems = [
  { label: "Kalkulator raty", path: "/narzedzia/kalkulator-raty" },
  { label: "Ile mogę pożyczyć?", path: "/narzedzia/ile-moge-pozyczyc" },
  { label: "Porównywarka kredytów", path: "/narzedzia/porownywarka" },
  { label: "Diagnostyka finansowa", path: "/narzedzia/diagnostyka" },
  { label: "Kalkulator konsolidacji", path: "/narzedzia/kalkulator-konsolidacji" },
];

// ──── Komponent ────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo-dark.png"
              alt="PodHipoteke24.pl"
              width={160}
              height={45}
              className="h-[40px] w-auto"
              priority
            />
          </Link>

          {/* ── Desktop nav ─────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Nawigacja główna">

            {/* Strona główna */}
            <Link href="/" className="px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-full hover:bg-[#e6f7f9]">
              Strona główna
            </Link>

            {/* O nas */}
            <Link href="/o-nas" className="px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-full hover:bg-[#e6f7f9]">
              O nas
            </Link>

            {/* Oferta – mega dropdown */}
            <div className="relative group">
              <Link
                href="/oferta"
                className="flex items-center gap-1 px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-full hover:bg-[#e6f7f9]"
              >
                Oferta
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {/* Mega menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white shadow-2xl rounded-2xl py-6 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#e5e7eb] w-[760px]">
                <div className="grid grid-cols-3 gap-6">
                  {ofertaGroups.map((group) => (
                    <div key={group.heading}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-3 px-1">
                        {group.heading}
                      </p>
                      <ul className="space-y-0.5">
                        {group.items.map((item) => (
                          <li key={item.path}>
                            <Link
                              href={item.path}
                              className="block px-3 py-2 text-[#374151] hover:text-[#1c435e] hover:bg-[#e6f7f9] text-sm rounded-lg transition-colors"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Narzędzia – dropdown */}
            <div className="relative group">
              <Link
                href="/narzedzia"
                className="flex items-center gap-1 px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-full hover:bg-[#e6f7f9]"
              >
                Narzędzia
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#e5e7eb] min-w-[240px]">
                {narzedziaItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="flex items-center px-4 py-2.5 text-[#374151] hover:text-[#1c435e] hover:bg-[#e6f7f9] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <Link href="/faq" className="px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-full hover:bg-[#e6f7f9]">
              FAQ
            </Link>

            {/* Blog */}
            <Link href="/blog" className="px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-full hover:bg-[#e6f7f9]">
              Blog
            </Link>

            {/* Kontakt */}
            <Link href="/kontakt" className="px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-full hover:bg-[#e6f7f9]">
              Kontakt
            </Link>
          </nav>

          {/* Desktop right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:577873616"
              className="flex items-center gap-1.5 text-[#1c435e] font-semibold text-sm hover:text-[#2299AA] transition-colors"
            >
              <Phone className="w-4 h-4" />
              577 873 616
            </a>
            <a href="#formularz" className="btn-cta-shine !px-6 !py-2 !text-sm">
              Złóż wniosek
            </a>
          </div>

          {/* ── Mobile: phone + hamburger ──────────────────────── */}
          <div className="flex lg:hidden items-center gap-3">
            <a href="tel:577873616" className="text-[#1c435e]" aria-label="Zadzwoń do nas">
              <Phone className="w-5 h-5" />
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-[#374151] rounded-lg hover:bg-[#e6f7f9]"
                  aria-label="Otwórz menu"
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 bg-white">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-[#e5e7eb]">
                    <Image
                      src="/images/logo-dark.png"
                      alt="PodHipoteke24.pl"
                      width={140}
                      height={40}
                      className="h-[36px] w-auto"
                    />
                  </div>
                  <nav className="flex-1 overflow-y-auto py-4">
                    {/* Strona główna */}
                    <Link href="/" className="block px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#e6f7f9]" onClick={() => setMobileOpen(false)}>
                      Strona główna
                    </Link>

                    {/* O nas */}
                    <Link href="/o-nas" className="block px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#e6f7f9]" onClick={() => setMobileOpen(false)}>
                      O nas
                    </Link>

                    {/* Oferta – accordion z 3 grupami */}
                    <div>
                      <button
                        className="w-full flex items-center justify-between px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#e6f7f9]"
                        onClick={() => setOpenMobileSection(openMobileSection === "oferta" ? null : "oferta")}
                      >
                        Oferta
                        <ChevronDown className={`w-4 h-4 transition-transform ${openMobileSection === "oferta" ? "rotate-180" : ""}`} />
                      </button>
                      {openMobileSection === "oferta" && (
                        <div className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                          {ofertaGroups.map((group) => (
                            <div key={group.heading}>
                              <button
                                className="w-full flex items-center justify-between px-6 py-2.5 text-[#6b7280] font-semibold text-xs uppercase tracking-wider hover:bg-[#e6f7f9]"
                                onClick={() => setOpenMobileGroup(openMobileGroup === group.heading ? null : group.heading)}
                              >
                                {group.heading}
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMobileGroup === group.heading ? "rotate-180" : ""}`} />
                              </button>
                              {openMobileGroup === group.heading && (
                                <div className="bg-[#e6f7f9]">
                                  {group.items.map((item) => (
                                    <Link
                                      key={item.path}
                                      href={item.path}
                                      className="block px-8 py-2.5 text-[#374151] text-sm hover:text-[#1c435e]"
                                      onClick={() => { setMobileOpen(false); setOpenMobileSection(null); setOpenMobileGroup(null); }}
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Narzędzia – accordion */}
                    <div>
                      <button
                        className="w-full flex items-center justify-between px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#e6f7f9]"
                        onClick={() => setOpenMobileSection(openMobileSection === "narzedzia" ? null : "narzedzia")}
                      >
                        Narzędzia
                        <ChevronDown className={`w-4 h-4 transition-transform ${openMobileSection === "narzedzia" ? "rotate-180" : ""}`} />
                      </button>
                      {openMobileSection === "narzedzia" && (
                        <div className="bg-[#e6f7f9]">
                          {narzedziaItems.map((item) => (
                            <Link
                              key={item.path}
                              href={item.path}
                              className="block px-8 py-2.5 text-[#374151] text-sm hover:text-[#1c435e]"
                              onClick={() => { setMobileOpen(false); setOpenMobileSection(null); }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* FAQ */}
                    <Link href="/faq" className="block px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#e6f7f9]" onClick={() => setMobileOpen(false)}>
                      FAQ
                    </Link>

                    {/* Blog */}
                    <Link href="/blog" className="block px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#e6f7f9]" onClick={() => setMobileOpen(false)}>
                      Blog
                    </Link>

                    {/* Kontakt */}
                    <Link href="/kontakt" className="block px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#e6f7f9]" onClick={() => setMobileOpen(false)}>
                      Kontakt
                    </Link>
                  </nav>

                  <div className="p-4 border-t border-[#e5e7eb] space-y-3">
                    <a
                      href="tel:577873616"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold text-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Phone className="w-4 h-4" />
                      577 873 616
                    </a>
                    <a
                      href="#formularz"
                      className="btn-cta-shine w-full !py-3 !text-sm flex items-center justify-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Złóż wniosek
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
