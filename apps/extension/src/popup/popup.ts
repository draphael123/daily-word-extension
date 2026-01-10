import { getLocalDayKey, getYesterdayKey } from '../utils/date';
import { generateShuffledIndices } from '../utils/shuffle';
import { getStorageState, setStorageState } from '../utils/storage';
import { validateWordInSentence } from '../utils/validation';
import type { WordEntry, StorageState } from '../types';
import words from '../data/words.json';

const WORD_COUNT = words.length;

// DOM Elements
const wordEl = document.getElementById('word') as HTMLHeadingElement;
const posEl = document.getElementById('pos') as HTMLSpanElement;
const definitionEl = document.getElementById('definition') as HTMLParagraphElement;
const example1El = document.getElementById('example-1') as HTMLLIElement;
const example2El = document.getElementById('example-2') as HTMLLIElement;
const streakCountEl = document.getElementById('streak-count') as HTMLSpanElement;
const sentenceInputEl = document.getElementById('sentence-input') as HTMLTextAreaElement;
const validationMessageEl = document.getElementById('validation-message') as HTMLDivElement;
const markButtonEl = document.getElementById('mark-button') as HTMLButtonElement;
const practiceSectionEl = document.getElementById('practice-section') as HTMLElement;
const usedSectionEl = document.getElementById('used-section') as HTMLElement;
const optionsLinkEl = document.getElementById('options-link') as HTMLAnchorElement;

let currentWord: WordEntry | null = null;

/**
 * Initialize or rotate word if needed, returning the current word
 */
async function initializeWord(): Promise<{ word: WordEntry; state: Partial<StorageState> }> {
  let state = await getStorageState();
  const todayKey = getLocalDayKey();

  // Check if shuffled order exists and is valid
  let shuffledOrder = state.shuffledOrder ?? [];
  let pointer = state.pointer ?? 0;
  let needsUpdate = false;

  if (!shuffledOrder.length || shuffledOrder.length !== WORD_COUNT) {
    // Initialize shuffled order
    shuffledOrder = generateShuffledIndices(WORD_COUNT);
    pointer = 0;
    needsUpdate = true;
  } else if (state.currentDayKey !== todayKey) {
    // Day has changed, advance to next word
    pointer = (pointer + 1) % WORD_COUNT;

    // If we've gone through all words, reshuffle
    if (pointer === 0) {
      shuffledOrder = generateShuffledIndices(WORD_COUNT);
    }
    needsUpdate = true;
  }

  if (needsUpdate) {
    const updates: Partial<StorageState> = {
      shuffledOrder,
      pointer,
      currentDayKey: todayKey,
      currentWordIndex: shuffledOrder[pointer],
      usedToday: false,
    };
    await setStorageState(updates);
    state = { ...state, ...updates };
  }

  const wordIndex = state.currentWordIndex ?? shuffledOrder[pointer];
  const word = words[wordIndex] as WordEntry;

  return { word, state };
}

/**
 * Update the UI with the current word
 */
function displayWord(word: WordEntry): void {
  wordEl.textContent = word.word;
  posEl.textContent = word.pos;
  definitionEl.textContent = word.definition;
  example1El.textContent = word.examples[0];
  example2El.textContent = word.examples[1];
  currentWord = word;
}

/**
 * Update streak display
 */
function updateStreakDisplay(streak: number): void {
  streakCountEl.textContent = String(streak);
}

/**
 * Toggle between practice and used sections
 */
function showUsedState(isUsed: boolean): void {
  if (isUsed) {
    practiceSectionEl.style.display = 'none';
    usedSectionEl.style.display = 'block';
  } else {
    practiceSectionEl.style.display = 'block';
    usedSectionEl.style.display = 'none';
  }
}

/**
 * Validate user input and update UI
 */
function handleInputChange(): void {
  if (!currentWord) return;

  const sentence = sentenceInputEl.value;
  const isValid = validateWordInSentence(sentence, currentWord.word);

  if (!sentence.trim()) {
    validationMessageEl.textContent = '';
    validationMessageEl.className = 'validation-message';
    markButtonEl.disabled = true;
  } else if (isValid) {
    validationMessageEl.textContent = `✓ Contains "${currentWord.word}"`;
    validationMessageEl.className = 'validation-message valid';
    markButtonEl.disabled = false;
  } else {
    validationMessageEl.textContent = `Include "${currentWord.word}" as a whole word`;
    validationMessageEl.className = 'validation-message invalid';
    markButtonEl.disabled = true;
  }
}

/**
 * Handle mark as used button click
 */
async function handleMarkAsUsed(): Promise<void> {
  if (!currentWord) return;

  const state = await getStorageState();
  const todayKey = getLocalDayKey();
  const yesterdayKey = getYesterdayKey();

  // Calculate streak
  let streak = state.streak ?? 0;
  if (state.lastUsedDay === yesterdayKey) {
    streak += 1;
  } else if (state.lastUsedDay !== todayKey) {
    streak = 1;
  }

  // Update storage
  await setStorageState({
    usedToday: true,
    lastUsedDay: todayKey,
    streak,
  });

  // Update UI
  showUsedState(true);
  updateStreakDisplay(streak);

  // Send notification if enabled
  const notificationsEnabled = state.notificationsEnabled ?? true;
  if (notificationsEnabled) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon-128.png'),
      title: 'Daily Word',
      message: `Nice — you used "${currentWord.word}" today.`,
    });
  }
}

/**
 * Open options page
 */
function handleOptionsClick(e: Event): void {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
}

/**
 * Initialize popup
 */
async function init(): Promise<void> {
  try {
    const { word, state } = await initializeWord();

    displayWord(word);
    updateStreakDisplay(state.streak ?? 0);
    showUsedState(state.usedToday ?? false);

    // Set up event listeners
    sentenceInputEl.addEventListener('input', handleInputChange);
    markButtonEl.addEventListener('click', handleMarkAsUsed);
    optionsLinkEl.addEventListener('click', handleOptionsClick);
  } catch (error) {
    console.error('[Daily Word] Error initializing popup:', error);
    wordEl.textContent = 'Error loading word';
    definitionEl.textContent = 'Please try again later.';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

