'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type Direction = 'up' | 'left' | 'right';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: 0 | 100 | 200 | 300 | 400;
  className?: string;
  threshold?: number;
}

const directionClass: Record<Direction, string> = {
  up: 'animate-fade-in-up',
  left: 'animate-fade-in-left',
  right: 'animate-fade-in-right',
};

const delayClass: Record<number, string> = {
  0: '',
  100: 'delay-100',
  200: 'delay-200',
  300: 'delay-300',
  400: 'delay-400',
};

export default function AnimateOnScroll({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollAnimation(threshold);

  const animClass = directionClass[direction];
  const delClass = delayClass[delay] ?? '';

  return (
    <div
      ref={ref}
      className={`${animClass} ${isVisible ? 'visible' : ''} ${delClass} ${className}`}
    >
      {children}
    </div>
  );
}
