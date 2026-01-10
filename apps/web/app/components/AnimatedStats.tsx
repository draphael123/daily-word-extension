'use client';

import { useEffect, useRef, useState } from 'react';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function AnimatedStat({ value, suffix = '', label, duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

export default function AnimatedStats() {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-8">
      <AnimatedStat value={1000} suffix="+" label="Curated Words" />
      <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
      <AnimatedStat value={100} suffix="%" label="Private & Local" />
      <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">Free</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Forever</div>
      </div>
    </div>
  );
}

