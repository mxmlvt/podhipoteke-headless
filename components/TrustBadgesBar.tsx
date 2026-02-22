import { Building2, Percent, Clock } from "lucide-react";

const badges = [
  {
    icon: Building2,
    title: "Dla firm od 2004 roku",
    subtitle: "Ponad 20 lat doświadczenia",
  },
  {
    icon: Percent,
    title: "Do 65% wartości nieruchomości",
    subtitle: "Elastyczne warunki finansowania",
  },
  {
    icon: Clock,
    title: "Wypłata nawet w 48 godzin",
    subtitle: "Ekspresowe decyzje kredytowe",
  },
];

export default function TrustBadgesBar() {
  return (
    <section className="bg-white shadow-sm border-t border-[#e5e7eb]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {badges.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-4 rounded-xl shadow-sm border border-[#e5e7eb] bg-white hover:border-[#2299AA] transition-colors"
            >
              <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0">
                <Icon className="w-6 h-6 text-[#2299AA]" />
              </div>
              <div>
                <p className="font-bold text-[#111827] text-sm">{title}</p>
                <p className="text-[#6b7280] text-xs">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
