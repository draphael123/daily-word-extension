import type { StorageState } from '../types';
import { DEFAULT_STORAGE_STATE } from '../types';

/**
 * Storage API wrapper - uses sync for cross-device sync
 * Falls back to local if sync quota exceeded
 */

const storage = chrome.storage.sync;

/**
 * Get all stored state from chrome.storage.sync
 */
export async function getStorageState(): Promise<StorageState> {
  return new Promise((resolve) => {
    storage.get(null, (result) => {
      resolve({ ...DEFAULT_STORAGE_STATE, ...result } as StorageState);
    });
  });
}

/**
 * Get specific keys from storage with defaults
 */
export async function getStorageKeys<K extends keyof StorageState>(
  keys: K[]
): Promise<Pick<StorageState, K>> {
  return new Promise((resolve) => {
    const defaults: Partial<StorageState> = {};
    keys.forEach((key) => {
      if (key in DEFAULT_STORAGE_STATE) {
        defaults[key] = DEFAULT_STORAGE_STATE[key as keyof typeof DEFAULT_STORAGE_STATE] as StorageState[K];
      }
    });

    storage.get(defaults, (result) => {
      resolve(result as Pick<StorageState, K>);
    });
  });
}

/**
 * Update storage state
 */
export async function setStorageState(
  updates: Partial<StorageState>
): Promise<void> {
  return new Promise((resolve, reject) => {
    storage.set(updates, () => {
      if (chrome.runtime.lastError) {
        // If sync storage fails (quota exceeded), fall back to local
        console.warn('[Daily Word] Sync storage error, falling back to local:', chrome.runtime.lastError);
        chrome.storage.local.set(updates, resolve);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Clear all storage
 */
export async function clearStorage(): Promise<void> {
  return new Promise((resolve) => {
    storage.clear(() => {
      chrome.storage.local.clear(resolve);
    });
  });
}

/**
 * Listen for storage changes
 */
export function onStorageChange(
  callback: (changes: { [key: string]: chrome.storage.StorageChange }) => void
): void {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' || areaName === 'local') {
      callback(changes);
    }
  });
}
