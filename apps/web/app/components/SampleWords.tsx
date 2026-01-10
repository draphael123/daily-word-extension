'use client';

import { useEffect, useRef, useState } from 'react';

const SAMPLE_WORDS = [
  {
    word: 'petrichor',
    pos: 'noun',
    definition: 'The pleasant, earthy smell after rain falls on dry ground',
    example: 'After the summer storm, the petrichor rose from the warm pavement.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    word: 'sonder',
    pos: 'noun',
    definition: 'The realization that each passerby has a life as vivid as your own',
    example: 'Standing in the busy station, she felt a profound sense of sonder.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    word: 'komorebi',
    pos: 'noun',
    definition: 'Sunlight filtering through the leaves of trees',
    example: 'The komorebi created dancing patterns on the forest floor.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    word: 'vellichor',
    pos: 'noun',
    definition: 'The strange wistfulness of used bookstores',
    example: 'She wandered the aisles, overcome by vellichor.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    word: 'hiraeth',
    pos: 'noun',
    definition: 'A deep longing for home or a place that no longer exists',
    example: 'The old song filled him with hiraeth for his childhood.',
    color: 'from-rose-500 to-red-500',
  },
  {
    word: 'ethereal',
    pos: 'adjective',
    definition: 'Extremely delicate and light; seeming too perfect for this world',
    example: 'The dancer moved with ethereal grace across the stage.',
    color: 'from-indigo-500 to-violet-500',
  },
];

export default function SampleWords() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const cards = containerRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SAMPLE_WORDS.map((word, idx) => (
        <div
          key={word.word}
          data-index={idx}
          className={`
            group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 
            border border-gray-100 dark:border-gray-700 p-6
            transition-all duration-500 hover:shadow-xl hover:-translate-y-1
            ${visibleCards.has(idx) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
            }
          `}
          style={{ transitionDelay: `${idx * 100}ms` }}
        >
          {/* Gradient accent bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${word.color}`} />
          
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              {word.word}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
              {word.pos}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {word.definition}
          </p>
          
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              &quot;{word.example}&quot;
            </p>
          </div>

          {/* Hover effect */}
          <div className={`
            absolute inset-0 bg-gradient-to-br ${word.color} opacity-0 
            group-hover:opacity-5 transition-opacity duration-300
          `} />
        </div>
      ))}
    </div>
  );
}

