/**
 * Daily Word Service Worker
 * Handles daily rotation, context menus, TTS, achievements, and more
 */

import { getLocalDayKey, getMinutesUntilMidnight } from '../utils/date';
import { generateShuffledIndices } from '../utils/shuffle';
import { getStorageState, setStorageState } from '../utils/storage';
import { 
  DEFAULT_STORAGE_STATE, 
  ALL_ACHIEVEMENTS, 
  POINTS,
  type StorageState,
  type WordHistoryEntry,
  type Achievement,
  type WeeklyChallenge,
} from '../types';
import words from '../data/words.json';

const ALARM_NAME = 'daily-word-rotation';
const MORNING_ALARM = 'morning-reminder';
const EVENING_ALARM = 'evening-reminder';
const WORD_COUNT = words.length;

// ============ WORD ROTATION ============

/**
 * Initialize or advance to the next word
 */
async function rotateWordIfNeeded(): Promise<void> {
  const state = await getStorageState();
  const todayKey = getLocalDayKey();

  let shuffledOrder = state.shuffledOrder ?? [];
  let pointer = state.pointer ?? 0;

  if (!shuffledOrder.length || shuffledOrder.length !== WORD_COUNT) {
    shuffledOrder = generateShuffledIndices(WORD_COUNT);
    pointer = 0;
    await setStorageState({
      shuffledOrder,
      pointer,
      currentDayKey: todayKey,
      currentWordIndex: shuffledOrder[pointer],
      usedToday: false,
    });
    return;
  }

  if (state.currentDayKey !== todayKey) {
    pointer = (pointer + 1) % WORD_COUNT;

    if (pointer === 0) {
      shuffledOrder = generateShuffledIndices(WORD_COUNT);
    }

    // Check if streak should continue or reset
    let streak = state.streak ?? 0;
    const lastUsedDay = state.lastUsedDay;
    
    if (lastUsedDay) {
      const lastDate = new Date(lastUsedDay);
      const today = new Date(todayKey);
      const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        streak = 0; // Reset streak if more than 1 day gap
      }
    }

    // Add previous word to history if not already
    await addToHistory(state.currentWordIndex, state.currentDayKey, state.usedToday);

    await setStorageState({
      shuffledOrder,
      pointer,
      currentDayKey: todayKey,
      currentWordIndex: shuffledOrder[pointer],
      usedToday: false,
      streak,
    });

    // Check and update weekly challenge
    await updateWeeklyChallenge();
  }
}

/**
 * Add a word to history
 */
async function addToHistory(wordIndex: number, dateShown: string, wasUsed: boolean): Promise<void> {
  const state = await getStorageState();
  const history = state.wordHistory ?? [];
  
  // Check if already in history
  const existing = history.find(h => h.wordIndex === wordIndex && h.dateShown === dateShown);
  if (!existing) {
    history.push({
      wordIndex,
      dateShown,
      wasUsed,
      isFavorite: false,
      reviewCount: 0,
    });
    
    await setStorageState({ wordHistory: history });
  }
}

// ============ ALARMS ============

async function setupDailyAlarm(): Promise<void> {
  await chrome.alarms.clear(ALARM_NAME);

  const delayMinutes = getMinutesUntilMidnight();

  await chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: delayMinutes,
    periodInMinutes: 24 * 60,
  });

  console.log(`[Daily Word] Daily alarm set for ${delayMinutes} minutes from now`);
}

async function setupReminderAlarms(): Promise<void> {
  const state = await getStorageState();
  const reminders = state.reminders ?? DEFAULT_STORAGE_STATE.reminders;

  // Clear existing reminder alarms
  await chrome.alarms.clear(MORNING_ALARM);
  await chrome.alarms.clear(EVENING_ALARM);

  if (reminders.morningReminder) {
    const [hours, minutes] = reminders.morningTime.split(':').map(Number);
    const delay = getMinutesUntilTime(hours, minutes);
    await chrome.alarms.create(MORNING_ALARM, {
      delayInMinutes: delay,
      periodInMinutes: 24 * 60,
    });
  }

  if (reminders.eveningReminder) {
    const [hours, minutes] = reminders.eveningTime.split(':').map(Number);
    const delay = getMinutesUntilTime(hours, minutes);
    await chrome.alarms.create(EVENING_ALARM, {
      delayInMinutes: delay,
      periodInMinutes: 24 * 60,
    });
  }
}

