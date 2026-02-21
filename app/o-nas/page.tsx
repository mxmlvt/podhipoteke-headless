import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import StatsCounter from "@/components/StatsCounter";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import WhyTrustUs from "@/components/WhyTrustUs";

export const metadata: Metadata = {
  title: "O nas – 20 lat doświadczenia na rynku pożyczek | PODHIPOTEKE24.PL",
  description:
    "Poznaj naszą firmę. 20 lat doświadczenia na rynku pożyczek pod hipotekę. Ponad 1000 udzielonych pożyczek. Działamy dyskretnie i ekspresowo.",
};

export default function ONasPage() {
  return (
    <main>
      <PageHero
        heading="O nas"
        text="Jesteśmy firmą, która spełnia oczekiwania swoich klientów. Działamy szybko, rzetelnie i dyskretnie od ponad 20 lat."
        bgImage="/images/combining-experience.jpg"
      />

      <div className="bg-[#f7f8fa] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[{ label: "Strona główna", href: "/" }, { label: "O nas" }]}
          />
        </div>
      </div>

      <StatsCounter />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 space-y-20">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Jesteśmy na rynku od 2003 roku
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                Nasza firma na rynku działa już ponad 20 lat. Od samego początku kierujemy się wartościami, które pozwoliły nam zaistnieć w branży, której dziś jesteśmy liderem. Naszą misją jest bezkompromisowa pomoc w spełnianiu celów finansowych naszych klientów.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/mbr-about-1.jpg"
                alt="20 lat na rynku"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/mbr-about-2.jpg"
                alt="Ogromne doświadczenie"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Posiadamy ogromne doświadczenie
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                Od 2003 roku udzieliliśmy ponad 1000 pożyczek. Przez ponad 20 lat zdobywaliśmy doświadczenie, dzięki któremu dziś możemy skutecznie pomagać każdemu klientowi – niezależnie od sytuacji finansowej czy historii kredytowej.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyTrustUs />

      <section className="py-12 md:py-16 bg-[#1c435e]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Chcesz z nami współpracować?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Skontaktuj się z nami i dowiedz się jak możemy Ci pomóc.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
          >
            Skontaktuj się
          </Link>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
