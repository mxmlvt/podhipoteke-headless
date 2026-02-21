import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  variant?: "white" | "light" | "primary" | "primary-dark";
  className?: string;
  id?: string;
}

const variantClasses: Record<string, string> = {
  white: "bg-white",
  light: "bg-[#f7f8fa]",
  primary: "bg-[#1c435e] text-white",
  "primary-dark": "bg-[#152f45] text-white",
};

export default function SectionWrapper({
  children,
  variant = "white",
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        variantClasses[variant],
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}
