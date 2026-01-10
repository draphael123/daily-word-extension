import { generateShuffledIndices } from '../utils/shuffle';
import { getStorageState, setStorageState } from '../utils/storage';
import { getLocalDayKey } from '../utils/date';
import words from '../data/words.json';

const WORD_COUNT = words.length;

// DOM Elements
const streakValueEl = document.getElementById('streak-value') as HTMLSpanElement;
const wordsSeenEl = document.getElementById('words-seen') as HTMLSpanElement;
const wordsRemainingEl = document.getElementById('words-remaining') as HTMLSpanElement;
const notificationsToggleEl = document.getElementById('notifications-toggle') as HTMLInputElement;
const resetButtonEl = document.getElementById('reset-button') as HTMLButtonElement;
const resetMessageEl = document.getElementById('reset-message') as HTMLDivElement;

/**
 * Load and display current statistics
 */
async function loadStats(): Promise<void> {
  const state = await getStorageState();

  // Update streak
  streakValueEl.textContent = String(state.streak ?? 0);

  // Calculate words seen (pointer position)
  const pointer = state.pointer ?? 0;
  wordsSeenEl.textContent = String(pointer + 1);
  wordsRemainingEl.textContent = String(WORD_COUNT - pointer - 1);

  // Update notifications toggle
  notificationsToggleEl.checked = state.notificationsEnabled ?? true;
}

/**
 * Handle notifications toggle change
 */
async function handleNotificationsChange(): Promise<void> {
  const enabled = notificationsToggleEl.checked;
  await setStorageState({ notificationsEnabled: enabled });
}

/**
 * Handle reset button click
 */
async function handleReset(): Promise<void> {
  if (!confirm('Are you sure you want to reset and reshuffle the word list? Your streak will be preserved.')) {
    return;
  }

  const state = await getStorageState();
  const todayKey = getLocalDayKey();

  // Generate new shuffled order
  const shuffledOrder = generateShuffledIndices(WORD_COUNT);

  await setStorageState({
    shuffledOrder,
    pointer: 0,
    currentDayKey: todayKey,
    currentWordIndex: shuffledOrder[0],
    usedToday: false,
    // Preserve streak and other settings
    streak: state.streak ?? 0,
    lastUsedDay: state.lastUsedDay ?? null,
    notificationsEnabled: state.notificationsEnabled ?? true,
  });

  // Update UI
  resetMessageEl.textContent = 'Word list has been reshuffled!';
  resetMessageEl.className = 'reset-message success';
  await loadStats();

  // Clear message after a delay
  setTimeout(() => {
    resetMessageEl.textContent = '';
  }, 3000);
}

/**
 * Initialize options page
 */
async function init(): Promise<void> {
  await loadStats();

  // Set up event listeners
  notificationsToggleEl.addEventListener('change', handleNotificationsChange);
  resetButtonEl.addEventListener('click', handleReset);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

