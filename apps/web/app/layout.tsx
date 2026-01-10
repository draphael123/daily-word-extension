import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Daily Word - Expand Your Vocabulary One Word at a Time',
  description:
    'A Chrome extension that helps you learn a new rare but delightful English word every day. Build your vocabulary naturally with daily practice.',
  keywords: [
    'vocabulary',
    'chrome extension',
    'daily word',
    'english learning',
    'word of the day',
  ],
  authors: [{ name: 'Daily Word Team' }],
  openGraph: {
    title: 'Daily Word - Expand Your Vocabulary',
    description: 'Learn a new word every day with this free Chrome extension.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-body bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

