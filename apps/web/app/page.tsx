import WordRotator from './components/WordRotator';
import TryItDemo from './components/TryItDemo';
import WordCloud from './components/WordCloud';
import AnimatedStats from './components/AnimatedStats';
import SampleWords from './components/SampleWords';
import StreakVisualization from './components/StreakVisualization';
import ThemeToggle from './components/ThemeToggle';
import ScrollAnimator from './components/ScrollAnimator';
import V2Banner from './components/V2Banner';
import AchievementGallery from './components/AchievementGallery';
import NewTabPreview from './components/NewTabPreview';
import VersionComparison from './components/VersionComparison';
import PermissionsExplained from './components/PermissionsExplained';
import Changelog from './components/Changelog';
import KeyboardShortcuts from './components/KeyboardShortcuts';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* V2 Banner */}
      <V2Banner />

      {/* Fixed Theme Toggle */}
      <div className="fixed top-16 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-grid-pattern">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-100 dark:bg-accent-900/30 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/50 border border-primary-100 dark:border-primary-800 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                Free Chrome Extension — v2.0 Now Available!
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900 dark:text-white animate-slide-up">
                Expand Your{' '}
                <span className="gradient-text">Vocabulary</span>,<br />
                One Word at a Time
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 animate-slide-up animate-delay-100">
                Discover a new rare but delightful English word every day.
                Track your streak, earn achievements, and watch your vocabulary grow.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animate-delay-200">
                <a 
                  href="/daily-word-extension.zip" 
                  download="daily-word-extension.zip"
                  className="btn-primary animate-pulse-glow"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download v2.0
                </a>
                <a href="#whats-new" className="btn-secondary">
                  See What&apos;s New
                </a>
              </div>

              <div className="mt-10 animate-slide-up animate-delay-300">
                <AnimatedStats />
              </div>
            </div>

            {/* Extension preview - now with rotating words */}
            <div className="relative animate-slide-up animate-delay-200">
              <div className="relative mx-auto max-w-sm lg:max-w-md animate-float">
                <WordRotator />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* What's New in v2.0 Section */}
      <section id="whats-new" className="py-24 bg-gradient-to-b from-primary-50 to-white dark:from-primary-950 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🎉 NEW RELEASE
            </span>
            <h2 className="section-title">
              What&apos;s New in <span className="gradient-text">Version 2.0</span>
            </h2>
            <p className="section-subtitle">
              A massive update with 20+ new features to supercharge your vocabulary learning.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <VersionComparison />
          </ScrollAnimator>
        </div>
      </section>

      {/* New Tab Preview Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              Your New Tab, <span className="gradient-text">Transformed</span>
            </h2>
            <p className="section-subtitle">
              Every new tab becomes a learning opportunity. See today&apos;s word, track your streak, 
              and use the word right from your new tab page.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <NewTabPreview />
          </ScrollAnimator>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              Unlock <span className="gradient-text">25 Achievements</span>
            </h2>
            <p className="section-subtitle">
              Earn badges for streaks, words used, points earned, and special accomplishments.
              Can you collect them all?
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <AchievementGallery />
          </ScrollAnimator>
        </div>
      </section>

      {/* Word Cloud Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-8">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Words you&apos;ll discover
            </p>
          </ScrollAnimator>
          <WordCloud />
        </div>
      </section>

      {/* Try It Demo Section */}
      <section id="try-it" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-12">
            <h2 className="section-title">
              Try It <span className="gradient-text">Right Now</span>
            </h2>
            <p className="section-subtitle">
              Experience how the extension works before you install it.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <TryItDemo />
          </ScrollAnimator>
        </div>
      </section>

      {/* Features Section - Updated for v2.0 */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              Packed with <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to build a remarkable vocabulary, and then some.
            </p>
          </ScrollAnimator>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Auto-Detection',
                description: 'Automatically detects when you naturally use vocabulary words while typing on any website.',
                isNew: true,
              },
              {
                icon: '🌐',
                title: 'Word Highlighting',
                description: 'Vocabulary words are highlighted on web pages. Click to see the definition instantly.',
                isNew: true,
              },
              {
                icon: '🔊',
                title: 'Pronunciation',
                description: 'Click the speaker button to hear any word pronounced correctly using text-to-speech.',
                isNew: true,
              },
              {
                icon: '🏆',
                title: '25 Achievements',
                description: 'Unlock badges for streaks, words used, points earned, and special accomplishments.',
                isNew: true,
              },
              {
                icon: '⭐',
                title: 'Points & Challenges',
                description: 'Earn points for using words with streak bonuses. Complete weekly challenges for extra rewards.',
                isNew: true,
              },
              {
                icon: '🌙',
                title: 'Dark Mode',
                description: 'Beautiful dark theme across all pages. Automatically matches your system preference.',
                isNew: true,
              },
              {
                icon: '📚',
                title: '1000+ Curated Words',
                description: 'Hand-picked rare but pleasant English words with thoughtful definitions and example sentences.',
              },
              {
                icon: '📅',
                title: 'Daily Rotation',
                description: 'A new word every day at midnight in your timezone. Words never repeat until you\'ve seen them all.',
              },
              {
                icon: '🔥',
                title: 'Streak Tracking',
                description: 'Build your streak by using the word each day. Visualize your progress on a calendar heatmap.',
              },
              {
                icon: '📖',
                title: 'Word History',
                description: 'Browse, search, and filter all past words. Add favorites and personal notes.',
                isNew: true,
              },
              {
                icon: '⌨️',
                title: 'Keyboard Shortcuts',
                description: 'Quick access with Alt+W. Power users can navigate without touching the mouse.',
                isNew: true,
              },
              {
                icon: '☁️',
                title: 'Cross-Device Sync',
                description: 'Your progress syncs across all Chrome browsers where you\'re signed in.',
                isNew: true,
              },
            ].map((feature, idx) => (
              <ScrollAnimator key={idx} delay={idx * 50} animation="fade-up">
                <div className="card group hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    {feature.isNew && (
                      <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-12">
            <h2 className="section-title">
              <span className="gradient-text">Keyboard</span> Shortcuts
            </h2>
            <p className="section-subtitle">
              Power users rejoice! Navigate Daily Word without touching your mouse.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <KeyboardShortcuts />
          </ScrollAnimator>
        </div>
      </section>

      {/* Sample Words Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              A Taste of What Awaits <span className="gradient-text">You</span>
            </h2>
            <p className="section-subtitle">
              Here are just a few of the beautiful words you&apos;ll discover.
            </p>
          </ScrollAnimator>

          <SampleWords />
        </div>
      </section>

      {/* Streak Visualization Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-12">
            <h2 className="section-title">
              Watch Your <span className="gradient-text">Progress Grow</span>
            </h2>
            <p className="section-subtitle">
              Track your learning streak with a beautiful calendar heatmap in the settings page.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <StreakVisualization />
          </ScrollAnimator>
        </div>
      </section>

      {/* Install Section */}
      <section id="install" className="py-24 bg-white dark:bg-gray-900 bg-dots-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              Get Started in <span className="gradient-text">Minutes</span>
            </h2>
            <p className="section-subtitle">
              Install the extension and start building your vocabulary today.
            </p>
          </ScrollAnimator>

          {/* Direct Download - Featured */}
          <ScrollAnimator delay={100}>
            <div className="card text-center mb-12 border-2 border-primary-200 dark:border-primary-700 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-800/50 rounded-full text-primary-700 dark:text-primary-300 text-xs font-semibold mb-4">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                RECOMMENDED
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Direct Download
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Download the extension ZIP file directly and load it in Chrome.
                No build tools required.
              </p>
              <a 
                href="/daily-word-extension.zip" 
                download="daily-word-extension.zip"
                className="btn-primary inline-flex text-lg px-8 py-4"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download v2.0 (122 KB)
              </a>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                Version 2.0.0 • Works on Chrome, Edge, Brave, and other Chromium browsers
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollAnimator delay={200} animation="slide-right">
              <div className="card h-full">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    1
                  </span>
                  Install from ZIP
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  After downloading the ZIP, follow these simple steps:
                </p>

                <ol className="space-y-4">
                  {[
                    { step: 'Extract the ZIP file', detail: 'Unzip to any folder on your computer' },
                    { step: 'Open Chrome Extensions', detail: 'chrome://extensions' },
                    { step: 'Enable Developer Mode', detail: 'Toggle in the top-right corner' },
                    { step: 'Click "Load unpacked"', detail: 'Select the extracted folder' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-semibold text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.step}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollAnimator>

            <ScrollAnimator delay={300} animation="slide-left">
              <div className="card h-full">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {'</>'}
                  </span>
                  Build from Source
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  For developers who want to modify or contribute:
                </p>

                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold text-xs">1</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Clone the repo</p>
                      <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-1 block text-gray-700 dark:text-gray-300 overflow-x-auto">
                        git clone https://github.com/draphael123/daily-word-extension.git
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold text-xs">2</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Install & build</p>
                      <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-1 block text-gray-700 dark:text-gray-300 overflow-x-auto">
                        pnpm install && pnpm build:extension
                      </code>
                    </div>
                  </li>
                </ol>

                <a 
                  href="https://github.com/draphael123/daily-word-extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Permissions Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              <span className="gradient-text">Permissions</span> Explained
            </h2>
            <p className="section-subtitle">
              We believe in transparency. Here&apos;s exactly what each permission does and why we need it.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <PermissionsExplained />
          </ScrollAnimator>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimator>
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="section-title mb-4">Your Privacy is Sacred</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Daily Word is designed with privacy as a core principle. Everything stays on your device.
            </p>
          </ScrollAnimator>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { emoji: '🔒', title: 'No Tracking', desc: 'No analytics, no cookies, no fingerprinting' },
              { emoji: '💾', title: 'Local + Sync', desc: 'Data stays on device, syncs via your Chrome account only' },
              { emoji: '🚫', title: 'No Account Required', desc: 'No email, no registration, no login' },
            ].map((item, idx) => (
              <ScrollAnimator key={idx} delay={idx * 100} animation="scale">
                <div className="p-4 group">
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{item.emoji}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Changelog Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              <span className="gradient-text">Changelog</span>
            </h2>
            <p className="section-subtitle">
              See everything that&apos;s been added and improved.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={100}>
            <Changelog />
          </ScrollAnimator>
        </div>
      </section>

      {/* FAQ Section - Updated with new questions */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator className="text-center mb-16">
            <h2 className="section-title">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </ScrollAnimator>

          <div className="space-y-4">
            {[
              {
                q: 'How does auto-detection work?',
                a: 'When you type in any text field on any website, the extension checks if you\'ve used one of your Daily Word vocabulary words. If detected, you earn 15 points and see a notification. Your typing is NOT stored or sent anywhere - it\'s only compared against the word list locally.',
              },
              {
                q: 'Is my typing data sent anywhere?',
                a: 'Absolutely not. All detection happens 100% locally in your browser. We never send your typing, browsing history, or any personal data to any server. The extension is open source - you can verify this yourself.',
              },
              {
                q: 'How do I disable the new tab override?',
                a: 'Go to the extension\'s Options page (click the gear icon in the popup), scroll to "Website Integration", and toggle off "New Tab Override". Your regular new tab page will return immediately.',
              },
              {
                q: 'How does the daily word rotation work?',
                a: 'At midnight in your local timezone, the extension automatically advances to the next word in your personalized shuffled list. Each user gets a unique order, and words never repeat until you\'ve seen all 1000+.',
              },
              {
                q: 'What happens when I use all the words?',
                a: 'When you\'ve cycled through all words, the list automatically reshuffles and starts again. You can also manually reset and reshuffle from the Options page anytime.',
              },
              {
                q: 'How are points calculated?',
                a: 'You earn 10 points for marking a word as used, plus a streak bonus (up to 5 points × your streak days, max 150 bonus). Auto-detection gives 15 points. Weekly challenges give 50 points. Each achievement unlocked gives 25 points.',
              },
              {
                q: 'Does my progress sync across devices?',
                a: 'Yes! If you\'re signed into Chrome, your progress (streak, points, history, achievements) syncs automatically via chrome.storage.sync. You\'ll pick up right where you left off on any device.',
              },
              {
                q: 'Is the extension really free?',
                a: 'Yes, 100% free with no hidden costs, premium features, or ads. This is a passion project to help people discover the beauty of the English language.',
              },
              {
                q: 'Can I use this on Firefox or other browsers?',
                a: 'Currently, Daily Word is only available for Chrome and Chromium-based browsers (Edge, Brave, etc.). Firefox support may come in a future update.',
              },
            ].map((faq, idx) => (
              <ScrollAnimator key={idx} delay={idx * 50}>
                <details className="card group">
                  <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-gray-900 dark:text-white">
                    {faq.q}
                    <span className="text-primary-500 group-open:rotate-180 transition-transform duration-300">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">{faq.a}</p>
                </details>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="font-semibold text-white">Daily Word</span>
              <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded ml-2">v2.0</span>
            </div>

            <div className="flex gap-6 text-sm">
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#install" className="hover:text-white transition-colors">
                Install
              </a>
              <a href="#whats-new" className="hover:text-white transition-colors">
                What&apos;s New
              </a>
              <a
                href="https://github.com/draphael123/daily-word-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>

            <p className="text-sm">
              © {new Date().getFullYear()} Daily Word. Open source and free forever.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
