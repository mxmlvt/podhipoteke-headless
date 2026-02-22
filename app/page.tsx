import client from "@/lib/apollo";
import { GET_RECENT_POSTS } from "@/lib/queries";
import Hero from "@/components/Hero";
import TrustBadgesBar from "@/components/TrustBadgesBar";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import OurOffer from "@/components/OurOffer";
import LoanProcess from "@/components/LoanProcess";
import ToolsSection from "@/components/ToolsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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
      {/* Sekcja 1: Hero – split layout z formularzem (ciemne tło) */}
      <Hero />

      {/* Sekcja 2: Trust badges bar (białe, cień na górze) */}
      <TrustBadgesBar />

      {/* Sekcja 3: O nas (accent-soft #e6f7f9) */}
      <AboutSection />

      {/* Sekcja 4: Statystyki (białe) */}
      <StatsCounter />

      {/* Sekcja 5: Oferta – 3 karty ze zdjęciami (mint #f0fafb) */}
      <OurOffer />

      {/* Sekcja 6: Jak to działa – proces (ciemne primary #1c435e) */}
      <LoanProcess />

      {/* Sekcja 7: Narzędzia online (białe) */}
      <ToolsSection />

      {/* Sekcja 8: Opinie klientów (accent-soft #e6f7f9) */}
      <TestimonialsSection />

      {/* Sekcja 9: FAQ – 2 kolumny (białe) */}
      <FAQ />

      {/* Sekcja 10: Blog (mint #f0fafb) */}
      <BlogGrid
        posts={data.posts.nodes}
        title="Najnowsze artykuły"
        showMoreLink={true}
      />

      {/* Sekcja 11: CTA finalne (primary-dark #0f2a3d) */}
      <section className="section-primary-dark py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#7de8f5]">
            Działamy szybko
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Potrzebujesz finansowania?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Skontaktuj się z nami i otrzymaj ofertę dopasowaną do Twoich potrzeb.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] hover:bg-[#2bb5c7] text-white font-bold text-base transition-colors shadow-lg"
            >
              Złóż wniosek online
            </Link>
            <a
              href="tel:577873616"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white hover:text-[#0f2a3d] transition-all duration-300"
            >
              Zadzwoń: 577 873 616
            </a>
          </div>
        </div>
      </section>

      {/* Sekcja 12: Formularz kontaktowy (białe, 2 kolumny) */}
      <ContactForm />
    </main>
  );
}
