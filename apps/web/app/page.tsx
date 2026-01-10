import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-grid-pattern">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                Free Chrome Extension
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900 animate-slide-up">
                Expand Your{' '}
                <span className="gradient-text">Vocabulary</span>,<br />
                One Word at a Time
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 animate-slide-up animate-delay-100">
                Discover a new rare but delightful English word every day.
                Practice using it in your own sentences and track your growing
                vocabulary.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animate-delay-200">
                <a href="#install" className="btn-primary">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2.5a9.5 9.5 0 110 19 9.5 9.5 0 010-19zm4.5 9.5l-6 4V8l6 4z" />
                  </svg>
                  Install Extension
                </a>
                <a href="#features" className="btn-secondary">
                  Learn More
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 animate-slide-up animate-delay-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-500">Curated Words</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-500">Private & Local</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Free</div>
                  <div className="text-sm text-gray-500">Forever</div>
                </div>
              </div>
            </div>

            {/* Extension preview */}
            <div className="relative animate-slide-up animate-delay-200">
              <div className="relative mx-auto max-w-sm lg:max-w-md animate-float">
                {/* Browser chrome mockup */}
                <div className="bg-gray-800 rounded-t-xl p-3 flex items-center gap-2">
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
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-b-xl shadow-2xl border border-gray-200">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-primary-500">
                    <h3 className="text-lg font-bold text-primary-600">
                      Daily Word
                    </h3>
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full text-sm">
                      <span>🔥</span>
                      <span className="font-semibold text-amber-700">7</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h4 className="text-3xl font-bold text-gray-900 font-display">
                        susurrus
                      </h4>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded italic">
                        noun
                      </span>
                    </div>
                    <p className="text-gray-600">
                      A whispering or rustling sound
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl mb-4">
                    <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                      Examples
                    </h5>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 pl-4 border-l-2 border-primary-300">
                        &quot;The susurrus of wind through autumn leaves filled
                        the garden.&quot;
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                      <span className="text-lg">✅</span>
                      Used today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Everything You Need to{' '}
              <span className="gradient-text">Build Your Vocabulary</span>
            </h2>
            <p className="section-subtitle">
              Simple, focused, and designed to help you actually remember and
              use new words.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card group hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1000+ Curated Words
              </h3>
              <p className="text-gray-600">
                Hand-picked rare but pleasant English words with thoughtful
                definitions and example sentences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card group hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Daily Rotation
              </h3>
              <p className="text-gray-600">
                A new word every day at midnight in your timezone. Words never
                repeat until you&apos;ve seen them all.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card group hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Practice Writing
              </h3>
              <p className="text-gray-600">
                Write your own sentence using the word. The extension validates
                that you used it correctly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card group hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Streak Tracking
              </h3>
              <p className="text-gray-600">
                Build your streak by using the word each day. Stay motivated
                with visual progress tracking.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card group hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Notifications
              </h3>
              <p className="text-gray-600">
                Get a satisfying notification when you mark a word as used.
                Optional and fully configurable.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card group hover:border-primary-200 transition-colors">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                100% Private
              </h3>
              <p className="text-gray-600">
                All data stays on your device. No accounts, no tracking, no data
                collection. Just you and your words.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Install Section */}
      <section id="install" className="py-24 bg-gray-50 bg-dots-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Get Started in <span className="gradient-text">Minutes</span>
            </h2>
            <p className="section-subtitle">
              Install the extension and start building your vocabulary today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Chrome Web Store */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chrome Web Store
              </h3>
              <p className="text-gray-600 mb-6">
                The easiest way to install. One click and you&apos;re ready to
                go.
              </p>
              <a
                href="#"
                className="btn-primary inline-flex opacity-50 cursor-not-allowed"
                aria-disabled="true"
              >
                Coming Soon
              </a>
            </div>

            {/* Developer Mode */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {'</>'}
                </span>
                Developer Mode (Manual Install)
              </h3>
              <p className="text-gray-600 mb-6">
                Load the extension directly from source. Great for developers or
                early access.
              </p>

              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                    1
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Download or clone the repository
                    </p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 block text-gray-700 overflow-x-auto">
                      git clone https://github.com/your-repo/daily-word
                    </code>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                    2
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Build the extension
                    </p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 block text-gray-700 overflow-x-auto">
                      pnpm install && pnpm build:extension
                    </code>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                    3
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Open Chrome Extensions
                    </p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 block text-gray-700">
                      chrome://extensions
                    </code>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                    4
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Enable Developer Mode and click &quot;Load unpacked&quot;
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Select the{' '}
                      <code className="bg-gray-100 px-1 rounded">
                        apps/extension/dist
                      </code>{' '}
                      folder
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h2 className="section-title mb-4">Your Privacy is Sacred</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Daily Word is designed with privacy as a core principle. We
            don&apos;t collect any data, period.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900">No Tracking</h4>
              <p className="text-sm text-gray-500">
                No analytics, no cookies, no fingerprinting
              </p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">💾</div>
              <h4 className="font-semibold text-gray-900">Local Storage Only</h4>
              <p className="text-sm text-gray-500">
                All progress stays on your device
              </p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🚫</div>
              <h4 className="font-semibold text-gray-900">No Account Required</h4>
              <p className="text-sm text-gray-500">
                No email, no registration, no login
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            <details className="card group" open>
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-gray-900">
                How does the daily word rotation work?
                <span className="text-primary-500 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                At midnight in your local timezone, the extension automatically
                advances to the next word in your personalized shuffled list.
                Each user gets a unique order, and words never repeat until
                you&apos;ve seen all 1000+.
              </p>
            </details>

            <details className="card group">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-gray-900">
                What happens when I use all the words?
                <span className="text-primary-500 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                When you&apos;ve cycled through all words, the list
                automatically reshuffles and starts again. You can also manually
                reset and reshuffle from the Options page anytime.
              </p>
            </details>

            <details className="card group">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-gray-900">
                Is the extension really free?
                <span className="text-primary-500 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, 100% free with no hidden costs, premium features, or ads.
                This is a passion project to help people discover the beauty of
                the English language.
              </p>
            </details>

            <details className="card group">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-gray-900">
                Can I use this on Firefox or other browsers?
                <span className="text-primary-500 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                Currently, Daily Word is only available for Chrome and
                Chromium-based browsers (Edge, Brave, etc.). Firefox support may
                come in a future update.
              </p>
            </details>

            <details className="card group">
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-gray-900">
                How is my streak calculated?
                <span className="text-primary-500 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                Your streak increases by 1 each consecutive day you mark the
                word as used. If you miss a day, your streak resets to 0 (or 1
                if you use the word that day).
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="font-semibold text-white">Daily Word</span>
            </div>

            <div className="flex gap-6 text-sm">
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#install" className="hover:text-white transition-colors">
                Install
              </a>
              <a
                href="https://github.com"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>

            <p className="text-sm">
              © {new Date().getFullYear()} Daily Word. Open source and free
              forever.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

