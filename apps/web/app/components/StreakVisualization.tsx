'use client';

import { useEffect, useRef, useState } from 'react';

// Generate mock streak data for the last 30 days
function generateStreakData() {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simulate a realistic streak pattern
    const random = Math.random();
    let status: 'completed' | 'missed' | 'future';
    
    if (i === 0) {
      status = 'completed'; // Today
    } else if (i < 7) {
      status = random > 0.1 ? 'completed' : 'missed'; // Last week - high completion
    } else if (i < 14) {
      status = random > 0.2 ? 'completed' : 'missed';
    } else {
      status = random > 0.3 ? 'completed' : 'missed';
    }
    
    data.push({
      date,
      status,
      day: date.getDate(),
    });
  }
  
  return data;
}

export default function StreakVisualization() {
  const [isVisible, setIsVisible] = useState(false);
  const [streakData] = useState(generateStreakData);
  const ref = useRef<HTMLDivElement>(null);

  // Calculate current streak
  const currentStreak = streakData
    .slice()
    .reverse()
    .findIndex((d) => d.status === 'missed');
  const streakCount = currentStreak === -1 ? streakData.length : currentStreak;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Learning Journey
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your daily progress
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full">
          <span className="text-2xl">🔥</span>
          <span className="text-xl font-bold text-amber-700 dark:text-amber-400">
            {streakCount}
          </span>
          <span className="text-sm text-amber-600 dark:text-amber-500">day streak</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-10 gap-1.5">
        {streakData.map((day, idx) => (
          <div
            key={idx}
            className={`
              aspect-square rounded-md flex items-center justify-center text-xs font-medium
              transition-all duration-300
              ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              ${day.status === 'completed' 
                ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-sm' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }
            `}
            style={{ transitionDelay: `${idx * 20}ms` }}
            title={day.date.toLocaleDateString()}
          >
            {day.day}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-primary-400 to-primary-600" />
          <span>Word used</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-700" />
          <span>Missed</span>
        </div>
      </div>
    </div>
  );
}

