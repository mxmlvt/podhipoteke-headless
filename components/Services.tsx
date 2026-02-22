import Link from "next/link";

const services = [
  {
    title: "Pożyczki pod zastaw nieruchomości",
    description: "Ekspresowo wycenimy Twoją nieruchomość i wypłacimy środki. Szybka decyzja kredytowa.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    href: "/pozyczki-pod-zastaw-nieruchomosci",
  },
  {
    title: "Szybki skup nieruchomości",
    description: "Ekspresowy zakup Twojej nieruchomości. Szybka wycena i natychmiastowa wypłata środków.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    href: "/oferta",
  },
  {
    title: "Spłata zadłużenia",
    description: "Spłacimy komornika, hipoteki i inne zobowiązania finansowe. Kompleksowa pomoc oddłużeniowa.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    href: "/pozyczki-oddluzeniowe",
  },
  {
    title: "Pożyczki pod grunty rolne",
    description: "Finansowanie dla właścicieli gruntów rolnych. Potrzebujesz gotówki? Pomożemy Ci szybko.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    href: "/pozyczki-pod-zastaw-gruntow-rolnych",
  },
  {
    title: "Pomoc prawna",
    description: "Bezpłatna pomoc prawna na każdym etapie procesu. Nasi prawnicy zadbają o Twoje interesy.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
      </svg>
    ),
    href: "/oferta",
  },
  {
    title: "Pożyczki dla firm",
    description: "Kredyty dla firm posiadających nieruchomości. Finansowanie działalności gospodarczej.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    href: "/pozyczki-hipoteczne-dla-firm",
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1080px] mx-auto px-6 md:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            Co oferujemy?
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Kompleksowa obsługa finansowa - od pożyczek pod zastaw nieruchomości po pomoc prawną
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group p-6 rounded-lg border border-border-light hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-heading mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
