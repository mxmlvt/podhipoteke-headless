import Link from "next/link";
import { CITIES } from "@/lib/city-data";

export default function CityLinksSection() {
  return (
    <section className="py-14 md:py-20 bg-[#f4f6f8]">
      <div className="max-w-[1080px] mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Zasięg krajowy
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
            Pożyczki pod zastaw nieruchomości – obsługiwane miasta
          </h2>
          <p className="text-[#6b7280] mt-2 text-sm max-w-xl mx-auto">
            Działamy w całej Polsce. Wybierz swoje miasto i sprawdź lokalne warunki,
            ceny nieruchomości i możliwą kwotę pożyczki.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {CITIES.map((city) => (
            <Link
              key={city.newSlug}
              href={`/${city.newSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#d4eef2] text-[#1c435e] text-sm font-medium hover:bg-[#2299AA] hover:text-white hover:border-[#2299AA] transition-all duration-200"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
