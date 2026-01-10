'use client';

import { useState, useEffect } from 'react';

const FEATURED_WORDS = [
  { word: 'susurrus', pos: 'noun', definition: 'A whispering or rustling sound' },
  { word: 'petrichor', pos: 'noun', definition: 'The pleasant earthy smell after rain' },
  { word: 'ephemeral', pos: 'adjective', definition: 'Lasting for a very short time' },
  { word: 'luminescent', pos: 'adjective', definition: 'Emitting light not caused by heat' },
  { word: 'serendipity', pos: 'noun', definition: 'Finding something good by chance' },
  { word: 'mellifluous', pos: 'adjective', definition: 'Sweet and musical to hear' },
  { word: 'ethereal', pos: 'adjective', definition: 'Extremely delicate and light' },
  { word: 'halcyon', pos: 'adjective', definition: 'Idyllically happy and peaceful' },
];

export default function WordRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FEATURED_WORDS.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = FEATURED_WORDS[currentIndex];

  return (
    <div className="relative">
      {/* Browser chrome mockup */}
      <div className="bg-gray-800 dark:bg-gray-900 rounded-t-xl p-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-gray-700 rounded-md px-3 py-1 text-gray-400 text-xs text-center">
          chrome-extension://daily-word
        </div>
      </div>

      {/* Extension popup mockup */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-b-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-primary-500">
          <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400">
            Daily Word
          </h3>
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 rounded-full text-sm">
            <span>🔥</span>
            <span className="font-semibold text-amber-700 dark:text-amber-400">7</span>
          </div>
        </div>

        <div 
          className={`mb-6 transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
              {current.word}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded italic">
              {current.pos}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{current.definition}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-4 border border-gray-100 dark:border-gray-700">
          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Examples
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-300 pl-4 border-l-2 border-primary-300">
            &quot;The {current.word} quality of the moment was unforgettable.&quot;
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 font-semibold">
            <span className="text-lg">✅</span>
            Used today
          </div>
        </div>
      </div>

      {/* Word indicator dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {FEATURED_WORDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(idx);
                setIsAnimating(false);
              }, 300);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-primary-500 w-6' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-300'
            }`}
            aria-label={`Show word ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

