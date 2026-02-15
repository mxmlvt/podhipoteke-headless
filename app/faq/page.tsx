import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Requirements from "@/components/Requirements";
import FAQ from "@/components/FAQ";
import LoanProcess from "@/components/LoanProcess";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "FAQ - PODHIPOTEKE24.PL",
  description: "Często zadawane pytania o pożyczkach pod hipotekę. Dowiedz się jakie warunki musisz spełnić i jak wygląda proces udzielania pożyczki.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        heading="Co musisz zrobić, by otrzymać pożyczkę?"
        text="Wystarczy że spełniasz poniższe kryteria i od razu możesz się z nami kontaktować."
        bgImage="/images/faq-bg.jpg"
      />

      <Requirements />
      <FAQ />
      <LoanProcess />

      {/* Contact info */}
      <section className="py-12 bg-white">
        <div className="max-w-[1330px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a href="tel:577873616" className="flex items-center gap-3 text-text-body text-lg hover:text-primary transition-colors">
              <span className="icon-circle">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              </span>
              577 873 616
            </a>
            <a href="mailto:kontakt@podhipoteke24.pl" className="flex items-center gap-3 text-text-body text-lg hover:text-primary transition-colors">
              <span className="icon-circle">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              </span>
              kontakt@podhipoteke24.pl
            </a>
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary">
              Masz inne pytanie? Z przyjemnością odpowiemy na każde!
            </h2>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
