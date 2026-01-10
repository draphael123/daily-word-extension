/**
 * Represents a single vocabulary word entry
 */
export interface WordEntry {
  /** The vocabulary word */
  word: string;
  /** Part of speech (noun, verb, adjective, etc.) */
  pos: string;
  /** Definition of the word */
  definition: string;
  /** Two example sentences using the word */
  examples: [string, string];
  /** Etymology/origin of the word */
  etymology?: string;
  /** Related words (synonyms, antonyms, same root) */
  related?: string[];
  /** Context category for when to use */
  category?: 'formal' | 'casual' | 'poetic' | 'technical' | 'literary' | 'archaic';
  /** Difficulty level 1-5 */
  difficulty?: number;
}

/**
 * Word history entry for tracking learned words
 */
export interface WordHistoryEntry {
  /** Word index in the words array */
  wordIndex: number;
  /** Date first shown (YYYY-MM-DD) */
  dateShown: string;
  /** Whether it was marked as used */
  wasUsed: boolean;
  /** User's personal notes */
  notes?: string;
  /** Whether user favorited this word */
  isFavorite: boolean;
  /** Number of times reviewed in spaced repetition */
  reviewCount: number;
  /** Next review date for spaced repetition */
  nextReviewDate?: string;
  /** User's sentence when they used it */
  userSentence?: string;
}

/**
 * Achievement/badge definition
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string; // Date when unlocked
}

/**
 * Weekly challenge definition
 */
export interface WeeklyChallenge {
  weekStart: string; // Monday of the week (YYYY-MM-DD)
  goal: number;
  progress: number;
  completed: boolean;
}

/**
 * Reminder settings
 */
export interface ReminderSettings {
  morningReminder: boolean;
  morningTime: string; // HH:MM format
  eveningReminder: boolean;
  eveningTime: string;
  weeklySummary: boolean;
}

/**
 * Storage state persisted in chrome.storage.sync
 */
export interface StorageState {
  /** Current day in YYYY-MM-DD format */
  currentDayKey: string;
  /** Index of current word in the words array */
  currentWordIndex: number;
  /** Whether the user has marked today's word as used */
  usedToday: boolean;
  /** Shuffled array of word indices */
  shuffledOrder: number[];
  /** Current position in the shuffled order */
  pointer: number;
  /** Whether notifications are enabled */
  notificationsEnabled: boolean;
  /** Current streak count */
  streak: number;
  /** Last day the word was marked as used (YYYY-MM-DD) */
  lastUsedDay: string | null;
  
  // === NEW FIELDS ===
  
  /** Theme preference */
  theme: 'light' | 'dark' | 'system';
  /** Total points earned */
  points: number;
  /** Word history - all words shown to user */
  wordHistory: WordHistoryEntry[];
  /** Unlocked achievements */
  achievements: Achievement[];
  /** Current weekly challenge */
  weeklyChallenge: WeeklyChallenge | null;
  /** Reminder settings */
  reminders: ReminderSettings;
  /** Words per day setting (1-3) */
  wordsPerDay: number;
  /** Difficulty preference (1-5, 0 = all) */
  difficultyPreference: number;
  /** Whether auto-detection is enabled */
  autoDetectionEnabled: boolean;
  /** Whether word highlighting is enabled */
  highlightWordsEnabled: boolean;
  /** Whether new tab override is enabled */
  newTabEnabled: boolean;
  /** All days where word was used (for streak calendar) */
  usageDays: string[];
  /** Words detected being used on websites */
  autoDetectedUsages: Array<{
    wordIndex: number;
    date: string;
    url: string;
    context: string;
  }>;
}

/**
 * Default storage state for initialization
 */
export const DEFAULT_STORAGE_STATE: StorageState = {
  currentDayKey: '',
  currentWordIndex: 0,
  usedToday: false,
  shuffledOrder: [],
  pointer: 0,
  notificationsEnabled: true,
  streak: 0,
  lastUsedDay: null,
  theme: 'system',
  points: 0,
  wordHistory: [],
  achievements: [],
  weeklyChallenge: null,
  reminders: {
    morningReminder: false,
    morningTime: '08:00',
    eveningReminder: false,
    eveningTime: '20:00',
    weeklySummary: true,
  },
  wordsPerDay: 1,
  difficultyPreference: 0,
  autoDetectionEnabled: true,
  highlightWordsEnabled: true,
  newTabEnabled: true,
  usageDays: [],
  autoDetectedUsages: [],
};

/**
 * All available achievements
 */
export const ALL_ACHIEVEMENTS: Achievement[] = [
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
  { id: 'all_categories', name: 'Renaissance Reader', description: 'Use words from all categories', icon: '🌈' },
];

/**
 * Points awarded for different actions
 */
export const POINTS = {
  MARK_USED: 10,
  STREAK_BONUS_PER_DAY: 5,
  AUTO_DETECT: 15,
  ADD_NOTE: 5,
  COMPLETE_REVIEW: 10,
  WEEKLY_CHALLENGE: 50,
  ACHIEVEMENT_UNLOCK: 25,
};
