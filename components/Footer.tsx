import Image from "next/image";
import Link from "next/link";

const serviceLinks = [
  { label: "Pożyczki pod zastaw nieruchomości", path: "/oferta/pozyczki-pod-zastaw-nieruchomosci" },
  { label: "Pożyczki pod zastaw gruntów rolnych", path: "/oferta/pozyczki-pod-zastaw-gruntow-rolnych" },
  { label: "Kredyt hipoteczny", path: "/oferta/kredyt-hipoteczny" },
  { label: "Kredyt pod zastaw nieruchomości", path: "/oferta/kredyt-pod-zastaw-nieruchomosci" },
  { label: "Kredyt pod zastaw działki", path: "/oferta/kredyt-pod-zastaw-dzialki" },
  { label: "Pożyczka pod zastaw mieszkania", path: "/oferta/pozyczka-pod-zastaw-mieszkania" },
  { label: "Kredyt pod zastaw mieszkania", path: "/oferta/kredyt-pod-zastaw-mieszkania" },
  { label: "Pożyczki pod zastaw działki", path: "/oferta/pozyczki-pod-zastaw-dzialki" },
  { label: "Pożyczki pod zastaw domu", path: "/oferta/pozyczki-pod-zastaw-domu" },
  { label: "Pożyczki hipoteczne dla firm", path: "/oferta/pozyczki-hipoteczne-dla-firm" },
  { label: "Pożyczki oddłużeniowe", path: "/oferta/pozyczki-oddluzeniowe-2" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1330px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo column */}
          <div>
            <Image
              src="/images/logo-footer.png"
              alt="PodHipoteke24.pl"
              width={176}
              height={99}
              className="mb-2 brightness-0 invert"
            />
            <p className="text-white font-semibold text-[15px]">podhipoteke24.pl</p>
          </div>

          {/* Column 1: Nasza oferta */}
          <div>
            <h4 className="text-white font-semibold text-[17px] mb-3">Nasza oferta</h4>
            <nav className="flex flex-col gap-1.5 text-[15px] leading-[1.9]">
              <Link href="/oferta" className="text-white/70 hover:text-white transition-colors">Cała oferta</Link>
              <Link href="/oferta/pozyczki-pod-zastaw-nieruchomosci" className="text-white/70 hover:text-white transition-colors">Pożyczki pod zastaw</Link>
              <Link href="/oferta/kredyt-hipoteczny" className="text-white/70 hover:text-white transition-colors">Kredyty hipoteczne</Link>
              <Link href="/oferta/pozyczki-hipoteczne-dla-firm" className="text-white/70 hover:text-white transition-colors">Pożyczki dla firm</Link>
              <Link href="/oferta/pozyczki-oddluzeniowe-2" className="text-white/70 hover:text-white transition-colors">Pożyczki oddłużeniowe</Link>
              <Link href="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link>
            </nav>
          </div>

          {/* Column 2: Narzędzia */}
          <div>
            <h4 className="text-white font-semibold text-[17px] mb-3">Narzędzia</h4>
            <nav className="flex flex-col gap-1.5 text-[15px] leading-[1.9]">
              <Link href="/kalkulator-raty" className="text-white/70 hover:text-white transition-colors">Kalkulator raty</Link>
              <Link href="/ile-moge-pozyczyc" className="text-white/70 hover:text-white transition-colors">Ile mogę pożyczyć?</Link>
              <Link href="/porownywarka-kredytow" className="text-white/70 hover:text-white transition-colors">Porównywarka kredytów</Link>
              <Link href="/diagnostyka-finansowa" className="text-white/70 hover:text-white transition-colors">Diagnostyka finansowa</Link>
              <Link href="/kalkulator-konsolidacji" className="text-white/70 hover:text-white transition-colors">Kalkulator konsolidacji</Link>
            </nav>
          </div>

          {/* Column 3: Kontakt */}
          <div>
            <h4 className="text-white font-semibold text-[17px] mb-3">Kontakt</h4>
            <nav className="flex flex-col gap-1.5 text-[15px] leading-[1.9]">
              <a href="tel:577873616" className="text-white/70 hover:text-white transition-colors">577 873 616</a>
              <a href="mailto:kontakt@podhipoteke24.pl" className="text-white/70 hover:text-white transition-colors">kontakt@podhipoteke24.pl</a>
              <Link href="/kontakt" className="text-white/70 hover:text-white transition-colors">Formularz kontaktowy</Link>
              <Link href="/o-nas" className="text-white/70 hover:text-white transition-colors">O nas</Link>
              <Link href="/polityka-prywatnosci" className="text-white/70 hover:text-white transition-colors">Polityka prywatności</Link>
            </nav>
          </div>
        </div>

        {/* Service links row */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-[15px]">
            {serviceLinks.map((link, i) => (
              <span key={link.path} className="flex items-center">
                <Link href={link.path} className="text-white/70 hover:text-white transition-colors">
                  {link.label}
                </Link>
                {i < serviceLinks.length - 1 && <span className="text-white/30 ml-4">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-white/20 text-center">
          <p className="text-white/60 text-[10px] leading-relaxed">
            Witryna podhipoteke24.pl wykorzystuje pliki cookies. &copy; Copyright, Strona jest własnością firmy PODHIPOTEKE24.PL, NIP: 5261073354, REGON: 220048812
          </p>
        </div>
      </div>
    </footer>
  );
}
