import {
  Clock,
  ShieldCheck,
  Banknote,
  FileText,
  Home,
  Lock,
  Building2,
  MapPin,
  CheckCircle,
  RefreshCcw,
  Target,
} from "lucide-react";
import type { PageTemplate } from "@/lib/page-templates";

type LucideIcon = React.ComponentType<{ className?: string }>;

const ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  ShieldCheck,
  Banknote,
  FileText,
  Home,
  Lock,
  Building2,
  MapPin,
  CheckCircle,
  RefreshCcw,
  Target,
};

interface ServiceContentSectionProps {
  template: PageTemplate;
}

export default function ServiceContentSection({ template }: ServiceContentSectionProps) {
  return (
    <>
      {/* Intro sekcja (białe) */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[780px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
            {template.introHeading}
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            {template.introText}
          </p>
        </div>
      </section>

      {/* Features sekcja (accent-soft) */}
      <section className="section-accent-soft py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {template.features.map((feature) => {
              const Icon = ICON_MAP[feature.icon] || CheckCircle;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-3 rounded-xl bg-[#2299AA]/10 shrink-0">
                    <Icon className="w-6 h-6 text-[#2299AA]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827] mb-1">{feature.title}</h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed">{feature.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
