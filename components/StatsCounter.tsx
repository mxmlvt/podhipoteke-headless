"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
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
  }, [target]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-text-dark">
      {count.toLocaleString("pl-PL")}{suffix}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section id="counters" className="py-16 bg-white">
      <div className="max-w-[1330px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <AnimatedNumber target={20} />
            <p className="text-text-body text-lg mt-2">lat na rynku</p>
          </div>
          <div>
            <AnimatedNumber target={3000} />
            <p className="text-text-body text-lg mt-2">udzielonych pożyczek</p>
          </div>
          <div>
            <AnimatedNumber target={2500} />
            <p className="text-text-body text-lg mt-2">zadowolonych klientów</p>
          </div>
        </div>
      </div>
    </section>
  );
}
