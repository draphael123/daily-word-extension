import type { StorageState } from '../types';
import { DEFAULT_STORAGE_STATE } from '../types';

/**
 * Get all stored state from chrome.storage.local
 */
export async function getStorageState(): Promise<Partial<StorageState>> {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (result) => {
      resolve(result as Partial<StorageState>);
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
        defaults[key] = DEFAULT_STORAGE_STATE[key] as StorageState[K];
      }
    });

    chrome.storage.local.get(defaults, (result) => {
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
  return new Promise((resolve) => {
    chrome.storage.local.set(updates, resolve);
  });
}

/**
 * Clear all storage
 */
export async function clearStorage(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.clear(resolve);
  });
}

