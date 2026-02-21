import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, ShieldOff, Clock, Banknote } from "lucide-react";

const ofertaLinks = [
  { label: "Kredyt hipoteczny", path: "/kredyt-hipoteczny" },
  { label: "Kredyt pod zastaw mieszkania", path: "/kredyt-pod-zastaw-mieszkania" },
  { label: "Pożyczki pod zastaw nieruchomości", path: "/pozyczki-pod-zastaw-nieruchomosci" },
  { label: "Pożyczki pod zastaw domu", path: "/pozyczki-pod-zastaw-domu" },
  { label: "Pożyczki pod zastaw działki", path: "/pozyczki-pod-zastaw-dzialki" },
  { label: "Pożyczki oddłużeniowe", path: "/pozyczki-oddluzeniowe" },
  { label: "Pożyczki hipoteczne dla firm", path: "/pozyczki-hipoteczne-dla-firm" },
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
    <footer className="bg-[#1c435e] text-white">
      {/* RRSO Disclaimer */}
      <div className="border-b border-white/10 py-4">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <p className="text-white/50 text-[11px] leading-relaxed text-center">
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
              className="mb-5 brightness-0 invert"
            />
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Ekspresowe pożyczki pod hipotekę nieruchomości. Ponad 20 lat doświadczenia na rynku finansowym. Działamy dyskretnie i sprawnie.
            </p>
            <div className="flex flex-col gap-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/80 text-xs">
                  <Icon className="w-3.5 h-3.5 text-[#2299AA] shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Oferta */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Oferta
            </h3>
            <nav className="flex flex-col gap-2">
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
            <nav className="flex flex-col gap-2">
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

          {/* Column 4: Kontakt */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <div className="flex flex-col gap-3">
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

            <div className="mt-6">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#2299AA] text-white font-semibold text-sm hover:bg-[#2bb5c7] transition-colors"
              >
                Złóż wniosek
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-xs">
              &copy; {new Date().getFullYear()} PODHIPOTEKE24.PL | NIP: 5261073354 | REGON: 220048812
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/polityka-prywatnosci"
                className="text-white/50 hover:text-white/80 text-xs transition-colors"
              >
                Polityka prywatności
              </Link>
              <Link
                href="/polityka-cookies"
                className="text-white/50 hover:text-white/80 text-xs transition-colors"
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
