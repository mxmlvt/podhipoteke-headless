import Image from "next/image";
import Link from "next/link";
import TrustBadges from "@/components/shared/TrustBadges";

export default function Hero() {
  return (
    <section className="relative min-h-[580px] md:min-h-[680px] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/slide-1.jpg"
        alt="Pożyczki pod hipotekę nieruchomości"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#152f45]/90 via-[#1c435e]/80 to-[#1c435e]/60" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 w-full py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Ekspresowe pożyczki pod hipotekę nieruchomości
          </h1>
          <p className="text-xl text-white/85 mb-8 leading-relaxed">
            Kwoty od 50 000 do 2 000 000 zł. Bez BIK. Decyzja w 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#2299AA] text-white font-bold text-base hover:bg-[#2bb5c7] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Złóż wniosek
            </Link>
            <Link
              href="/narzedzia/ile-moge-pozyczyc"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white hover:text-[#1c435e] transition-all duration-300"
            >
              Sprawdź ile możesz pożyczyć
            </Link>
          </div>
          <TrustBadges dark />
        </div>
      </div>
    </section>
  );
}
