/**
 * Daily Word Content Script
 * Handles auto-detection of word usage and highlighting learned words on pages
 */

import type { WordEntry, StorageState } from '../types';

interface ContentState {
  words: WordEntry[];
  learnedWordIndices: Set<number>;
  currentWordIndex: number;
  autoDetectionEnabled: boolean;
  highlightWordsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  detectedOnThisPage: Set<number>;
}

const state: ContentState = {
  words: [],
  learnedWordIndices: new Set(),
  currentWordIndex: -1,
  autoDetectionEnabled: true,
  highlightWordsEnabled: true,
  theme: 'system',
  detectedOnThisPage: new Set(),
};

let tooltip: HTMLElement | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Initialize the content script
 */
async function init() {
  try {
    // Load words data
    const wordsUrl = chrome.runtime.getURL('src/data/words.json');
    const response = await fetch(wordsUrl);
    state.words = await response.json();

    // Load storage state
    const storage = await chrome.storage.sync.get([
      'wordHistory',
      'currentWordIndex',
      'autoDetectionEnabled',
      'highlightWordsEnabled',
      'theme',
    ]) as Partial<StorageState>;

    state.currentWordIndex = storage.currentWordIndex ?? -1;
    state.autoDetectionEnabled = storage.autoDetectionEnabled ?? true;
    state.highlightWordsEnabled = storage.highlightWordsEnabled ?? true;
    state.theme = storage.theme ?? 'system';

    // Build set of learned word indices
    if (storage.wordHistory) {
      for (const entry of storage.wordHistory) {
        state.learnedWordIndices.add(entry.wordIndex);
      }
    }

    // Add current word
    if (state.currentWordIndex >= 0) {
      state.learnedWordIndices.add(state.currentWordIndex);
    }

    // Start features
    if (state.highlightWordsEnabled) {
      highlightWords();
      observeDOM();
    }

    if (state.autoDetectionEnabled) {
      setupAutoDetection();
    }

    // Listen for storage changes
    chrome.storage.onChanged.addListener(handleStorageChange);
  } catch (error) {
    console.error('[Daily Word] Content script init error:', error);
  }
}

/**
 * Handle storage changes
 */
function handleStorageChange(changes: { [key: string]: chrome.storage.StorageChange }) {
  if (changes.highlightWordsEnabled) {
    state.highlightWordsEnabled = changes.highlightWordsEnabled.newValue;
    if (state.highlightWordsEnabled) {
      highlightWords();
    } else {
      removeHighlights();
    }
  }

  if (changes.autoDetectionEnabled) {
    state.autoDetectionEnabled = changes.autoDetectionEnabled.newValue;
  }

  if (changes.currentWordIndex) {
    state.currentWordIndex = changes.currentWordIndex.newValue;
    state.learnedWordIndices.add(state.currentWordIndex);
    if (state.highlightWordsEnabled) {
      highlightWords();
    }
  }

  if (changes.theme) {
    state.theme = changes.theme.newValue;
  }
}

/**
 * Highlight learned vocabulary words in the page
 */
function highlightWords() {
  if (state.words.length === 0 || state.learnedWordIndices.size === 0) return;

  const wordsToHighlight = Array.from(state.learnedWordIndices)
    .map(idx => state.words[idx])
    .filter(Boolean)
    .map(w => w.word.toLowerCase());

  if (wordsToHighlight.length === 0) return;

  // Create regex pattern for all words
  const pattern = new RegExp(
    `\\b(${wordsToHighlight.map(escapeRegExp).join('|')})\\b`,
    'gi'
  );

  // Walk text nodes and highlight matches
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip script, style, and already processed elements
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        
        const tagName = parent.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'textarea', 'input'].includes(tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        
        if (parent.classList.contains('daily-word-highlight')) {
          return NodeFilter.FILTER_REJECT;
        }

        if (parent.isContentEditable) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const nodesToProcess: Text[] = [];
  let node: Node | null;
  while (node = walker.nextNode()) {
    if (pattern.test(node.textContent || '')) {
      nodesToProcess.push(node as Text);
    }
  }

  // Process nodes (limit to avoid performance issues)
  const maxNodes = 200;
  for (let i = 0; i < Math.min(nodesToProcess.length, maxNodes); i++) {
    highlightTextNode(nodesToProcess[i], pattern);
  }
}

