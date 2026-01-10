'use client';

import { useState, useEffect } from 'react';

const DEMO_WORD = 'serendipity';

export default function TryItDemo() {
  const [sentence, setSentence] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const regex = new RegExp(`\\b${DEMO_WORD}\\b`, 'i');
    setIsValid(regex.test(sentence));
  }, [sentence]);

  const handleMark = () => {
    setIsMarked(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleReset = () => {
    setSentence('');
    setIsMarked(false);
  };

  return (
    <div className="relative">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#0d9488', '#f59e0b', '#10b981', '#6366f1'][Math.floor(Math.random() * 4)],
              }}
            />
          ))}
        </div>
      )}

      <div className="card max-w-xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-3">
            Try it yourself!
          </span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Today&apos;s Word: <span className="gradient-text">{DEMO_WORD}</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="italic">noun</span> — The occurrence of events by chance in a happy way
          </p>
        </div>

        {!isMarked ? (
          <>
            <div className="mb-4">
              <label htmlFor="demo-sentence" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Write a sentence using &quot;{DEMO_WORD}&quot;:
              </label>
              <textarea
                id="demo-sentence"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder={`Example: Finding this extension was pure ${DEMO_WORD}!`}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className={`text-sm transition-colors ${
                sentence.length === 0 
                  ? 'text-gray-400' 
                  : isValid 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-500'
              }`}>
                {sentence.length === 0 ? (
                  'Start typing...'
                ) : isValid ? (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Contains &quot;{DEMO_WORD}&quot;
                  </span>
                ) : (
                  <span>Include &quot;{DEMO_WORD}&quot; as a whole word</span>
                )}
              </div>

              <button
                onClick={handleMark}
                disabled={!isValid}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  isValid
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Mark as Used
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-once">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Nice — you used &quot;{DEMO_WORD}&quot;! 🎉
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is exactly how the extension works. Simple, right?
            </p>
            <button
              onClick={handleReset}
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

