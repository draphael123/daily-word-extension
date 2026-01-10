/**
 * Daily Word Popup Script
 */

import type { WordEntry, StorageState, Achievement } from '../types';
import { DEFAULT_STORAGE_STATE, ALL_ACHIEVEMENTS } from '../types';
import { getLocalDayKey } from '../utils/date';
import { validateSentence } from '../utils/validation';
import { getStorageState, setStorageState } from '../utils/storage';

let words: WordEntry[] = [];
let currentWord: WordEntry | null = null;
let state: StorageState = DEFAULT_STORAGE_STATE;

/**
 * Initialize popup
 */
async function init() {
  // Load words
  const response = await fetch(chrome.runtime.getURL('src/data/words.json'));
  words = await response.json();

  // Load state
  state = await getStorageState();

  // Check if day changed
  const today = getLocalDayKey();
  if (state.currentDayKey !== today) {
    // Request background to update
    chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
      if (response) {
        state = { ...state, ...response };
        render();
      }
    });
  } else {
    render();
  }

  setupEventListeners();
  
  // Listen for storage changes
  chrome.storage.onChanged.addListener(handleStorageChange);
}

function handleStorageChange(changes: { [key: string]: chrome.storage.StorageChange }) {
  for (const [key, { newValue }] of Object.entries(changes)) {
    (state as any)[key] = newValue;
  }
  render();
}

/**
 * Render the popup
 */
function render() {
  applyTheme();

  // Get current word
  currentWord = words[state.currentWordIndex] || words[0];
  if (!currentWord) return;

  // Update word display
  setText('word', currentWord.word);
  setText('pos', currentWord.pos);
  setText('definition', currentWord.definition);
  setText('category', currentWord.category || 'literary');
  
  const difficultyEl = document.getElementById('difficulty');
  if (difficultyEl) {
    const diff = currentWord.difficulty || 2;
    difficultyEl.textContent = '★'.repeat(diff) + '☆'.repeat(5 - diff);
  }

  const etymologyEl = document.getElementById('etymology');
  if (etymologyEl) {
    etymologyEl.textContent = currentWord.etymology || '';
    etymologyEl.style.display = currentWord.etymology ? 'block' : 'none';
  }

  const examplesEl = document.getElementById('examplesList');
  if (examplesEl) {
    examplesEl.innerHTML = currentWord.examples.map(ex => `<li>${ex}</li>`).join('');
  }

  const relatedSection = document.getElementById('relatedSection');
  const relatedWords = document.getElementById('relatedWords');
  if (relatedSection && relatedWords) {
    if (currentWord.related && currentWord.related.length > 0) {
      relatedSection.style.display = 'block';
      relatedWords.innerHTML = currentWord.related.map(w => `<span>${w}</span>`).join('');
    } else {
      relatedSection.style.display = 'none';
    }
  }

  // Update stats
  setText('streak', String(state.streak || 0));
  setText('points', String(state.points || 0));
  setText('wordsLearned', String(state.wordHistory?.length || 0));
  setText('achievementCount', String(state.achievements?.length || 0));

  // Update favorite button
  const historyEntry = state.wordHistory?.find(h => h.wordIndex === state.currentWordIndex);
  const favoriteIcon = document.getElementById('favoriteIcon');
  if (favoriteIcon) {
    favoriteIcon.textContent = historyEntry?.isFavorite ? '❤️' : '🤍';
  }

  // Update notes
  const notesEl = document.getElementById('notes') as HTMLTextAreaElement;
  if (notesEl && historyEntry?.notes) {
    notesEl.value = historyEntry.notes;
  }

  // Update used state
  const sentenceSection = document.getElementById('sentenceSection');
  const usedBadge = document.getElementById('usedBadge');

  if (state.usedToday) {
    if (sentenceSection) sentenceSection.style.display = 'none';
    if (usedBadge) usedBadge.style.display = 'flex';
  } else {
    if (sentenceSection) sentenceSection.style.display = 'block';
    if (usedBadge) usedBadge.style.display = 'none';
  }
}

function setText(id: string, text: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

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
 * Setup event listeners
 */
function setupEventListeners() {
  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

  // Options button
  document.getElementById('optionsBtn')?.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Pronounce
  document.getElementById('pronounceBtn')?.addEventListener('click', () => {
    if (currentWord) {
      chrome.runtime.sendMessage({ type: 'PRONOUNCE', word: currentWord.word });
    }
  });

  // Favorite
  document.getElementById('favoriteBtn')?.addEventListener('click', toggleFavorite);

  // Share
  document.getElementById('shareBtn')?.addEventListener('click', shareWord);

  // Sentence input
  document.getElementById('sentence')?.addEventListener('input', handleSentenceInput);

  // Mark used
  document.getElementById('markUsedBtn')?.addEventListener('click', markAsUsed);

  // Save notes
  document.getElementById('saveNotesBtn')?.addEventListener('click', saveNotes);

  // Footer buttons
  document.getElementById('historyBtn')?.addEventListener('click', showHistoryModal);
  document.getElementById('achievementsBtn')?.addEventListener('click', showAchievementsModal);
  document.getElementById('challengeBtn')?.addEventListener('click', showChallengeModal);

  // Modal close buttons
  document.getElementById('closeHistoryModal')?.addEventListener('click', () => hideModal('historyModal'));
  document.getElementById('closeAchievementsModal')?.addEventListener('click', () => hideModal('achievementsModal'));
  document.getElementById('closeChallengeModal')?.addEventListener('click', () => hideModal('challengeModal'));

  // Export
  document.getElementById('exportBtn')?.addEventListener('click', exportData);

  // History filters
  document.getElementById('historySearch')?.addEventListener('input', filterHistory);
  document.getElementById('historyFilter')?.addEventListener('change', filterHistory);

  // Close modals on backdrop click
  ['historyModal', 'achievementsModal', 'challengeModal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) hideModal(id);
    });
  });
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  setStorageState({ theme: newTheme });
  state.theme = newTheme;
  applyTheme();
}

