import client from "@/lib/apollo";
import { GET_RECENT_POSTS } from "@/lib/queries";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import OurOffer from "@/components/OurOffer";
import WhyTrustUs from "@/components/WhyTrustUs";
import ToolsSection from "@/components/ToolsSection";
import LoanProcess from "@/components/LoanProcess";
import FAQ from "@/components/FAQ";
import BlogGrid from "@/components/BlogGrid";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default async function Home() {
  const { data } = await client.query<any>({
    query: GET_RECENT_POSTS,
    variables: { count: 3 },
  });

  return (
    <main>
      {/* Sekcja 1: Hero */}
      <Hero />

      {/* Sekcja 2: Statystyki */}
      <StatsCounter />

      {/* Sekcja 3: Oferta */}
      <OurOffer />

      {/* Sekcja 4: Dlaczego nam zaufać */}
      <WhyTrustUs />

      {/* Sekcja 5: Narzędzia */}
      <ToolsSection />

      {/* Sekcja 6: Proces */}
      <LoanProcess />

      {/* Sekcja 7: FAQ */}
      <FAQ />

      {/* Sekcja 8: Blog */}
      <BlogGrid
        posts={data.posts.nodes}
        title="Najnowsze artykuły"
        showMoreLink={true}
      />

      {/* Sekcja 9: CTA */}
      <section className="py-16 md:py-20 bg-[#1c435e]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Potrzebujesz finansowania?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Skontaktuj się z nami i otrzymaj ofertę dopasowaną do Twoich potrzeb. Decyzja w 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#2299AA] text-white font-bold text-base hover:bg-[#2bb5c7] transition-all duration-300 shadow-lg"
            >
              Złóż wniosek online
            </Link>
            <a
              href="tel:577873616"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white hover:text-[#1c435e] transition-all duration-300"
            >
              Zadzwoń: 577 873 616
            </a>
          </div>
        </div>
      </section>

      {/* Formularz kontaktowy */}
      <ContactForm />
    </main>
  );
}
