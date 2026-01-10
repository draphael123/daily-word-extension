/**
 * Get the current local date as a string key (YYYY-MM-DD)
 * Uses the user's local timezone
 */
export function getLocalDayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get yesterday's date key
 */
export function getYesterdayKey(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate minutes until next midnight (plus a buffer)
 */
export function getMinutesUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 5, 0, 0); // 00:05 next day
  const diffMs = midnight.getTime() - now.getTime();
  return Math.max(1, Math.ceil(diffMs / 60000));
}

