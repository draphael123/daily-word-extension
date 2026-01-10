/**
 * Daily Word Options Page
 */

import type { StorageState } from '../types';
import { DEFAULT_STORAGE_STATE } from '../types';
import { getStorageState, setStorageState, clearStorage } from '../utils/storage';
import { getLocalDayKey } from '../utils/date';

let state: StorageState = DEFAULT_STORAGE_STATE;

async function init() {
  state = await getStorageState();
  render();
  setupEventListeners();

  chrome.storage.onChanged.addListener((changes) => {
    for (const [key, { newValue }] of Object.entries(changes)) {
      (state as any)[key] = newValue;
    }
    render();
  });
}

function render() {
  applyTheme();
  renderStats();
  renderCalendar();
  renderSettings();
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

function renderStats() {
  const history = state.wordHistory || [];
  const wordsUsed = history.filter(h => h.wasUsed).length;

  setText('streak', String(state.streak || 0));
  setText('points', String(state.points || 0));
  setText('wordsLearned', String(history.length));
  setText('wordsUsed', String(wordsUsed));
  setText('achievements', String(state.achievements?.length || 0));
  setText('autoDetected', String(state.autoDetectedUsages?.length || 0));
}

function renderCalendar() {
  const calendar = document.getElementById('streakCalendar');
  if (!calendar) return;

  const usageDays = new Set(state.usageDays || []);
  const today = new Date();
  const days: string[] = [];

  // Show last 35 days (5 weeks)
  for (let i = 34; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }

  // Add 7 days header
  const headers = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const firstDayOfWeek = new Date(days[0]).getDay();
  
  let html = headers.map(h => `<div class="calendar-day" style="font-weight: 600;">${h}</div>`).join('');
  
  // Add empty cells for alignment
  for (let i = 0; i < firstDayOfWeek; i++) {
    html += '<div class="calendar-day"></div>';
  }

  const todayKey = getLocalDayKey();

  days.forEach(day => {
    const isUsed = usageDays.has(day);
    const isToday = day === todayKey;
    const isFuture = day > todayKey;
    
    let classes = 'calendar-day';
    if (isUsed) classes += ' used';
    if (isToday) classes += ' today';
    if (isFuture) classes += ' future';
    
    const dayNum = parseInt(day.split('-')[2]);
    html += `<div class="${classes}" title="${day}">${dayNum}</div>`;
  });

  calendar.innerHTML = html;
}

function renderSettings() {
  // Theme
  const themeSelect = document.getElementById('themeSelect') as HTMLSelectElement;
  if (themeSelect) themeSelect.value = state.theme || 'system';

  // Notifications
  const notificationsEnabled = document.getElementById('notificationsEnabled') as HTMLInputElement;
  if (notificationsEnabled) notificationsEnabled.checked = state.notificationsEnabled ?? true;

  const morningReminder = document.getElementById('morningReminder') as HTMLInputElement;
  if (morningReminder) morningReminder.checked = state.reminders?.morningReminder ?? false;

  const morningTime = document.getElementById('morningTime') as HTMLInputElement;
  if (morningTime) morningTime.value = state.reminders?.morningTime ?? '08:00';

  const eveningReminder = document.getElementById('eveningReminder') as HTMLInputElement;
  if (eveningReminder) eveningReminder.checked = state.reminders?.eveningReminder ?? false;

  const eveningTime = document.getElementById('eveningTime') as HTMLInputElement;
  if (eveningTime) eveningTime.value = state.reminders?.eveningTime ?? '20:00';

  // Learning
  const wordsPerDay = document.getElementById('wordsPerDay') as HTMLSelectElement;
  if (wordsPerDay) wordsPerDay.value = String(state.wordsPerDay || 1);

  const difficultyPreference = document.getElementById('difficultyPreference') as HTMLSelectElement;
  if (difficultyPreference) difficultyPreference.value = String(state.difficultyPreference || 0);

  // Website Integration
  const autoDetectionEnabled = document.getElementById('autoDetectionEnabled') as HTMLInputElement;
  if (autoDetectionEnabled) autoDetectionEnabled.checked = state.autoDetectionEnabled ?? true;

  const highlightWordsEnabled = document.getElementById('highlightWordsEnabled') as HTMLInputElement;
  if (highlightWordsEnabled) highlightWordsEnabled.checked = state.highlightWordsEnabled ?? true;

  const newTabEnabled = document.getElementById('newTabEnabled') as HTMLInputElement;
  if (newTabEnabled) newTabEnabled.checked = state.newTabEnabled ?? true;
}

function setText(id: string, text: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setupEventListeners() {
  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    setStorageState({ theme: newTheme });
  });

  // Theme select
  document.getElementById('themeSelect')?.addEventListener('change', (e) => {
    const value = (e.target as HTMLSelectElement).value as 'light' | 'dark' | 'system';
    setStorageState({ theme: value });
  });

  // Notifications
  document.getElementById('notificationsEnabled')?.addEventListener('change', (e) => {
    setStorageState({ notificationsEnabled: (e.target as HTMLInputElement).checked });
  });

  // Reminders
  const reminderInputs = ['morningReminder', 'morningTime', 'eveningReminder', 'eveningTime'];
  reminderInputs.forEach(id => {
    document.getElementById(id)?.addEventListener('change', saveReminders);
  });

  // Learning settings
  document.getElementById('wordsPerDay')?.addEventListener('change', (e) => {
    setStorageState({ wordsPerDay: parseInt((e.target as HTMLSelectElement).value) });
  });

  document.getElementById('difficultyPreference')?.addEventListener('change', (e) => {
    setStorageState({ difficultyPreference: parseInt((e.target as HTMLSelectElement).value) });
  });

  // Website Integration
  document.getElementById('autoDetectionEnabled')?.addEventListener('change', (e) => {
    setStorageState({ autoDetectionEnabled: (e.target as HTMLInputElement).checked });
  });

  document.getElementById('highlightWordsEnabled')?.addEventListener('change', (e) => {
    setStorageState({ highlightWordsEnabled: (e.target as HTMLInputElement).checked });
  });

  document.getElementById('newTabEnabled')?.addEventListener('change', (e) => {
    setStorageState({ newTabEnabled: (e.target as HTMLInputElement).checked });
  });

  // Export
  document.getElementById('exportBtn')?.addEventListener('click', exportData);

  // Reset
  document.getElementById('resetBtn')?.addEventListener('click', resetData);
}

function saveReminders() {
  const morningReminder = (document.getElementById('morningReminder') as HTMLInputElement)?.checked ?? false;
  const morningTime = (document.getElementById('morningTime') as HTMLInputElement)?.value ?? '08:00';
  const eveningReminder = (document.getElementById('eveningReminder') as HTMLInputElement)?.checked ?? false;
  const eveningTime = (document.getElementById('eveningTime') as HTMLInputElement)?.value ?? '20:00';

  setStorageState({
    reminders: {
      morningReminder,
      morningTime,
      eveningReminder,
      eveningTime,
      weeklySummary: state.reminders?.weeklySummary ?? true,
    }
  });
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

    const btn = document.getElementById('exportBtn');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '✓ Exported!';
      setTimeout(() => { btn.textContent = original; }, 2000);
    }
  });
}

async function resetData() {
  const confirmed = confirm(
    'Are you sure you want to reset all data?\n\n' +
    'This will delete:\n' +
    '• Your streak\n' +
    '• All points\n' +
    '• Word history\n' +
    '• Achievements\n' +
    '• Personal notes\n\n' +
    'This cannot be undone!'
  );

  if (confirmed) {
    await clearStorage();
    window.location.reload();
  }
}

init();
