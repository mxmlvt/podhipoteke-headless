"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const ofertaItems = [
  { label: "Kredyt hipoteczny", path: "/kredyt-hipoteczny" },
  { label: "Kredyt pod zastaw mieszkania", path: "/kredyt-pod-zastaw-mieszkania" },
  { label: "Pożyczki pod zastaw nieruchomości", path: "/pozyczki-pod-zastaw-nieruchomosci" },
  { label: "Pożyczki pod zastaw domu", path: "/pozyczki-pod-zastaw-domu" },
  { label: "Pożyczki pod zastaw działki", path: "/pozyczki-pod-zastaw-dzialki" },
  { label: "Pożyczki oddłużeniowe", path: "/pozyczki-oddluzeniowe" },
  { label: "Pożyczki hipoteczne dla firm", path: "/pozyczki-hipoteczne-dla-firm" },
];

const narzedziaItems = [
  { label: "Kalkulator raty", path: "/narzedzia/kalkulator-raty" },
  { label: "Ile mogę pożyczyć?", path: "/narzedzia/ile-moge-pozyczyc" },
  { label: "Porównywarka kredytów", path: "/narzedzia/porownywarka" },
  { label: "Diagnostyka finansowa", path: "/narzedzia/diagnostyka" },
  { label: "Kalkulator konsolidacji", path: "/narzedzia/kalkulator-konsolidacji" },
];

const mainNav = [
  { label: "Strona główna", path: "/" },
  { label: "Oferta", path: "/oferta", dropdown: ofertaItems },
  { label: "Narzędzia", path: "/narzedzia", dropdown: narzedziaItems },
  { label: "Blog", path: "/blog" },
  { label: "Kontakt", path: "/kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Nawigacja główna">
            {mainNav.map((item) =>
              item.dropdown ? (
                <div key={item.path} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-md hover:bg-[#f7f8fa]"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#e5e7eb] min-w-[240px]">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className="flex items-center px-4 py-2.5 text-[#374151] hover:text-[#1c435e] hover:bg-[#f7f8fa] text-sm transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className="px-3 py-2 text-[#374151] hover:text-[#1c435e] font-medium text-[0.9rem] transition-colors rounded-md hover:bg-[#f7f8fa]"
                >
                  {item.label}
                </Link>
              )
            )}
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
            <Button
              asChild
              className="bg-[#2299AA] hover:bg-[#2bb5c7] text-white font-semibold px-5 rounded-lg h-9 text-sm"
            >
              <Link href="/kontakt">Złóż wniosek</Link>
            </Button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:577873616"
              className="text-[#1c435e]"
              aria-label="Zadzwoń do nas"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-[#374151] rounded-md hover:bg-[#f7f8fa]"
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
                    {mainNav.map((item) => (
                      <div key={item.path}>
                        {item.dropdown ? (
                          <div>
                            <button
                              className="w-full flex items-center justify-between px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#f7f8fa]"
                              onClick={() =>
                                setOpenDropdown(
                                  openDropdown === item.label ? null : item.label
                                )
                              }
                            >
                              {item.label}
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  openDropdown === item.label ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {openDropdown === item.label && (
                              <div className="bg-[#f7f8fa]">
                                {item.dropdown.map((sub) => (
                                  <Link
                                    key={sub.path}
                                    href={sub.path}
                                    className="block px-8 py-2.5 text-[#374151] text-sm hover:text-[#1c435e]"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.path}
                            className="block px-5 py-3 text-[#374151] font-semibold text-base hover:bg-[#f7f8fa]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-[#e5e7eb] space-y-3">
                    <a
                      href="tel:577873616"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-[#1c435e] text-[#1c435e] font-semibold text-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Phone className="w-4 h-4" />
                      577 873 616
                    </a>
                    <Link
                      href="/kontakt"
                      className="flex items-center justify-center w-full py-3 rounded-lg bg-[#2299AA] text-white font-semibold text-sm hover:bg-[#2bb5c7] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Złóż wniosek
                    </Link>
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
