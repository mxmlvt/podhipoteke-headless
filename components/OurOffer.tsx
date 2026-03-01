import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

const offers = [
  {
    image: IMAGES.offers.hipoteczny,
    title: "Kredyt hipoteczny",
    desc: "Potrzebujesz finansowania zakupu nieruchomości, ale bank odmówił? Udzielimy kredytu hipotecznego bez zbędnych formalności i weryfikacji BIK.",
    href: "/kredyt-hipoteczny",
    alt: "Kredyt hipoteczny pod nieruchomość",
  },
  {
    image: IMAGES.offers.mieszkanie,
    title: "Kredyt pod zastaw mieszkania",
    desc: "Posiadasz mieszkanie? Możesz je wykorzystać jako zabezpieczenie i otrzymać środki na dowolny cel – w 24 godziny.",
    href: "/kredyt-pod-zastaw-mieszkania",
    alt: "Kredyt pod zastaw mieszkania",
  },
  {
    image: IMAGES.offers.oddluzeniowe,
    title: "Pożyczki oddłużeniowe",
    desc: "Spłacimy Twoje zajęcia komornicze, hipoteki i prywatne zobowiązania. Wyjdź z pętli zadłużenia z naszą pomocą.",
    href: "/pozyczki-oddluzeniowe",
    alt: "Pożyczki oddłużeniowe",
  },
];

export default function OurOffer() {
  return (
    <section className="section-mint py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Nasza oferta
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Weź pożyczkę pod hipotekę kiedy:
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Nie możesz uzyskać kredytu w banku, masz zajęcia komornicze lub potrzebujesz gotówki ekspresowo.
          </p>
        </div>

        {/* 3 cards with photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.href}
              href={offer.href}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#1c435e] transition-colors">
                  {offer.title}
                </h3>
                <p className="text-[#6b7280] text-sm leading-relaxed flex-1">{offer.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[#2299AA] font-semibold text-sm group-hover:gap-3 transition-all">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom link */}
        <div className="text-center mt-8">
          <Link
            href="/oferta"
            className="inline-flex items-center gap-2 text-[#1c435e] font-semibold hover:text-[#2299AA] transition-colors"
          >
            Zobacz pełną ofertę <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
