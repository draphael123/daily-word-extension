'use client';

const features = [
  { feature: 'Daily word with definition & examples', v1: true, v2: true },
  { feature: 'Streak tracking', v1: true, v2: true },
  { feature: 'Basic notifications', v1: true, v2: true },
  { feature: 'Options page', v1: true, v2: true },
  { feature: 'Dark mode', v1: false, v2: true },
  { feature: 'New tab page', v1: false, v2: true },
  { feature: 'Auto-detection on websites', v1: false, v2: true },
  { feature: 'Word highlighting on pages', v1: false, v2: true },
  { feature: 'Right-click to define', v1: false, v2: true },
  { feature: 'Pronunciation (TTS)', v1: false, v2: true },
  { feature: 'Points system', v1: false, v2: true },
  { feature: '25 achievements', v1: false, v2: true },
  { feature: 'Weekly challenges', v1: false, v2: true },
  { feature: 'Word history & search', v1: false, v2: true },
  { feature: 'Favorites', v1: false, v2: true },
  { feature: 'Personal notes', v1: false, v2: true },
  { feature: 'Streak calendar', v1: false, v2: true },
  { feature: 'Morning/evening reminders', v1: false, v2: true },
  { feature: 'Export data', v1: false, v2: true },
  { feature: 'Keyboard shortcuts', v1: false, v2: true },
  { feature: 'Cross-device sync', v1: false, v2: true },
  { feature: 'Etymology & word origins', v1: false, v2: true },
  { feature: 'Difficulty ratings', v1: false, v2: true },
  { feature: 'Related words', v1: false, v2: true },
];

export default function VersionComparison() {
  const v1Count = features.filter(f => f.v1).length;
  const v2Count = features.filter(f => f.v2).length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div className="font-bold text-gray-900 dark:text-white">Feature</div>
        <div>
          <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-semibold">
            v1.0
          </span>
        </div>
        <div>
          <span className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
            v2.0 ✨
          </span>
        </div>
      </div>

      {/* Features table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {features.map((item, idx) => (
          <div 
            key={idx}
            className={`grid grid-cols-3 gap-4 px-4 py-3 items-center text-sm ${
              idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-750'
            } ${!item.v1 && item.v2 ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''}`}
          >
            <div className={`${!item.v1 && item.v2 ? 'font-medium text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
              {!item.v1 && item.v2 && <span className="mr-1">✨</span>}
              {item.feature}
            </div>
            <div className="text-center">
              {item.v1 ? (
                <span className="text-green-500 text-lg">✓</span>
              ) : (
                <span className="text-gray-300 dark:text-gray-600">—</span>
              )}
            </div>
            <div className="text-center">
              {item.v2 ? (
                <span className="text-green-500 text-lg">✓</span>
              ) : (
                <span className="text-gray-300 dark:text-gray-600">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="text-3xl font-bold text-gray-400">{v1Count}</div>
          <div className="text-sm text-gray-500">features in v1.0</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl border-2 border-primary-200 dark:border-primary-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{v2Count}</div>
          <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">features in v2.0</div>
        </div>
      </div>
    </div>
  );
}