async function toggleFavorite() {
  chrome.runtime.sendMessage({ 
    type: 'TOGGLE_FAVORITE', 
    wordIndex: state.currentWordIndex 
  });
}

function shareWord() {
  if (!currentWord) return;
  
  const text = `📚 Today's word: ${currentWord.word} (${currentWord.pos})\n\n"${currentWord.definition}"\n\nLearn a new word every day with Daily Word!`;
  
  // Copy to clipboard
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('shareBtn');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = original; }, 1500);
    }
  });
}

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
    validationStatus.textContent = '✓ Word found!';
    validationStatus.className = 'validation-status valid';
    markUsedBtn.disabled = false;
  } else {
    validationStatus.textContent = `Include "${currentWord.word}"`;
    validationStatus.className = 'validation-status invalid';
    markUsedBtn.disabled = true;
  }
}

function markAsUsed() {
  const sentenceInput = document.getElementById('sentence') as HTMLTextAreaElement;
  const sentence = sentenceInput?.value || '';

  chrome.runtime.sendMessage({
    type: 'MARK_USED',
    sentence,
    wordIndex: state.currentWordIndex,
  });
}

async function saveNotes() {
  const notesEl = document.getElementById('notes') as HTMLTextAreaElement;
  if (!notesEl) return;

  chrome.runtime.sendMessage({
    type: 'ADD_NOTE',
    wordIndex: state.currentWordIndex,
    note: notesEl.value,
  });

  const btn = document.getElementById('saveNotesBtn');
  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Saved!';
    setTimeout(() => { btn.textContent = original; }, 1500);
  }
}

function showModal(id: string) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}

function hideModal(id: string) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

function showHistoryModal() {
  renderHistoryList();
  showModal('historyModal');
}

function renderHistoryList(filter?: string, search?: string) {
  const list = document.getElementById('historyList');
  if (!list) return;

  let history = state.wordHistory || [];

  // Apply filters
  if (filter === 'used') {
    history = history.filter(h => h.wasUsed);
  } else if (filter === 'favorites') {
    history = history.filter(h => h.isFavorite);
  }

  // Apply search
  if (search) {
    const searchLower = search.toLowerCase();
    history = history.filter(h => {
      const word = words[h.wordIndex];
      return word?.word.toLowerCase().includes(searchLower);
    });
  }

  // Sort by date descending
  history = [...history].sort((a, b) => 
    new Date(b.dateShown).getTime() - new Date(a.dateShown).getTime()
  );

  if (history.length === 0) {
    list.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No words found</p>';
    return;
  }

  list.innerHTML = history.slice(0, 50).map(h => {
    const word = words[h.wordIndex];
    if (!word) return '';
    
    return `
      <div class="history-item">
        <span class="history-word">${word.word}</span>
        <div class="history-badges">
          ${h.wasUsed ? '<span class="history-badge">✅</span>' : ''}
          ${h.isFavorite ? '<span class="history-badge">❤️</span>' : ''}
          ${h.notes ? '<span class="history-badge">📝</span>' : ''}
        </div>
        <span class="history-date">${h.dateShown}</span>
      </div>
    `;
  }).join('');
}

function filterHistory() {
  const search = (document.getElementById('historySearch') as HTMLInputElement)?.value || '';
  const filter = (document.getElementById('historyFilter') as HTMLSelectElement)?.value || 'all';
  renderHistoryList(filter, search);
}

function showAchievementsModal() {
  const grid = document.getElementById('achievementsGrid');
  if (!grid) return;

  const unlockedIds = new Set((state.achievements || []).map(a => a.id));

  grid.innerHTML = ALL_ACHIEVEMENTS.map(achievement => {
    const isUnlocked = unlockedIds.has(achievement.id);
    return `
      <div class="achievement ${isUnlocked ? '' : 'locked'}" title="${achievement.description}">
        <span class="achievement-icon">${achievement.icon}</span>
        <span class="achievement-name">${achievement.name}</span>
      </div>
    `;
  }).join('');

  showModal('achievementsModal');
}

function showChallengeModal() {
  const challenge = state.weeklyChallenge;
  const fill = document.getElementById('challengeFill');
  const text = document.getElementById('challengeText');

  if (challenge && fill && text) {
    const percent = Math.min(100, (challenge.progress / challenge.goal) * 100);
    fill.style.width = `${percent}%`;
    text.textContent = `${challenge.progress} / ${challenge.goal} words used`;
  }

  showModal('challengeModal');
}

async function exportData() {
  chrome.runtime.sendMessage({ type: 'EXPORT_DATA' }, (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-word-export-${getLocalDayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Initialize
init();
