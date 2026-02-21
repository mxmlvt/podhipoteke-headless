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
      <div className="max-w-[1330px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1c435e] mb-4">
          DODATKOWE KORZYŚCI
        </h2>
        <p className="text-center text-[#374151] text-lg max-w-4xl mx-auto mb-12">
          Naszych klientów traktujemy w pełni indywidualnie i z należytą starannością. Na życzenie pokrywamy koszty umowy notarialnej lub dokonujemy szybkiego zakupu nieruchomości. Bezpłatna pomoc prawna jest dostępna na każdym kroku.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="bg-[#1c435e] rounded-xl p-8 text-white">
              <h3 className="text-lg font-bold mb-3">{b.title}</h3>
              <p className="text-white/90">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
