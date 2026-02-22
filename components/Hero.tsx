import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1080px] mx-auto px-6 md:px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-[4.2rem] font-bold text-primary leading-tight mb-6">
            Ekspresowe pożyczki pod hipotekę nieruchomości
          </h1>
          <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-4">
            Oferujemy szybkie pożyczki pod zastaw nieruchomości. Kwoty od{" "}
            <strong>50 000 zł</strong> do <strong>2 000 000 zł</strong>.
          </p>
          <p className="text-lg text-text-secondary mb-8">
            Bez sprawdzania BIK, BIG, KRD i ERIF. Decyzja nawet w 24 godziny.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="bg-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary transition-colors inline-block"
            >
              Złóż wniosek
            </Link>
            <Link
              href="/oferta"
              className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-colors inline-block"
            >
              Sprawdź ofertę
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border-light">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">20</div>
            <p className="text-text-secondary text-lg">lat na rynku</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3 000</div>
            <p className="text-text-secondary text-lg">udzielonych pożyczek</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2 500</div>
            <p className="text-text-secondary text-lg">zadowolonych klientów</p>
          </div>
        </div>
      </div>
    </section>
  );
}
