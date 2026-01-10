/**
 * Daily Word New Tab Page
 */

import type { WordEntry, StorageState } from '../types';
import { DEFAULT_STORAGE_STATE } from '../types';
import { getLocalDayKey } from '../utils/date';
import { validateSentence } from '../utils/validation';

let words: WordEntry[] = [];
let currentWord: WordEntry | null = null;
let state: Partial<StorageState> = {};

/**
 * Initialize the new tab page
 */
async function init() {
  // Load words
  const response = await fetch(chrome.runtime.getURL('src/data/words.json'));
  words = await response.json();

  // Load storage state
  state = await chrome.storage.sync.get(null) as Partial<StorageState>;
  
  // Apply defaults
  state = { ...DEFAULT_STORAGE_STATE, ...state };

  // Check if we need to advance the day
  const today = getLocalDayKey();
  if (state.currentDayKey !== today) {
    // Let background handle day advancement, just request current state
    chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
      if (response) {
        state = { ...state, ...response };
        render();
      }
    });
  } else {
    render();
  }

  // Setup event listeners
  setupEventListeners();

  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes) => {
    for (const [key, { newValue }] of Object.entries(changes)) {
      (state as any)[key] = newValue;
    }
    render();
  });
}

/**
 * Render the page content
 */
function render() {
  // Apply theme
  applyTheme();

  // Get current word
  if (typeof state.currentWordIndex === 'number' && words[state.currentWordIndex]) {
    currentWord = words[state.currentWordIndex];
  } else {
    currentWord = words[0];
  }

  if (!currentWord) return;

  // Update word display
  const wordEl = document.getElementById('word');
  const posEl = document.getElementById('pos');
  const definitionEl = document.getElementById('definition');
  const etymologyEl = document.getElementById('etymology');
  const examplesListEl = document.getElementById('examplesList');
  const relatedSectionEl = document.getElementById('relatedSection');
  const relatedWordsEl = document.getElementById('relatedWords');
  const categoryEl = document.getElementById('category');
  const difficultyEl = document.getElementById('difficulty');

  if (wordEl) wordEl.textContent = currentWord.word;
  if (posEl) posEl.textContent = currentWord.pos;
  if (definitionEl) definitionEl.textContent = currentWord.definition;
  
  if (etymologyEl) {
    etymologyEl.textContent = currentWord.etymology || '';
    etymologyEl.style.display = currentWord.etymology ? 'block' : 'none';
  }

  if (examplesListEl) {
    examplesListEl.innerHTML = currentWord.examples
      .map(ex => `<li>${ex}</li>`)
      .join('');
  }

  if (relatedSectionEl && relatedWordsEl) {
    if (currentWord.related && currentWord.related.length > 0) {
      relatedSectionEl.style.display = 'block';
      relatedWordsEl.innerHTML = currentWord.related
        .map(w => `<span>${w}</span>`)
        .join('');
    } else {
      relatedSectionEl.style.display = 'none';
    }
  }

  if (categoryEl) {
    categoryEl.textContent = currentWord.category || 'literary';
  }

  if (difficultyEl) {
    const diff = currentWord.difficulty || 2;
    difficultyEl.textContent = '★'.repeat(diff) + '☆'.repeat(5 - diff);
  }

  // Update stats
  const streakEl = document.getElementById('streak');
  const pointsEl = document.getElementById('points');

  if (streakEl) streakEl.textContent = String(state.streak || 0);
  if (pointsEl) pointsEl.textContent = String(state.points || 0);

  // Update used state
  const sentenceSectionEl = document.getElementById('sentenceSection');
  const usedBadgeEl = document.getElementById('usedBadge');

  if (state.usedToday) {
    if (sentenceSectionEl) sentenceSectionEl.style.display = 'none';
    if (usedBadgeEl) usedBadgeEl.style.display = 'flex';
  } else {
    if (sentenceSectionEl) sentenceSectionEl.style.display = 'block';
    if (usedBadgeEl) usedBadgeEl.style.display = 'none';
  }

  // Update weekly challenge
  updateWeeklyProgress();
}