function getMinutesUntilTime(targetHours: number, targetMinutes: number): number {
  const now = new Date();
  const target = new Date();
  target.setHours(targetHours, targetMinutes, 0, 0);
  
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }
  
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60));
}

// ============ CONTEXT MENU ============

function setupContextMenu(): void {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'daily-word-define',
      title: 'Define with Daily Word',
      contexts: ['selection'],
    });
  });
}

// ============ ACHIEVEMENTS & POINTS ============

async function checkAchievements(): Promise<void> {
  const state = await getStorageState();
  const unlockedIds = new Set((state.achievements ?? []).map(a => a.id));
  const newAchievements: Achievement[] = [];

  const streak = state.streak ?? 0;
  const points = state.points ?? 0;
  const history = state.wordHistory ?? [];
  const wordsUsed = history.filter(h => h.wasUsed).length;
  const favorites = history.filter(h => h.isFavorite).length;
  const withNotes = history.filter(h => h.notes).length;
  const challengesCompleted = state.weeklyChallenge?.completed ? 1 : 0;
  const autoDetected = (state.autoDetectedUsages ?? []).length;

  const checks: Array<[string, boolean]> = [
    ['first_word', wordsUsed >= 1],
    ['streak_3', streak >= 3],
    ['streak_7', streak >= 7],
    ['streak_14', streak >= 14],
    ['streak_30', streak >= 30],
    ['streak_100', streak >= 100],
    ['streak_365', streak >= 365],
    ['words_10', wordsUsed >= 10],
    ['words_25', wordsUsed >= 25],
    ['words_50', wordsUsed >= 50],
    ['words_100', wordsUsed >= 100],
    ['words_250', wordsUsed >= 250],
    ['words_500', wordsUsed >= 500],
    ['points_100', points >= 100],
    ['points_500', points >= 500],
    ['points_1000', points >= 1000],
    ['points_5000', points >= 5000],
    ['favorites_5', favorites >= 5],
    ['favorites_25', favorites >= 25],
    ['notes_10', withNotes >= 10],
    ['challenge_1', challengesCompleted >= 1],
    ['auto_detect_1', autoDetected >= 1],
    ['auto_detect_10', autoDetected >= 10],
  ];

  for (const [id, condition] of checks) {
    if (condition && !unlockedIds.has(id)) {
      const achievement = ALL_ACHIEVEMENTS.find(a => a.id === id);
      if (achievement) {
        newAchievements.push({
          ...achievement,
          unlockedAt: new Date().toISOString(),
        });
      }
    }
  }

  if (newAchievements.length > 0) {
    const allAchievements = [...(state.achievements ?? []), ...newAchievements];
    const bonusPoints = newAchievements.length * POINTS.ACHIEVEMENT_UNLOCK;
    
    await setStorageState({ 
      achievements: allAchievements,
      points: (state.points ?? 0) + bonusPoints,
    });

    // Show notification for first new achievement
    const first = newAchievements[0];
    showNotification(
      `${first.icon} Achievement Unlocked!`,
      `${first.name}: ${first.description}`
    );
  }
}

async function addPoints(amount: number): Promise<void> {
  const state = await getStorageState();
  await setStorageState({ points: (state.points ?? 0) + amount });
}

// ============ WEEKLY CHALLENGE ============

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
}

async function updateWeeklyChallenge(): Promise<void> {
  const state = await getStorageState();
  const currentWeek = getWeekStart();
  
  let challenge = state.weeklyChallenge;
  
  if (!challenge || challenge.weekStart !== currentWeek) {
    // New week, new challenge
    challenge = {
      weekStart: currentWeek,
      goal: 5,
      progress: 0,
      completed: false,
    };
    await setStorageState({ weeklyChallenge: challenge });
  }
}

