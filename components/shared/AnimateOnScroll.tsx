"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: 0 | 100 | 200 | 300 | 400;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  direction = "up",
  delay = 0,
  className,
}: AnimateOnScrollProps) {
  const ref = useScrollAnimation();

  const directionClass =
    direction === "left"
      ? "from-left"
      : direction === "right"
      ? "from-right"
      : "";

  const delayClass = delay ? `delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={cn("animate-on-scroll", directionClass, delayClass, className)}
    >
      {children}
    </div>
  );
}
