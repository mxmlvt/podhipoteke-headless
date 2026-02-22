import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCTACardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  variant?: "default" | "featured";
}

export default function ToolCTACard({
  icon: Icon,
  title,
  description,
  href,
  variant = "default",
}: ToolCTACardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col p-6 rounded-xl bg-white shadow-sm border border-[#e5e7eb]",
        "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
        variant === "featured" && "border-t-4 border-t-[#2299AA]"
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-lg bg-[#f0fafb] group-hover:bg-[#e6f7f9] transition-colors">
          <Icon className="w-6 h-6 text-[#2299AA]" />
        </div>
        <h3 className="font-semibold text-[#111827] text-base">{title}</h3>
      </div>
      <p className="text-[#6b7280] text-sm leading-relaxed flex-1">{description}</p>
      <div className="flex items-center gap-1.5 mt-4 text-[#2299AA] font-semibold text-sm group-hover:gap-2.5 transition-all">
        Sprawdź <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
