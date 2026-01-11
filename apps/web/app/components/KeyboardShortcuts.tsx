'use client';

const shortcuts = [
  {
    keys: ['Alt', 'W'],
    description: 'Open the Daily Word popup',
    icon: '📖',
  },
  {
    keys: ['Alt', 'Shift', 'W'],
    description: 'Quick action (mark word as used)',
    icon: '✓',
  },
];

export default function KeyboardShortcuts() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-4">
        {shortcuts.map((shortcut, idx) => (
          <div 
            key={idx}
            className="card flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl">{shortcut.icon}</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white mb-1">
                {shortcut.description}
              </p>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIdx) => (
                  <span key={keyIdx} className="flex items-center gap-1">
                    <kbd className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 shadow-sm">
                      {key}
                    </kbd>
                    {keyIdx < shortcut.keys.length - 1 && (
                      <span className="text-gray-400 text-xs">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        💡 Tip: You can customize these shortcuts in Chrome at{' '}
        <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">chrome://extensions/shortcuts</code>
      </p>
    </div>
  );
}

