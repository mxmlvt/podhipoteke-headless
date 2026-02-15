import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Wypełnij formularz kontaktowy",
    desc: "Potrzebujemy jedynie kilku informacji, by stworzyć dla Ciebie ofertę idealną. Kliknij tutaj by wypełnić formularz już teraz.",
  },
  {
    number: "02",
    title: "Złóż wniosek",
    desc: "Wykonaj zdjęcia nieruchomości, prześlij wymagane w Twoim przypadku dokumenty i oczekuj na decyzję kredytową. W 99,9% przypadków wydajemy pozytywną decyzję w kilka godzin!",
  },
  {
    number: "03",
    title: "Kontakt telefoniczny",
    desc: "Oczekuj na kontakt od jednego z naszych ekspertów. Zazwyczaj oddzwaniamy w ciągu kilku godzin.",
  },
  {
    number: "04",
    title: "Przelew środków",
    desc: "Ciesz się nowymi środkami na swoim koncie – wydaj je na dowolny cel związany z Twoją działalnością",
  },
];

export default function LoanProcess() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/signing-form.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-white/60" />
      <div className="relative z-10 py-16">
        <div className="max-w-[1330px] mx-auto px-4">
          <h2 className="section-heading text-primary mb-4">Jak wygląda proces udzielania pożyczki?</h2>
          <p className="text-center text-text-body text-lg mb-12">
            Proces udzielania pożyczki jest niezwykle szybki i prosty
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-xl p-8 shadow-md">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">{step.title}</h3>
                <p className="text-text-body text-[15px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/kontakt" className="btn-primary !px-8 !py-3 !text-lg">
              Wypełnij formularz
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