/**
 * Highlight matches in a text node
 */
function highlightTextNode(textNode: Text, pattern: RegExp) {
  const text = textNode.textContent || '';
  const matches = [...text.matchAll(new RegExp(pattern.source, 'gi'))];
  
  if (matches.length === 0) return;

  const fragment = document.createDocumentFragment();
  let lastIndex = 0;

  for (const match of matches) {
    const matchStart = match.index!;
    const matchEnd = matchStart + match[0].length;

    // Add text before match
    if (matchStart > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, matchStart)));
    }

    // Add highlighted match
    const span = document.createElement('span');
    span.className = 'daily-word-highlight';
    span.textContent = match[0];
    span.dataset.word = match[0].toLowerCase();
    span.addEventListener('click', showTooltip);
    fragment.appendChild(span);

    lastIndex = matchEnd;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  textNode.replaceWith(fragment);
}

/**
 * Remove all highlights
 */
function removeHighlights() {
  const highlights = document.querySelectorAll('.daily-word-highlight');
  highlights.forEach(el => {
    const text = el.textContent || '';
    el.replaceWith(document.createTextNode(text));
  });
}

/**
 * Show tooltip with word definition
 */
function showTooltip(event: Event) {
  const target = event.target as HTMLElement;
  const wordText = target.dataset.word?.toLowerCase();
  if (!wordText) return;

  // Find word data
  const wordEntry = state.words.find(w => w.word.toLowerCase() === wordText);
  if (!wordEntry) return;

  // Remove existing tooltip
  hideTooltip();

  // Create tooltip
  tooltip = document.createElement('div');
  tooltip.className = 'daily-word-tooltip';
  
  // Apply theme
  const isDark = state.theme === 'dark' || 
    (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    tooltip.classList.add('dark');
  }

  tooltip.innerHTML = `
    <button class="daily-word-tooltip-close">×</button>
    <div class="daily-word-tooltip-header">
      <h3 class="daily-word-tooltip-word">${wordEntry.word}</h3>
      <span class="daily-word-tooltip-pos">${wordEntry.pos}</span>
      <span class="daily-word-tooltip-pronunciation" title="Pronounce">🔊</span>
    </div>
    <p class="daily-word-tooltip-definition">${wordEntry.definition}</p>
    ${wordEntry.etymology ? `<p class="daily-word-tooltip-etymology">${wordEntry.etymology}</p>` : ''}
    <ul class="daily-word-tooltip-examples">
      ${wordEntry.examples.map(ex => `<li>${ex}</li>`).join('')}
    </ul>
    <span class="daily-word-tooltip-badge">📚 Daily Word</span>
  `;

  // Position tooltip
  const rect = target.getBoundingClientRect();
  tooltip.style.left = `${Math.min(rect.left, window.innerWidth - 380)}px`;
  tooltip.style.top = `${rect.bottom + 10}px`;

  // If tooltip would go below viewport, show above
  if (rect.bottom + 250 > window.innerHeight) {
    tooltip.style.top = `${rect.top - 10}px`;
    tooltip.style.transform = 'translateY(-100%)';
  }

  document.body.appendChild(tooltip);

  // Add event listeners
  tooltip.querySelector('.daily-word-tooltip-close')?.addEventListener('click', hideTooltip);
  tooltip.querySelector('.daily-word-tooltip-pronunciation')?.addEventListener('click', () => {
    pronounceWord(wordEntry.word);
  });

  // Close on click outside
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 100);
}

/**
 * Hide tooltip
 */
function hideTooltip() {
  if (tooltip) {
    tooltip.remove();
    tooltip = null;
  }
  document.removeEventListener('click', handleOutsideClick);
}

