import Image from "next/image";
import Link from "next/link";

const serviceLinks = [
  { label: "Pożyczki pod zastaw nieruchomości", path: "/pozyczki-pod-zastaw-nieruchomosci" },
  { label: "Pożyczki pod zastaw gruntów rolnych", path: "/pozyczki-pod-zastaw-gruntow-rolnych" },
  { label: "Kredyt hipoteczny", path: "/kredyt-hipoteczny" },
  { label: "Kredyt pod zastaw nieruchomości", path: "/kredyt-pod-zastaw-nieruchomosci" },
  { label: "Kredyt pod zastaw działki", path: "/kredyt-pod-zastaw-dzialki" },
  { label: "Pożyczka pod zastaw mieszkania", path: "/pozyczka-pod-zastaw-mieszkania" },
  { label: "Kredyt pod zastaw mieszkania", path: "/kredyt-pod-zastaw-mieszkania" },
  { label: "Pożyczki pod zastaw działki", path: "/pozyczki-pod-zastaw-dzialki" },
  { label: "Pożyczki pod zastaw domu", path: "/pozyczki-pod-zastaw-domu" },
  { label: "Pożyczki hipoteczne dla firm", path: "/pozyczki-hipoteczne-dla-firm" },
  { label: "Pożyczki oddłużeniowe", path: "/pozyczki-oddluzeniowe" },
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
              className="mb-4 brightness-0 invert"
            />
          </div>

          {/* Column 1 links */}
          <div>
            <nav className="flex flex-col gap-2 text-[17px] leading-[1.9]">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">Strona główna</Link>
              <Link href="/oferta" className="text-white/80 hover:text-white transition-colors">Oferta</Link>
              <Link href="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link>
              <Link href="/kontakt" className="text-white/80 hover:text-white transition-colors">Kontakt</Link>
            </nav>
          </div>

          {/* Column 2 links */}
          <div>
            <nav className="flex flex-col gap-2 text-[17px] leading-[1.9]">
              <Link href="/o-nas" className="text-white/80 hover:text-white transition-colors">Dlaczego warto nam zaufać?</Link>
              <Link href="/oferta" className="text-white/80 hover:text-white transition-colors">Co nas wyróżnia?</Link>
              <Link href="/kontakt" className="text-white/80 hover:text-white transition-colors">Formularz kontaktowy</Link>
              <Link href="/oferta" className="text-white/80 hover:text-white transition-colors">Dodatkowe korzyści</Link>
            </nav>
          </div>

          {/* Column 3 links */}
          <div>
            <nav className="flex flex-col gap-2 text-[17px] leading-[1.9]">
              <Link href="/faq" className="text-white/80 hover:text-white transition-colors">Co musisz spełnić aby otrzymać pożyczkę?</Link>
              <Link href="/faq" className="text-white/80 hover:text-white transition-colors">Proces udzielenia pożyczki</Link>
              <Link href="/polityka-prywatnosci" className="text-white/80 hover:text-white transition-colors">Polityka prywatności</Link>
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
