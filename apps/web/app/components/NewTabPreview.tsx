'use client';

import { useState, useEffect } from 'react';

export default function NewTabPreview() {
  const [showWord, setShowWord] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWord(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Browser chrome mockup */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-t-xl px-4 py-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
        {/* Window buttons */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        
        {/* Tab */}
        <div className="flex-1 flex items-center gap-2 bg-white dark:bg-gray-700 rounded-t-lg px-4 py-2 -mb-3 max-w-[200px]">
          <span className="text-sm text-gray-600 dark:text-gray-300 truncate">New Tab</span>
        </div>
      </div>

      {/* New tab content */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-b-xl p-8 min-h-[400px] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-100 dark:bg-accent-900/30 rounded-full blur-3xl opacity-50" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-primary-600 dark:text-primary-400">Daily Word</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
              <span>🔥</span>
              <span className="font-bold text-primary-600">12</span>
              <span className="text-xs text-gray-500">streak</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
              <span>⭐</span>
              <span className="font-bold text-primary-600">340</span>
              <span className="text-xs text-gray-500">pts</span>
            </div>
          </div>
        </div>

        {/* Word card */}
        <div 
          className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-700 ${showWord ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                petrichor
              </h2>
              <div className="flex items-center gap-2">
                <span className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded text-xs font-medium">
                  noun
                </span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded text-xs">
                  literary
                </span>
                <span className="text-yellow-500 text-xs">★★☆☆☆</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-xl hover:scale-110 transition-transform">🤍</button>
              <button className="text-xl hover:scale-110 transition-transform">🔊</button>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.
          </p>
          
          <div className="text-xs text-gray-500 italic mb-4 pl-3 border-l-2 border-primary-300">
            From Greek petra (stone) + ichor (fluid of the gods)
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &quot;The petrichor rising from the garden after the summer storm was intoxicating.&quot;
            </p>
          </div>
        </div>

        {/* Bottom action */}
        <div className={`mt-6 transition-all duration-700 delay-300 ${showWord ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
              Use it in a sentence:
            </label>
            <div className="flex gap-3">
              <input 
                type="text" 
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                placeholder="The petrichor reminded me of..."
              />
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                ✓ Mark Used
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Label */}
      <div className="text-center mt-4">
        <span className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
          New Tab Experience
        </span>
      </div>
    </div>
  );
}