/**
 * Handle click outside tooltip
 */
function handleOutsideClick(event: Event) {
  if (tooltip && !tooltip.contains(event.target as Node)) {
    hideTooltip();
  }
}

/**
 * Pronounce a word using TTS
 */
function pronounceWord(word: string) {
  chrome.runtime.sendMessage({ type: 'PRONOUNCE', word });
}

/**
 * Observe DOM for dynamic content
 */
function observeDOM() {
  const observer = new MutationObserver((mutations) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (state.highlightWordsEnabled) {
        highlightWords();
      }
    }, 500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/**
 * Setup auto-detection of word usage in input fields
 */
function setupAutoDetection() {
  // Listen for input events
  document.addEventListener('input', handleInput, true);
  document.addEventListener('keydown', handleKeyDown, true);
}

/**
 * Handle input events for auto-detection
 */
function handleInput(event: Event) {
  if (!state.autoDetectionEnabled) return;
  
  const target = event.target as HTMLElement;
  if (!isTextInput(target)) return;

  // Debounce
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    checkForWordUsage(target);
  }, 1000);
}

/**
 * Handle keydown for immediate detection on Enter/Tab
 */
function handleKeyDown(event: KeyboardEvent) {
  if (!state.autoDetectionEnabled) return;
  if (event.key !== 'Enter' && event.key !== 'Tab') return;

  const target = event.target as HTMLElement;
  if (!isTextInput(target)) return;

  checkForWordUsage(target);
}

/**
 * Check if element is a text input
 */
function isTextInput(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  if (tagName === 'textarea') return true;
  if (tagName === 'input') {
    const type = (element as HTMLInputElement).type.toLowerCase();
    return ['text', 'search', 'email', 'url'].includes(type);
  }
  if (element.isContentEditable) return true;
  return false;
}

/**
 * Check input content for word usage
 */
function checkForWordUsage(element: HTMLElement) {
  const text = getInputText(element);
  if (!text || text.length < 10) return;

  // Check current word first
  if (state.currentWordIndex >= 0) {
    const currentWord = state.words[state.currentWordIndex];
    if (currentWord && !state.detectedOnThisPage.has(state.currentWordIndex)) {
      if (wordUsedInText(currentWord.word, text)) {
        state.detectedOnThisPage.add(state.currentWordIndex);
        reportWordDetected(state.currentWordIndex, text);
        return;
      }
    }
  }

  // Check learned words
  for (const idx of state.learnedWordIndices) {
    if (state.detectedOnThisPage.has(idx)) continue;
    
    const word = state.words[idx];
    if (word && wordUsedInText(word.word, text)) {
      state.detectedOnThisPage.add(idx);
      reportWordDetected(idx, text);
      break; // Only detect one word at a time
    }
  }
}

/**
 * Get text from input element
 */
function getInputText(element: HTMLElement): string {
  if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
    return (element as HTMLInputElement | HTMLTextAreaElement).value;
  }
  return element.textContent || '';
}

/**
 * Check if word is used in text
 */
function wordUsedInText(word: string, text: string): boolean {
  const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'i');
  return pattern.test(text);
}

/**
 * Report word detection to background script
 */
function reportWordDetected(wordIndex: number, context: string) {
  const word = state.words[wordIndex];
  
  chrome.runtime.sendMessage({
    type: 'WORD_DETECTED',
    wordIndex,
    word: word.word,
    url: window.location.href,
    context: context.slice(0, 200),
  });

  // Show detection notification
  showDetectionNotification(word.word);
}

/**
 * Show in-page notification for word detection
 */
function showDetectionNotification(word: string) {
  const notification = document.createElement('div');
  notification.className = 'daily-word-detected';
  notification.innerHTML = `
    <span class="daily-word-detected-icon">✨</span>
    <span class="daily-word-detected-text">
      <strong>Word Detected!</strong>
      You used "${word}" naturally
    </span>
    <span class="daily-word-detected-points">+15 pts</span>
  `;

  document.body.appendChild(notification);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'dailyWordSlideIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

