import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import StatsCounter from "@/components/StatsCounter";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "O nas - PODHIPOTEKE24.PL",
  description: "Poznaj naszą firmę. 20 lat doświadczenia na rynku pożyczek pod hipotekę. Ponad 3000 udzielonych pożyczek i 2500 zadowolonych klientów.",
};

export default function ONasPage() {
  return (
    <>
      <PageHero
        heading="Dlaczego warto nam zaufać?"
        text="Jesteśmy firmą która spełnia oczekiwania swoich klientów. Działamy szybko i rzetelnie, a współpraca z nami to czysta przyjemność!"
        buttonText="Dowiedz się więcej"
        buttonHref="#about-content"
        bgImage="/images/combining-experience.jpg"
      />

      <StatsCounter />

      <section id="about-content" className="py-16 bg-white">
        <div className="max-w-[1330px] mx-auto px-4 space-y-20">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Jesteśmy na rynku od 2003 roku</h2>
              <p className="text-text-body text-[1.1rem] leading-relaxed">
                Nasza firma na rynku działa już ponad 20 lat. Od samego początku, kierujemy się wartościami które pozwoliły nam zaistnieć w branży, której dziś jesteśmy liderem. Naszą misją jest bezkompromisowa pomoc w spełnianiu marzeń naszych klientów.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/images/mbr-about-1.jpg" alt="20 lat na rynku" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden order-2 lg:order-1">
              <Image src="/images/mbr-about-2.jpg" alt="Ogromne doświadczenie" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Posiadamy ogromne doświadczenie</h2>
              <p className="text-text-body text-[1.1rem] leading-relaxed">
                Od 2003 roku udzieliliśmy ponad 3000 pożyczek. Przez ponad 20 lat zdobywaliśmy doświadczenie, dzięki któremu dziś możemy pomagać w spełnieniu marzeń każdego naszego klienta.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Pomogliśmy spełnić marzenia ponad 2500 osób</h2>
              <p className="text-text-body text-[1.1rem] leading-relaxed">
                Marzenia są po to, by je spełniać. A my istniejemy po to, by pomagać je realizować. Potwierdzi to ponad 2500 osób, które już zrealizowały swoje cele. Skontaktuj się z nami już dziś i pozwól by Twoje marzenia stały się rzeczywistością!
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/images/sailboat.jpg" alt="2500 zadowolonych klientów" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
