import { Award, Lock, Zap, ShieldOff, Settings, Monitor } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "20 lat doświadczenia",
    desc: "Działamy na rynku finansowym od ponad 20 lat. Nasze doświadczenie gwarantuje bezpieczeństwo i profesjonalizm.",
  },
  {
    icon: Lock,
    title: "Pełna dyskrecja",
    desc: "Każda transakcja jest traktowana z zachowaniem pełnej poufności. Twoje dane są bezpieczne.",
  },
  {
    icon: Zap,
    title: "Ekspresowe decyzje",
    desc: "Decyzję kredytową wydajemy w ciągu 24 godzin. Pieniądze trafiają na konto nawet w 2-4 dni.",
  },
  {
    icon: ShieldOff,
    title: "Bez BIK i BIG",
    desc: "Nie sprawdzamy wpisów w BIK, BIG, KRD ani ERIF. Twoja historia kredytowa nie ma znaczenia.",
  },
  {
    icon: Settings,
    title: "Elastyczne warunki",
    desc: "Do każdego klienta podchodzimy indywidualnie. Dostosowujemy warunki spłaty do Twoich możliwości.",
  },
  {
    icon: Monitor,
    title: "Obsługa online",
    desc: "Cały proces możesz przeprowadzić zdalnie. Działamy na terenie całej Polski.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-16 md:py-24 section-accent-soft">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Dlaczego warto nam zaufać?
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Jesteśmy firmą, która spełnia oczekiwania swoich klientów. Działamy szybko, rzetelnie i dyskretnie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white rounded-xl p-6 border border-[#e5e7eb] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#e8f4f6] shrink-0">
                  <reason.icon className="w-6 h-6 text-[#2299AA]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#111827] mb-2">{reason.title}</h3>
                  <p className="text-[#6b7280] text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
