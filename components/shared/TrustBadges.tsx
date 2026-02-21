import { Award, ShieldOff, Clock, Banknote } from "lucide-react";

const badges = [
  { icon: Award, label: "20 lat doświadczenia" },
  { icon: ShieldOff, label: "Bez BIK" },
  { icon: Clock, label: "Decyzja w 24h" },
  { icon: Banknote, label: "Kwoty do 2 mln zł" },
];

interface TrustBadgesProps {
  dark?: boolean;
}

export default function TrustBadges({ dark = false }: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2"
        >
          <div className={`p-1.5 rounded-full ${dark ? "bg-white/20" : "bg-[#e8f4f6]"}`}>
            <Icon className={`w-4 h-4 ${dark ? "text-white" : "text-[#2299AA]"}`} />
          </div>
          <span className={`text-sm font-medium ${dark ? "text-white/90" : "text-[#374151]"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
