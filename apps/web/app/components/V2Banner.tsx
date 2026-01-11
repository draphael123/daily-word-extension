'use client';

import { useState } from 'react';

export default function V2Banner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 text-white py-3 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute -bottom-1 right-1/3 w-3 h-3 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 relative">
        <span className="text-2xl animate-bounce">🎉</span>
        <div className="text-center">
          <span className="font-bold text-lg">Version 2.0 is here!</span>
          <span className="hidden sm:inline mx-2">—</span>
          <span className="hidden sm:inline text-white/90">
            Auto-detection, achievements, dark mode, 25 badges & more!
          </span>
        </div>
        <a 
          href="#whats-new" 
          className="hidden md:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium transition-colors"
        >
          See what&apos;s new →
        </a>
        <button 
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

