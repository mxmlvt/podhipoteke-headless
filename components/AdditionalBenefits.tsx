const benefits = [
  {
    title: "Oddłużymy Twoją nieruchomość",
    desc: "Specjalizujemy się w procesach restrukturyzacji i oddłużaniu nieruchomości",
  },
  {
    title: "Bez zbędnych weryfikacji",
    desc: "Nie weryfikujemy naszych klientów bazach BIK, BIG, KRD czy ERIF",
  },
  {
    title: "Spłacamy zaległe zobowiązania",
    desc: "Akceptujemy/spłacamy zajęcia komornicze, hipoteki i prywatne zobowiązania",
  },
];

export default function AdditionalBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1330px] mx-auto px-6 md:px-4">
        <h2 className="section-heading text-primary mb-4">DODATKOWE KORZYŚCI</h2>
        <p className="text-center text-text-body text-lg max-w-4xl mx-auto mb-12">
          Naszych klientów traktujemy w pełni indywidualnie i z należytą starannością. Na życzenie pokrywamy koszty umowy notarialnej lub dokonujemy szybkiego zakupu nieruchomości. Bezpłatna pomoc prawna jest dostępna na każdym kroku.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <h3 className="mb-3">{b.title}</h3>
              <p className="text-white/90">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
