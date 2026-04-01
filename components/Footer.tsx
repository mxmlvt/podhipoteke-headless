import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, ShieldOff, Clock, Banknote } from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/podhipoteke24pl",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/podhipoteke24.pl/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Podhipoteke24pl",
    path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
];

const ofertaLinks = [
  { label: "Kredyt hipoteczny", path: "/oferta/kredyt-hipoteczny" },
  { label: "Kredyt pod zastaw mieszkania", path: "/oferta/kredyt-pod-zastaw-mieszkania" },
  { label: "Pożyczki pod zastaw nieruchomości", path: "/oferta/pozyczki-pod-zastaw-nieruchomosci" },
  { label: "Pożyczki pod zastaw domu", path: "/oferta/pozyczki-pod-zastaw-domu" },
  { label: "Pożyczki pod zastaw działki", path: "/oferta/pozyczki-pod-zastaw-dzialki" },
  { label: "Pożyczki oddłużeniowe", path: "/oferta/pozyczki-oddluzeniowe-2" },
  { label: "Pożyczki hipoteczne dla firm", path: "/oferta/pozyczki-hipoteczne-dla-firm" },
];

const narzedziaLinks = [
  { label: "Kalkulator raty", path: "/narzedzia/kalkulator-raty" },
  { label: "Ile mogę pożyczyć?", path: "/narzedzia/ile-moge-pozyczyc" },
  { label: "Porównywarka kredytów", path: "/narzedzia/porownywarka" },
  { label: "Diagnostyka finansowa", path: "/narzedzia/diagnostyka" },
  { label: "Kalkulator konsolidacji", path: "/narzedzia/kalkulator-konsolidacji" },
];

const trustBadges = [
  { icon: Award, label: "20 lat doświadczenia" },
  { icon: ShieldOff, label: "Bez BIK" },
  { icon: Clock, label: "Decyzja w 24h" },
  { icon: Banknote, label: "Do 2 mln zł" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f2a3d] text-white">
      {/* RRSO Disclaimer */}
      <div className="border-b border-white/10 py-4">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <p className="text-white/70 text-[11px] leading-relaxed text-center">
            Maksymalna rzeczywista roczna stopa oprocentowania (RRSO). Modelowy przykład całkowitego kosztu pożyczki: Kwota pożyczki: 10.000,00 zł, okres spłaty: 12 miesięcy. Maksymalna Rzeczywista Roczna Stopa Oprocentowania wynosi do 30%. Roczna stopa procentowa dla wszystkich pożyczek wynosi do 30%. Powyższa kalkulacja została dokonana na dzień 08.05.2025 r. Minimalny okres spłaty pożyczki wynosi 12 miesięcy. Maksymalny okres spłaty pożyczki wynosi 119 miesięcy.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: O firmie */}
          <div>
            <Image
              src="/images/logo-footer.png"
              alt="PodHipoteke24.pl"
              width={160}
              height={90}
              className="mb-2 brightness-0 invert"
            />
            <p className="text-white font-semibold text-sm mb-4">podhipoteke24.pl</p>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Ekspresowe pożyczki pod hipotekę nieruchomości. Ponad 20 lat doświadczenia na rynku finansowym. Działamy dyskretnie i sprawnie.
            </p>
            <div className="flex flex-col gap-2.5 mb-6">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/70 text-xs">
                  <Icon className="w-3.5 h-3.5 text-[#2299AA] shrink-0" />
                  {label}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2299AA] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Oferta */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Nasza oferta
            </h3>
            <nav className="flex flex-col gap-2.5">
              {ofertaLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Narzędzia */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Narzędzia
            </h3>
            <nav className="flex flex-col gap-2.5">
              {narzedziaLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Kontakt + CTA */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href="tel:577873616"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-[#2299AA] shrink-0" />
                577 873 616
              </a>
              <a
                href="mailto:kontakt@podhipoteke24.pl"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-[#2299AA] shrink-0" />
                kontakt@podhipoteke24.pl
              </a>
              <div className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-[#2299AA] shrink-0 mt-0.5" />
                <span>Polska – obsługujemy cały kraj</span>
              </div>
            </div>

            <a
              href="#formularz"
              className="btn-cta-shine !px-6 !py-2.5 !text-sm"
            >
              Złóż wniosek
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/70 text-xs">
              &copy; {new Date().getFullYear()} PODHIPOTEKE24.PL | NIP: 5261073354 | REGON: 220048812
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/polityka-prywatnosci"
                className="text-white/70 hover:text-white text-xs transition-colors"
              >
                Polityka prywatności
              </Link>
              <Link
                href="/polityka-cookies"
                className="text-white/70 hover:text-white text-xs transition-colors"
              >
                Polityka cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
