'use client';

import { useEffect, useRef, useState } from 'react';

const WORDS = [
  { word: 'ephemeral', size: 'lg' },
  { word: 'petrichor', size: 'xl' },
  { word: 'luminescent', size: 'md' },
  { word: 'susurrus', size: 'lg' },
  { word: 'mellifluous', size: 'sm' },
  { word: 'ethereal', size: 'xl' },
  { word: 'serendipity', size: 'lg' },
  { word: 'halcyon', size: 'md' },
  { word: 'ineffable', size: 'sm' },
  { word: 'vellichor', size: 'md' },
  { word: 'sonder', size: 'lg' },
  { word: 'hiraeth', size: 'sm' },
  { word: 'fernweh', size: 'md' },
  { word: 'querencia', size: 'sm' },
  { word: 'komorebi', size: 'lg' },
];

const sizeClasses = {
  sm: 'text-lg md:text-xl',
  md: 'text-xl md:text-2xl',
  lg: 'text-2xl md:text-3xl',
  xl: 'text-3xl md:text-4xl',
};

const colorClasses = [
  'text-primary-600 dark:text-primary-400',
  'text-primary-500 dark:text-primary-500',
  'text-primary-700 dark:text-primary-300',
  'text-accent-600 dark:text-accent-400',
  'text-gray-700 dark:text-gray-300',
];

export default function WordCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-8"
    >
      {WORDS.map((item, idx) => (
        <span
          key={item.word}
          className={`
            font-display font-bold transition-all duration-700 cursor-default
            hover:scale-110 hover:text-primary-500 dark:hover:text-primary-400
            ${sizeClasses[item.size as keyof typeof sizeClasses]}
            ${colorClasses[idx % colorClasses.length]}
            ${isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{ 
            transitionDelay: `${idx * 50}ms`,
            opacity: isVisible ? (0.5 + Math.random() * 0.5) : 0,
          }}
        >
          {item.word}
        </span>
      ))}
    </div>
  );
}

