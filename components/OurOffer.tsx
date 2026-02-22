import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    title: "Pożyczka pod zastaw nieruchomości",
    desc: "Kredyt pod nieruchomość to idealny wybór dla tych, którym zależy na szybkiej wypłacie środków. Nieruchomość to jedyne zabezpieczenie jakiego wymagamy.",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: "Szybka sprzedaż nieruchomości",
    desc: "Na życzenie dokonujemy ekspresowego zakupu nieruchomości. Wystarczy jeden telefon i jeszcze dziś możesz cieszyć się nowymi środkami na swoim koncie.",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: "Spłacamy zajęcia komornicze, hipoteki i inne zobowiązania",
    desc: "Twoja nieruchomość bądź firma jest zadłużona? Bez obaw! Mamy bogate doświadczenie w spłacaniu zajęć komorniczych, hipotek czy zobowiązań finansowych każdego rodzaju.",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "Pożyczki pod grunty rolne",
    desc: "Posiadasz grunt rolny, a do realizacji swoich celów potrzebne są Ci natychmiastowe środki? Żaden problem! Skontaktuj się z nami już dziś i poznaj szczegółową ofertę.",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
      </svg>
    ),
    title: "Konsultacja i pomoc prawna",
    desc: "Na każdym etapie współpracy oferujemy bezpłatną pomoc i konsultacje prawne. Wszystko dla Twojego bezpieczeństwa!",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: "Pożyczki dla firm",
    desc: "Oferujemy szeroki zakres kredytów dla przedsiębiorstw. Wystarczy, że Twoja firma jest właścicielem nieruchomości i wszystko jest możliwe.",
  },
];

export default function OurOffer() {
  return (
    <>
      {/* Heading section with parallax */}
      <section className="relative py-[150px] overflow-hidden">
        <Image
          src="/images/mbr-1.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgba(38,38,38,0.44)]" />
        <div className="relative z-10 max-w-[1330px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-[4.2rem] font-semibold text-white leading-tight mb-4">
            NASZA OFERTA
          </h2>
          <p className="text-white text-lg md:text-2xl">Ekspresowe pożyczki</p>
          <p className="text-white text-lg md:text-2xl">Od 50 000 do 2 000 000 PLN</p>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 bg-primary">
        <div className="max-w-[1330px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Link key={i} href="/kontakt" className="service-card tool-card flex flex-col items-center text-center gap-4 cursor-pointer">
                <div className="text-white mb-2">{s.icon}</div>
                <h3>{s.title}</h3>
                <p className="text-white/90 text-[0.95rem]">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
