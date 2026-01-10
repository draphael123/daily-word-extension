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
}

/**
 * Storage state persisted in chrome.storage.local
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
}

/**
 * Default storage state for initialization
 */
export const DEFAULT_STORAGE_STATE: Partial<StorageState> = {
  currentDayKey: '',
  currentWordIndex: 0,
  usedToday: false,
  shuffledOrder: [],
  pointer: 0,
  notificationsEnabled: true,
  streak: 0,
  lastUsedDay: null,
};

