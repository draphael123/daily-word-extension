# Daily Word

A Chrome Extension (Manifest V3) that helps you expand your vocabulary one word at a time, paired with a Next.js landing page.

![Daily Word](https://via.placeholder.com/800x400/0d9488/ffffff?text=Daily+Word)

## 📚 Overview

**Daily Word** presents you with a new rare but delightful English word every day from a curated list of 1000+ words. Practice using each word by writing your own sentence, track your streak, and build your vocabulary naturally.

### Features

- 🎯 **1000+ Curated Words** - Hand-picked rare but pleasant English words with definitions and examples
- 📅 **Daily Rotation** - New word every day at midnight in your timezone
- ✍️ **Practice Mode** - Write your own sentence and validate it contains the word
- 🔥 **Streak Tracking** - Build and maintain your daily practice streak
- 🔔 **Smart Notifications** - Optional notifications when you use the word
- 🔒 **100% Private** - All data stored locally, no accounts required

## 🏗️ Project Structure

This is a **pnpm workspace monorepo** containing:

```
daily-word/
├── apps/
│   ├── extension/     # Chrome Extension (Manifest V3)
│   │   ├── src/
│   │   │   ├── popup/         # Extension popup UI
│   │   │   ├── options/       # Options page
│   │   │   ├── background/    # Service worker
│   │   │   ├── data/          # Words database (JSON)
│   │   │   └── utils/         # Utility functions
│   │   ├── icons/             # Extension icons
│   │   └── dist/              # Build output
│   └── web/           # Next.js Landing Page
│       └── app/               # App router pages
├── packages/
│   └── shared/        # Shared TypeScript types
└── pnpm-workspace.yaml
```

## 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** 8.0.0 or higher

```bash
# Install pnpm if you haven't
npm install -g pnpm
```

## 🚀 Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/daily-word.git
cd daily-word

# Install dependencies
pnpm install
```

### 2. Development

**Run the landing page:**

```bash
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000)

**Build the extension (watch mode):**

```bash
pnpm dev:extension
```

Outputs to `apps/extension/dist/`

### 3. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `apps/extension/dist` folder
5. The Daily Word icon should appear in your toolbar!

## 📦 Building for Production

### Build Everything

```bash
pnpm build
```

### Build Extension Only

```bash
pnpm build:extension
```

### Create Extension ZIP (for Chrome Web Store)

```bash
pnpm zip:extension
```

Creates `apps/extension/daily-word-extension.zip`

### Build Landing Page Only

```bash
pnpm build:web
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run Next.js landing page in development mode |
| `pnpm dev:extension` | Build extension in watch mode |
| `pnpm build` | Build both extension and landing page |
| `pnpm build:extension` | Build extension for production |
| `pnpm build:web` | Build landing page for production |
| `pnpm zip:extension` | Create ZIP file for Chrome Web Store submission |
| `pnpm clean` | Remove all build artifacts and node_modules |
| `pnpm typecheck` | Run TypeScript type checking on all packages |

## 🔐 Permissions

The extension requests minimal permissions:

- `storage` - Save your progress and preferences locally
- `alarms` - Schedule daily word rotation at midnight
- `notifications` - Show optional notifications when you use a word

**No content scripts, no browsing history access, no data collection.**

## 📱 Extension Pages

### Popup (Main UI)

- Displays today's word, definition, and examples
- Text area to write your own sentence
- Validates your sentence contains the word
- Mark as used button (with notification)
- Current streak display

### Options Page

- View statistics (streak, words seen)
- Toggle notifications on/off
- Reset and reshuffle word list

## 🎨 Tech Stack

### Extension
- TypeScript
- Vite (build tool)
- Vanilla CSS
- Chrome Extension Manifest V3

### Landing Page
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Fonts (Playfair Display, Source Sans)

### Shared
- pnpm workspaces
- TypeScript types

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Vocabulary sourced and curated from various linguistic resources
- Inspired by the joy of discovering new words

---

**Made with ❤️ for word lovers everywhere**