async function incrementWeeklyProgress(): Promise<void> {
  const state = await getStorageState();
  let challenge = state.weeklyChallenge;
  
  if (!challenge) {
    await updateWeeklyChallenge();
    challenge = (await getStorageState()).weeklyChallenge!;
  }

  if (!challenge.completed) {
    challenge.progress++;
    
    if (challenge.progress >= challenge.goal) {
      challenge.completed = true;
      await addPoints(POINTS.WEEKLY_CHALLENGE);
      showNotification('🎯 Weekly Challenge Complete!', 'You used 5 words this week! +50 points');
    }
    
    await setStorageState({ weeklyChallenge: challenge });
  }
}

// ============ NOTIFICATIONS ============

function showNotification(title: string, message: string): void {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: chrome.runtime.getURL('icons/icon-128.png'),
    title,
    message,
  });
}

// ============ TTS ============

function pronounceWord(word: string): void {
  chrome.tts.speak(word, {
    lang: 'en-US',
    rate: 0.9,
  });
}

// ============ MESSAGE HANDLING ============

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_STATE':
      getStorageState().then(state => {
        sendResponse(state);
      });
      return true; // Async response

    case 'MARK_USED':
      handleMarkUsed(message).then(() => {
        sendResponse({ success: true });
      });
      return true;

    case 'WORD_DETECTED':
      handleWordDetected(message).then(() => {
        sendResponse({ success: true });
      });
      return true;

    case 'PRONOUNCE':
      pronounceWord(message.word);
      sendResponse({ success: true });
      break;

    case 'ADD_NOTE':
      handleAddNote(message).then(() => {
        sendResponse({ success: true });
      });
      return true;

    case 'TOGGLE_FAVORITE':
      handleToggleFavorite(message).then(() => {
        sendResponse({ success: true });
      });
      return true;

    case 'EXPORT_DATA':
      handleExportData().then(data => {
        sendResponse(data);
      });
      return true;
  }
});

async function handleMarkUsed(message: { sentence?: string; wordIndex?: number }): Promise<void> {
  const state = await getStorageState();
  const today = getLocalDayKey();
  
  // Calculate streak
  let streak = state.streak ?? 0;
  const lastUsedDay = state.lastUsedDay;
  
  if (lastUsedDay) {
    const lastDate = new Date(lastUsedDay);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++; // Continue streak
    } else if (diffDays > 1) {
      streak = 1; // Reset streak
    }
    // If diffDays === 0, keep same streak (already used today)
  } else {
    streak = 1; // First use
  }

  // Calculate points with streak bonus
  const basePoints = POINTS.MARK_USED;
  const streakBonus = Math.min(streak, 30) * POINTS.STREAK_BONUS_PER_DAY;
  const totalPoints = basePoints + streakBonus;

  // Update storage
  await setStorageState({
    usedToday: true,
    streak,
    lastUsedDay: today,
    points: (state.points ?? 0) + totalPoints,
    usageDays: [...(state.usageDays ?? []), today],
  });

  // Update history
  const history = state.wordHistory ?? [];
  const historyEntry = history.find(
    h => h.wordIndex === state.currentWordIndex && h.dateShown === state.currentDayKey
  );
  
  if (historyEntry) {
    historyEntry.wasUsed = true;
    historyEntry.userSentence = message.sentence;
    await setStorageState({ wordHistory: history });
  } else {
    history.push({
      wordIndex: state.currentWordIndex!,
      dateShown: state.currentDayKey!,
      wasUsed: true,
      userSentence: message.sentence,
      isFavorite: false,
      reviewCount: 0,
    });
    await setStorageState({ wordHistory: history });
  }

  // Increment weekly progress
  await incrementWeeklyProgress();

  // Check achievements
  await checkAchievements();

  // Show notification
  if (state.notificationsEnabled) {
    showNotification(
      '✨ Word Used!',
      `+${totalPoints} points (${streakBonus > 0 ? `includes ${streakBonus} streak bonus` : 'keep going!'})`
    );
  }
}

async function handleWordDetected(message: { 
  wordIndex: number; 
  word: string; 
  url: string; 
  context: string; 
}): Promise<void> {
  const state = await getStorageState();
  
  // Add to auto-detected usages
  const usages = state.autoDetectedUsages ?? [];
  usages.push({
    wordIndex: message.wordIndex,
    date: getLocalDayKey(),
    url: message.url,
    context: message.context,
  });

  // Add points
  const newPoints = (state.points ?? 0) + POINTS.AUTO_DETECT;

  // If it's today's word and not already marked, mark as used
  let updates: Partial<StorageState> = { 
    autoDetectedUsages: usages,
    points: newPoints,
  };

  if (message.wordIndex === state.currentWordIndex && !state.usedToday) {
    updates.usedToday = true;
    updates.lastUsedDay = getLocalDayKey();
  }

  await setStorageState(updates);
  await checkAchievements();
}

