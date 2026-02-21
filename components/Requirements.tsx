const criteria = [
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    title: "Nieruchomość",
    desc: "Wystarczy, że jesteś prawnym właścicielem nieruchomości. Specjalizujemy się w pożyczkach pod zastaw hipoteki.",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: "Firma",
    desc: "Nie ma znaczenia jakiego rodzaju biznes prowadzisz. Wystarczy, że posiadasz działającą firmę lub myślisz o jej założeniu.",
  },
  {
    icon: (
      <svg className="w-[74px] h-[74px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: "Aglomeracja",
    desc: "Wystarczy że Twoja nieruchomość znajduje się w mieście w którym mieszka powyżej 10 000 mieszkańców.",
  },
];

export default function Requirements() {
  return (
    <section className="py-16 bg-[#1c435e]">
      <div className="max-w-[1330px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Co musisz zrobić by otrzymać pożyczkę?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {criteria.map((c, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-8 flex flex-col items-center text-center gap-4">
              <div className="text-white">{c.icon}</div>
              <h3 className="text-lg font-bold text-white">{c.title}</h3>
              <p className="text-white/90">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
