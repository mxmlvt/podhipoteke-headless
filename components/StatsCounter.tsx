"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  display: string; // static display value (e.g. "1,8%", "6 mln zł")
  animateTo?: number; // if set, animate from 0 to this integer
  suffix?: string;
  label: string;
  sublabel?: string;
}

const stats: Stat[] = [
  { display: "1,8%", label: "oprocentowanie od", sublabel: "rocznie" },
  { display: "6 mln", label: "najwyższa udzielona", sublabel: "pożyczka" },
  { animateTo: 48, suffix: "h", display: "48h", label: "czas decyzji", sublabel: "kredytowej" },
  { animateTo: 1000, suffix: "+", display: "1000+", label: "zadowolonych", sublabel: "klientów" },
];

function AnimatedNumber({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!stat.animateTo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const target = stat.animateTo!;
          const step = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.animateTo]);

  const displayValue = stat.animateTo
    ? `${count.toLocaleString("pl-PL")}${stat.suffix || ""}`
    : stat.display;

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-[#2299AA]">
      {displayValue}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center gap-1 py-6 ${
                i < stats.length - 1 ? "lg:border-r border-[#e5e7eb]" : ""
              }`}
            >
              <AnimatedNumber stat={stat} />
              <p className="text-[#374151] text-base font-semibold mt-1">{stat.label}</p>
              {stat.sublabel && (
                <p className="text-[#6b7280] text-sm">{stat.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
