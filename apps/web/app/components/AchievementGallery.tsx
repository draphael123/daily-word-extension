'use client';

import { useState } from 'react';

const ALL_ACHIEVEMENTS = [
  { id: 'first_word', name: 'First Steps', description: 'Use your first word', icon: '🌱' },
  { id: 'streak_3', name: 'Getting Started', description: 'Maintain a 3-day streak', icon: '🔥' },
  { id: 'streak_7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '⚡' },
  { id: 'streak_14', name: 'Fortnight Fighter', description: 'Maintain a 14-day streak', icon: '💪' },
  { id: 'streak_30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🏆' },
  { id: 'streak_100', name: 'Century Club', description: 'Maintain a 100-day streak', icon: '💎' },
  { id: 'streak_365', name: 'Year of Words', description: 'Maintain a 365-day streak', icon: '👑' },
  { id: 'words_10', name: 'Vocabulary Builder', description: 'Use 10 different words', icon: '📚' },
  { id: 'words_25', name: 'Word Collector', description: 'Use 25 different words', icon: '📖' },
  { id: 'words_50', name: 'Lexicon Explorer', description: 'Use 50 different words', icon: '🗺️' },
  { id: 'words_100', name: 'Vocabulary Master', description: 'Use 100 different words', icon: '🎓' },
  { id: 'words_250', name: 'Word Wizard', description: 'Use 250 different words', icon: '🧙' },
  { id: 'words_500', name: 'Linguistic Legend', description: 'Use 500 different words', icon: '🌟' },
  { id: 'points_100', name: 'Point Starter', description: 'Earn 100 points', icon: '💰' },
  { id: 'points_500', name: 'Point Collector', description: 'Earn 500 points', icon: '💵' },
  { id: 'points_1000', name: 'Point Master', description: 'Earn 1,000 points', icon: '💎' },
  { id: 'points_5000', name: 'Point Legend', description: 'Earn 5,000 points', icon: '🏅' },
  { id: 'favorites_5', name: 'Word Lover', description: 'Favorite 5 words', icon: '❤️' },
  { id: 'favorites_25', name: 'Word Enthusiast', description: 'Favorite 25 words', icon: '💕' },
  { id: 'notes_10', name: 'Note Taker', description: 'Add notes to 10 words', icon: '📝' },
  { id: 'challenge_1', name: 'Challenge Accepted', description: 'Complete your first weekly challenge', icon: '🎯' },
  { id: 'challenge_4', name: 'Challenge Champion', description: 'Complete 4 weekly challenges', icon: '🏅' },
  { id: 'auto_detect_1', name: 'Natural Speaker', description: 'Have a word auto-detected on a website', icon: '🔍' },
  { id: 'auto_detect_10', name: 'Fluent User', description: 'Have 10 words auto-detected', icon: '🎤' },
  { id: 'review_10', name: 'Memory Master', description: 'Complete 10 spaced repetition reviews', icon: '🧠' },
];

export default function AchievementGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-12 gap-3">
        {ALL_ACHIEVEMENTS.map((achievement, idx) => (
          <div
            key={achievement.id}
            className="relative group"
            onMouseEnter={() => setHoveredId(achievement.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div 
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl
                bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700
                shadow-lg cursor-pointer transition-all duration-300
                hover:scale-125 hover:z-10 hover:border-primary-300 dark:hover:border-primary-600
                hover:shadow-xl hover:shadow-primary-100 dark:hover:shadow-primary-900/30
                ${hoveredId === achievement.id ? 'animate-bounce-once' : ''}
              `}
            >
              {achievement.icon}
            </div>
            
            {/* Tooltip */}
            <div 
              className={`
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg
                whitespace-nowrap z-20 pointer-events-none
                transition-all duration-200
                ${hoveredId === achievement.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
            >
              <div className="font-bold">{achievement.name}</div>
              <div className="text-gray-300">{achievement.description}</div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Hover over any badge to see how to unlock it!
      </p>
    </div>
  );
}