/**
 * Apply theme based on settings
 */
function applyTheme() {
  const theme = state.theme || 'system';
  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  document.body.classList.toggle('dark', isDark);
  
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  }
}

/**
 * Update weekly challenge progress
 */
function updateWeeklyProgress() {
  const weeklyFillEl = document.getElementById('weeklyFill');
  const weeklyTextEl = document.getElementById('weeklyText');

  if (state.weeklyChallenge) {
    const progress = state.weeklyChallenge.progress;
    const goal = state.weeklyChallenge.goal;
    const percent = Math.min(100, (progress / goal) * 100);

    if (weeklyFillEl) weeklyFillEl.style.width = `${percent}%`;
    if (weeklyTextEl) weeklyTextEl.textContent = `${progress} / ${goal} words`;
  } else {
    // Default challenge
    const wordsUsed = (state.wordHistory || []).filter(w => w.wasUsed).length % 5;
    if (weeklyFillEl) weeklyFillEl.style.width = `${(wordsUsed / 5) * 100}%`;
    if (weeklyTextEl) weeklyTextEl.textContent = `${wordsUsed} / 5 words`;
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click', toggleTheme);

  // Pronounce button
  const pronounceBtn = document.getElementById('pronounceBtn');
  pronounceBtn?.addEventListener('click', pronounceWord);

  // Sentence input
  const sentenceInput = document.getElementById('sentence') as HTMLTextAreaElement;
  sentenceInput?.addEventListener('input', handleSentenceInput);

  // Mark used button
  const markUsedBtn = document.getElementById('markUsedBtn');
  markUsedBtn?.addEventListener('click', markAsUsed);

  // Footer links
  const historyLink = document.getElementById('historyLink');
  historyLink?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  const achievementsLink = document.getElementById('achievementsLink');
  achievementsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  const optionsLink = document.getElementById('optionsLink');
  optionsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
}

/**
 * Toggle theme
 */
function toggleTheme() {
  const currentTheme = state.theme || 'system';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  chrome.storage.sync.set({ theme: newTheme });
  state.theme = newTheme;
  applyTheme();
}

/**
 * Pronounce the current word
 */
function pronounceWord() {
  if (!currentWord) return;
  chrome.runtime.sendMessage({ type: 'PRONOUNCE', word: currentWord.word });
}

/**
 * Handle sentence input
 */
function handleSentenceInput(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  const sentence = textarea.value;
  const validationStatus = document.getElementById('validationStatus');
  const markUsedBtn = document.getElementById('markUsedBtn') as HTMLButtonElement;

  if (!currentWord || !validationStatus || !markUsedBtn) return;

  if (sentence.trim().length === 0) {
    validationStatus.textContent = '';
    validationStatus.className = 'validation-status';
    markUsedBtn.disabled = true;
    return;
  }

  const isValid = validateSentence(sentence, currentWord.word);

  if (isValid) {
    validationStatus.textContent = '✓ Word detected in sentence';
    validationStatus.className = 'validation-status valid';
    markUsedBtn.disabled = false;
  } else {
    validationStatus.textContent = `Include "${currentWord.word}" in your sentence`;
    validationStatus.className = 'validation-status invalid';
    markUsedBtn.disabled = true;
  }
}

/**
 * Mark word as used
 */
async function markAsUsed() {
  if (!currentWord) return;

  const sentenceInput = document.getElementById('sentence') as HTMLTextAreaElement;
  const sentence = sentenceInput?.value || '';

  // Send message to background to handle points, achievements, etc.
  chrome.runtime.sendMessage({
    type: 'MARK_USED',
    sentence,
    wordIndex: state.currentWordIndex,
  });
}

// Initialize
init();

