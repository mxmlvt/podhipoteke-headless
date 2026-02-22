const features = [
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: "Zabezpieczenie tylko na hipotece",
    desc: "Wpis w dziale IV księgi wieczystej, tak jak w banku",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "Najniższy koszt umowy",
    desc: "Od 28% rocznie",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: "Najszybszy czas realizacji i wypłaty",
    desc: "Pieniądze możesz otrzymać nawet w 24 godziny",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: "Pomoc w przygotowaniu dokumentów",
    desc: "Na każdym etapie współpracy",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
    ),
    title: "Żadnych ukrytych kosztów",
    desc: 'Jasne warunki umowy bez "gwiazdek i drobnego druku"',
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
    title: "Szeroki przedział kwotowy",
    desc: "Od 50 000 do 2 000 000 PLN",
  },
];

import Image from "next/image";

export default function WhatDistinguishes() {
  return (
    <section className="relative py-[200px] overflow-hidden">
      <Image
        src="/images/hand-shaking.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[rgba(86,86,86,0.97)]" />
      <div className="relative z-10 max-w-[1330px] mx-auto px-6 md:px-4">
        <h2 className="section-heading text-white mb-12">CO NAS WYRÓŻNIA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="service-card flex flex-col items-center text-center gap-4">
              <div className="text-white mb-2">{f.icon}</div>
              <h3>{f.title}</h3>
              <p className="text-white/90">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
