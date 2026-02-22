import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <Image
        src="/images/slide-1.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#1c435e]/85" />
      <div className="relative z-10 max-w-[1080px] mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-[4.2rem] font-bold text-white leading-tight mb-6">
            Ekspresowe pożyczki pod hipotekę nieruchomości
          </h1>
          <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
            Oferujemy szybkie pożyczki pod zastaw nieruchomości. Kwoty od{" "}
            <strong>50 000 zł</strong> do <strong>2 000 000 zł</strong>.
          </p>
          <p className="text-lg text-white/80 mb-8">
            Bez sprawdzania BIK, BIG, KRD i ERIF. Decyzja nawet w 24 godziny.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#formularz"
              className="btn-cta-shine !px-8 !py-4 !text-lg"
            >
              Złóż wniosek
            </Link>
            <Link
              href="/oferta"
              className="btn-outline-white !px-8 !py-4 !text-lg"
            >
              Sprawdź ofertę
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">20</div>
            <p className="text-white/70 text-lg">lat na rynku</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">3 000</div>
            <p className="text-white/70 text-lg">udzielonych pożyczek</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">2 500</div>
            <p className="text-white/70 text-lg">zadowolonych klientów</p>
          </div>
        </div>
      </div>
    </section>
  );
}
