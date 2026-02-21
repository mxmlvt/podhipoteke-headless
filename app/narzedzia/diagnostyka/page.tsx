import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Diagnostyka finansowa – sprawdź kwalifikację | PODHIPOTEKE24.PL",
  description:
    "Odpowiedz na kilka pytań i dowiedz się czy kwalifikujesz się na pożyczkę pod zastaw nieruchomości. Wynik diagnostyki otrzymasz w ciągu 2 minut, bez podawania danych osobowych. Narzędzie jest w trakcie budowy.",
};

export default function DiagnostykaPage() {
  return (
    <main>
      <PageHero heading="Diagnostyka finansowa" bgImage="/images/slide-1.jpg" />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center">
          <Badge className="mb-6 bg-[#e8f4f6] text-[#2299AA] border-[#2299AA] text-sm px-4 py-1.5">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Wkrótce dostępne
          </Badge>
          <p className="text-[#374151] text-lg leading-relaxed mb-10">
            Odpowiedz na kilka pytań i dowiedz się czy kwalifikujesz się na
            pożyczkę pod zastaw nieruchomości. Wynik diagnostyki otrzymasz w
            ciągu 2 minut, bez podawania danych osobowych. Narzędzie jest w
            trakcie budowy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#1c435e] text-white font-bold text-base hover:bg-[#254d6b] transition-all duration-300"
            >
              W międzyczasie skontaktuj się z nami
            </Link>
            <Link
              href="/narzedzia"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-[#e5e7eb] text-[#374151] font-bold text-base hover:border-[#1c435e] hover:text-[#1c435e] transition-all duration-300"
            >
              Inne narzędzia
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
