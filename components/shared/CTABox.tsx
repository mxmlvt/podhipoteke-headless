import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTABoxProps {
  heading: string;
  text: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  variant?: "default" | "accent" | "primary";
}

export default function CTABox({
  heading,
  text,
  primaryAction,
  secondaryAction,
  variant = "default",
}: CTABoxProps) {
  const isPrimary = variant === "primary";
  const isAccent = variant === "accent";

  return (
    <div
      className={cn(
        "rounded-xl p-6 md:p-8 shadow-sm my-8",
        isPrimary
          ? "bg-[#1c435e] text-white border-l-4 border-[#2299AA]"
          : isAccent
          ? "bg-white border-l-4 border-[#2299AA]"
          : "bg-white border-l-4 border-[#1c435e]"
      )}
    >
      <h3
        className={cn(
          "text-xl font-bold mb-2",
          isPrimary ? "text-white" : "text-[#111827]"
        )}
      >
        {heading}
      </h3>
      <p
        className={cn(
          "mb-5 text-base",
          isPrimary ? "text-white/80" : "text-[#6b7280]"
        )}
      >
        {text}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={primaryAction.href}
          className={cn(
            "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300",
            isPrimary
              ? "bg-[#2299AA] text-white hover:bg-[#2bb5c7]"
              : "bg-[#1c435e] text-white hover:bg-[#254d6b]"
          )}
        >
          {primaryAction.label}
        </Link>
        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className={cn(
              "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all duration-300",
              isPrimary
                ? "border-white text-white hover:bg-white hover:text-[#1c435e]"
                : "border-[#1c435e] text-[#1c435e] hover:bg-[#1c435e] hover:text-white"
            )}
          >
            {secondaryAction.label}
          </Link>
        )}
      </div>
    </div>
  );
}