async function handleAddNote(message: { wordIndex: number; note: string }): Promise<void> {
  const state = await getStorageState();
  const history = state.wordHistory ?? [];
  
  const entry = history.find(h => h.wordIndex === message.wordIndex);
  if (entry) {
    entry.notes = message.note;
    await setStorageState({ wordHistory: history });
    await addPoints(POINTS.ADD_NOTE);
    await checkAchievements();
  }
}

async function handleToggleFavorite(message: { wordIndex: number }): Promise<void> {
  const state = await getStorageState();
  const history = state.wordHistory ?? [];
  
  const entry = history.find(h => h.wordIndex === message.wordIndex);
  if (entry) {
    entry.isFavorite = !entry.isFavorite;
    await setStorageState({ wordHistory: history });
    await checkAchievements();
  }
}

async function handleExportData(): Promise<object> {
  const state = await getStorageState();
  return {
    exportDate: new Date().toISOString(),
    stats: {
      streak: state.streak,
      points: state.points,
      wordsLearned: state.wordHistory?.length ?? 0,
      wordsUsed: state.wordHistory?.filter(h => h.wasUsed).length ?? 0,
      achievements: state.achievements?.length ?? 0,
    },
    wordHistory: state.wordHistory?.map(h => ({
      word: words[h.wordIndex]?.word,
      dateShown: h.dateShown,
      wasUsed: h.wasUsed,
      isFavorite: h.isFavorite,
      notes: h.notes,
      userSentence: h.userSentence,
    })),
    achievements: state.achievements,
  };
}

// ============ CONTEXT MENU HANDLER ============

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'daily-word-define' && info.selectionText) {
    const selectedWord = info.selectionText.trim().toLowerCase();
    
    // Find the word in our list
    const wordEntry = words.find(w => w.word.toLowerCase() === selectedWord);
    
    if (wordEntry) {
      // Inject content script to show tooltip
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SHOW_DEFINITION',
          word: wordEntry,
        });
      }
    } else {
      // Word not in our vocabulary
      showNotification(
        '📚 Word Not Found',
        `"${info.selectionText}" is not in the Daily Word vocabulary.`
      );
    }
  }
});

// ============ KEYBOARD SHORTCUT HANDLER ============

chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'mark-used') {
    const state = await getStorageState();
    if (!state.usedToday) {
      // Can't mark as used via shortcut without a sentence
      showNotification(
        '📝 Open Daily Word',
        'Press Alt+W to open the popup and type a sentence first.'
      );
    }
  }
});

// ============ ALARM HANDLERS ============

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    console.log('[Daily Word] Daily rotation alarm fired');
    await rotateWordIfNeeded();
  } else if (alarm.name === MORNING_ALARM) {
    const state = await getStorageState();
    const word = words[state.currentWordIndex ?? 0];
    showNotification(
      '🌅 Good Morning!',
      `Today's word is "${word?.word}". Open Daily Word to learn it!`
    );
  } else if (alarm.name === EVENING_ALARM) {
    const state = await getStorageState();
    if (!state.usedToday) {
      const word = words[state.currentWordIndex ?? 0];
      showNotification(
        '🌙 Don\'t Forget!',
        `You haven't used "${word?.word}" today. Keep your streak going!`
      );
    }
  }
});

// ============ INSTALL/STARTUP ============

chrome.runtime.onInstalled.addListener(async () => {
  console.log('[Daily Word] Extension installed/updated');
  await rotateWordIfNeeded();
  await setupDailyAlarm();
  await setupReminderAlarms();
  setupContextMenu();
  await updateWeeklyChallenge();
});

chrome.runtime.onStartup.addListener(async () => {
  console.log('[Daily Word] Browser started');
  await rotateWordIfNeeded();
  await setupDailyAlarm();
  await setupReminderAlarms();
  setupContextMenu();
});

export { rotateWordIfNeeded, setupDailyAlarm };
