'use client';

const changelog = [
  {
    version: '2.0.0',
    date: 'January 2026',
    title: 'The Big Update',
    badge: 'NEW',
    changes: [
      { type: 'feature', text: 'Auto-detection: Extension detects when you use words naturally on websites' },
      { type: 'feature', text: 'Word highlighting: Vocabulary words are highlighted on web pages' },
      { type: 'feature', text: 'New tab page: Beautiful new tab showing today\'s word' },
      { type: 'feature', text: 'Right-click define: Select text → right-click → Define with Daily Word' },
      { type: 'feature', text: 'Dark mode: Full dark theme support across all pages' },
      { type: 'feature', text: 'Pronunciation: Click to hear words pronounced' },
      { type: 'feature', text: '25 achievements: Unlock badges for streaks, words used, points, and more' },
      { type: 'feature', text: 'Points system: Earn points for using words, with streak bonuses' },
      { type: 'feature', text: 'Weekly challenges: Use 5 words per week for bonus points' },
      { type: 'feature', text: 'Word history: Browse, search, and filter all past words' },
      { type: 'feature', text: 'Favorites: Heart words you love for quick access' },
      { type: 'feature', text: 'Personal notes: Add your own mnemonics to words' },
      { type: 'feature', text: 'Streak calendar: Visual heatmap of your learning history' },
      { type: 'feature', text: 'Smart reminders: Morning & evening notifications (configurable)' },
      { type: 'feature', text: 'Export data: Download your complete history as JSON' },
      { type: 'feature', text: 'Keyboard shortcuts: Alt+W to open, Alt+Shift+W for quick actions' },
      { type: 'feature', text: 'Cross-device sync: Progress syncs via Chrome account' },
      { type: 'improvement', text: 'Enhanced words with etymology, categories, difficulty, and related words' },
      { type: 'improvement', text: 'Completely redesigned popup with stats bar and modals' },
      { type: 'improvement', text: 'Redesigned options page with streak calendar' },
    ],
  },
  {
    version: '1.0.0',
    date: 'December 2025',
    title: 'Initial Release',
    changes: [
      { type: 'feature', text: 'Daily word rotation with 1000+ curated words' },
      { type: 'feature', text: 'Definitions and example sentences' },
      { type: 'feature', text: 'Sentence validation ("Use it in a sentence")' },
      { type: 'feature', text: 'Streak tracking' },
      { type: 'feature', text: 'Basic notifications' },
      { type: 'feature', text: 'Options page with reset functionality' },
    ],
  },
];

export default function Changelog() {
  return (
    <div className="max-w-3xl mx-auto">
      {changelog.map((release, idx) => (
        <div 
          key={release.version} 
          className={`relative pl-8 pb-12 ${idx !== changelog.length - 1 ? 'border-l-2 border-gray-200 dark:border-gray-700' : ''}`}
        >
          {/* Timeline dot */}
          <div 
            className={`absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full border-4 ${
              idx === 0 
                ? 'bg-primary-500 border-primary-200 dark:border-primary-800' 
                : 'bg-gray-300 border-gray-100 dark:bg-gray-600 dark:border-gray-800'
            }`}
          />
          
          {/* Version header */}
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              v{release.version}
            </h3>
            {release.badge && (
              <span className="bg-primary-500 text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">
                {release.badge}
              </span>
            )}
            <span className="text-gray-500 dark:text-gray-400 text-sm">{release.date}</span>
          </div>
          
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">{release.title}</h4>
          
          {/* Changes list */}
          <ul className="space-y-2">
            {release.changes.map((change, changeIdx) => (
              <li key={changeIdx} className="flex items-start gap-2 text-sm">
                <span className={`mt-0.5 ${
                  change.type === 'feature' ? 'text-green-500' : 
                  change.type === 'improvement' ? 'text-blue-500' : 
                  'text-orange-500'
                }`}>
                  {change.type === 'feature' ? '✨' : 
                   change.type === 'improvement' ? '⚡' : 
                   '🐛'}
                </span>
                <span className="text-gray-600 dark:text-gray-400">{change.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

