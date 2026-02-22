import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { IMAGES } from "@/lib/images";

const points = [
  "Działamy od 2004 roku – ponad 20 lat na rynku finansowym",
  "Obsługujemy klientów z całej Polski – bez względu na historię kredytową",
  "Decyzja w 24h, wypłata środków nawet w 48 godziny",
];

export default function AboutSection() {
  return (
    <section className="section-accent-soft py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: image */}
          <div className="relative">
            {/* Decorative box behind image */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-[#2299AA]/15 z-0" />
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src={IMAGES.sections.trust}
                alt="Doradcy PodHipoteke24"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 z-20 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e6f7f9] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#2299AA]" />
              </div>
              <div>
                <div className="font-bold text-[#111827] text-sm">1000+</div>
                <div className="text-[#6b7280] text-xs">zadowolonych klientów</div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              O nas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Mamy najlepsze pożyczki pod hipotekę w Polsce
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              Jesteśmy firmą z ponad 20-letnim doświadczeniem w udzielaniu pozabankowych pożyczek pod zastaw nieruchomości. Nie weryfikujemy BIK, KRD ani ERIF – liczy się tylko wartość Twojej nieruchomości.
            </p>

            <ul className="space-y-3 mb-8">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2299AA] shrink-0 mt-0.5" />
                  <span className="text-[#374151]">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/o-nas"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#1c435e] hover:bg-[#254d6b] text-white font-semibold transition-colors"
            >
              Dowiedz się więcej
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
