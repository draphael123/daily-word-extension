import { getLocalDayKey, getMinutesUntilMidnight } from '../utils/date';
import { generateShuffledIndices } from '../utils/shuffle';
import { getStorageState, setStorageState } from '../utils/storage';
import words from '../data/words.json';

const ALARM_NAME = 'daily-word-rotation';
const WORD_COUNT = words.length;

/**
 * Initialize or advance to the next word
 */
async function rotateWordIfNeeded(): Promise<void> {
  const state = await getStorageState();
  const todayKey = getLocalDayKey();

  // Check if shuffled order exists and is valid
  let shuffledOrder = state.shuffledOrder ?? [];
  let pointer = state.pointer ?? 0;

  if (!shuffledOrder.length || shuffledOrder.length !== WORD_COUNT) {
    // Initialize shuffled order
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

  // Check if day has changed
  if (state.currentDayKey !== todayKey) {
    // Advance to next word
    pointer = (pointer + 1) % WORD_COUNT;

    // If we've gone through all words, reshuffle
    if (pointer === 0) {
      shuffledOrder = generateShuffledIndices(WORD_COUNT);
    }

    await setStorageState({
      shuffledOrder,
      pointer,
      currentDayKey: todayKey,
      currentWordIndex: shuffledOrder[pointer],
      usedToday: false,
    });
  }
}

/**
 * Set up the daily alarm
 */
async function setupDailyAlarm(): Promise<void> {
  // Clear existing alarm
  await chrome.alarms.clear(ALARM_NAME);

  // Calculate minutes until ~00:05 local time
  const delayMinutes = getMinutesUntilMidnight();

  // Create alarm that fires once, then repeats daily
  await chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: delayMinutes,
    periodInMinutes: 24 * 60, // Repeat daily
  });

  console.log(`[Daily Word] Alarm set for ${delayMinutes} minutes from now`);
}

// Handle alarm events
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    console.log('[Daily Word] Alarm fired, rotating word');
    await rotateWordIfNeeded();
  }
});

// Handle extension install/update
chrome.runtime.onInstalled.addListener(async () => {
  console.log('[Daily Word] Extension installed/updated');
  await rotateWordIfNeeded();
  await setupDailyAlarm();
});

// Handle browser startup
chrome.runtime.onStartup.addListener(async () => {
  console.log('[Daily Word] Browser started');
  await rotateWordIfNeeded();
  await setupDailyAlarm();
});

// Export for potential testing
export { rotateWordIfNeeded, setupDailyAlarm };

