import Image from "next/image";
import { Star } from "lucide-react";
import { IMAGES } from "@/lib/images";

const testimonials = [
  {
    text: "Pożyczkę dostałem w 2 dni! Nikt nie patrzył na moją historię w BIK. Polecam każdemu, kto potrzebuje szybkiej gotówki pod zastaw mieszkania.",
    name: "Marek W.",
    city: "Warszawa",
    avatar: IMAGES.testimonials.avatar1,
    rating: 5,
  },
  {
    text: "Profesjonalna obsługa, jasne warunki umowy. Doradca wytłumaczył wszystko krok po kroku. Pieniądze były na koncie tego samego dnia co podpisanie aktu.",
    name: "Anna K.",
    city: "Kraków",
    avatar: IMAGES.testimonials.avatar2,
    rating: 5,
  },
  {
    text: "Polecam! Miałam zajęcie komornicze – żaden bank nie chciał mi pomóc. Tu dostałam środki w 48h i spłaciłam wszystkie długi. Bardzo polecam.",
    name: "Monika T.",
    city: "Wrocław",
    avatar: IMAGES.testimonials.avatar3,
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-accent-soft py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Opinie klientów
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Co mówią nasi klienci?
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex text-[#f59e0b]">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#e5e7eb]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
                  <p className="text-[#6b7280] text-xs">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex text-[#f59e0b]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-[#111827]">4.8 / 5</span>
          <span className="text-[#6b7280] text-sm">na podstawie opinii klientów</span>
        </div>
      </div>
    </section>
  );
}
