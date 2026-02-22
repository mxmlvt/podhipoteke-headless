import client from "@/lib/apollo";
import { GET_RECENT_POSTS } from "@/lib/queries";
import HeroSlider from "@/components/HeroSlider";
import StatsCounter from "@/components/StatsCounter";
import WhyTrustUs from "@/components/WhyTrustUs";
import WhatDistinguishes from "@/components/WhatDistinguishes";
import OurOffer from "@/components/OurOffer";
import AdditionalBenefits from "@/components/AdditionalBenefits";
import Requirements from "@/components/Requirements";
import LoanProcess from "@/components/LoanProcess";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import BlogGrid from "@/components/BlogGrid";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

export default async function Home() {
  const { data } = await client.query<any>({
    query: GET_RECENT_POSTS,
    variables: { count: 6 },
  });

  return (
    <>
      {/* Hero – NIE animujemy */}
      <HeroSlider />

      <AnimateOnScroll direction="up">
        <StatsCounter />
      </AnimateOnScroll>

      <AnimateOnScroll direction="up">
        <WhyTrustUs />
      </AnimateOnScroll>

      <AnimateOnScroll direction="up">
        <WhatDistinguishes />
      </AnimateOnScroll>

      <AnimateOnScroll direction="up">
        <OurOffer />
      </AnimateOnScroll>

      <AnimateOnScroll direction="up">
        <AdditionalBenefits />
      </AnimateOnScroll>

      <AnimateOnScroll direction="up">
        <Requirements />
      </AnimateOnScroll>

      <AnimateOnScroll direction="up">
        <LoanProcess />
      </AnimateOnScroll>

      <AnimateOnScroll direction="up">
        <FAQ />
      </AnimateOnScroll>

      {/* RRSO Disclaimer */}
      <section className="py-4 bg-white border-y-[48px] border-primary">
        <div className="max-w-[1330px] mx-auto px-4">
          <p className="text-text-secondary text-[10px] leading-relaxed text-center">
            Maksymalna rzeczywista roczna stopa oprocentowania (RRSO). Modelowy przykład całkowitego kosztu pożyczki: Kwota pożyczki: 10.000,00 zł, okres spłaty: 12 miesięcy. Maksymalna Rzeczywista Roczna Stopa Oprocentowania wynosi do 30%. Roczna stopa procentowa dla wszystkich pożyczek wynosi do 30%. Powyższa kalkulacja została dokonana na dzień 08.05.2025 r. Minimalny okres spłaty pożyczki wynosi 12 miesięcy. Maksymalny okres spłaty pożyczki wynosi 119 miesięcy.
          </p>
        </div>
      </section>

      {/* Blog section */}
      <AnimateOnScroll direction="up">
        <BlogGrid
          posts={data.posts.nodes}
          title="Najnowsze artykuły"
          showMoreLink={true}
        />
      </AnimateOnScroll>

      {/* ContactForm – NIE animujemy (musi być widoczny od razu po kliknięciu CTA) */}
      <ContactForm />
    </>
  );
}
