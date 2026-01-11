'use client';

const permissions = [
  {
    name: 'storage',
    icon: '💾',
    purpose: 'Save your progress, streak, achievements, and settings',
    dataUsed: 'All data stays on your device and syncs to your Chrome account (if signed in)',
    concern: 'None - standard for any extension that saves settings',
  },
  {
    name: 'alarms',
    icon: '⏰',
    purpose: 'Rotate to a new word at midnight and send optional reminders',
    dataUsed: 'Just timing information, no personal data',
    concern: 'None - only triggers internal extension actions',
  },
  {
    name: 'notifications',
    icon: '🔔',
    purpose: 'Show achievement unlocks, usage confirmations, and optional reminders',
    dataUsed: 'None - just displays messages you configure',
    concern: 'None - fully optional and configurable',
  },
  {
    name: 'tts (Text-to-Speech)',
    icon: '🔊',
    purpose: 'Pronounce vocabulary words when you click the speaker button',
    dataUsed: 'The word is sent to Chrome\'s built-in TTS engine (local)',
    concern: 'None - processed locally by Chrome, not sent anywhere',
  },
  {
    name: 'contextMenus',
    icon: '📋',
    purpose: 'Add "Define with Daily Word" option when you right-click selected text',
    dataUsed: 'Only the word you select (checked against our vocabulary list)',
    concern: 'None - only activates when you right-click',
  },
  {
    name: 'Host permissions (all URLs)',
    icon: '🌐',
    purpose: 'Enable auto-detection when you naturally use vocabulary words while typing',
    dataUsed: 'Monitors text in input fields for YOUR vocabulary words only',
    concern: 'This is the broadest permission - see details below',
  },
];

export default function PermissionsExplained() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {permissions.map((perm, idx) => (
          <div 
            key={idx}
            className={`card transition-all duration-300 hover:shadow-lg ${
              perm.name.includes('Host') ? 'border-2 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{perm.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
                    {perm.name}
                  </code>
                  {perm.name.includes('Host') && (
                    <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-medium">
                      Requires attention
                    </span>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> {perm.purpose}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  <strong>Data used:</strong> {perm.dataUsed}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  <strong>Privacy concern:</strong> {perm.concern}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Host permissions deep dive */}
      <div className="mt-8 card bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-700">
        <h4 className="font-bold text-lg text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
          <span>⚠️</span>
          About "All URLs" Permission
        </h4>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            This permission sounds scary, but here&apos;s exactly what we do with it:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Detect when you type a Daily Word vocabulary word in any text field</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Highlight vocabulary words you&apos;ve learned when browsing websites</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Show definitions when you click highlighted words</span>
            </li>
          </ul>
          <p className="font-medium">
            What we DON&apos;T do:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Send ANY data to external servers - everything stays local</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Track your browsing history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Read passwords, credit cards, or sensitive form fields</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Store or log what you type (only checks for word matches)</span>
            </li>
          </ul>
          <p className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-4 text-sm">
            <strong>🔒 Privacy guarantee:</strong> The extension is 100% open source. You can inspect every line of code at{' '}
            <a 
              href="https://github.com/draphael123/daily-word-extension" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              GitHub
            </a>
            . If you prefer not to use auto-detection, you can disable it in Settings.
          </p>
        </div>
      </div>
    </div>
  );
}

