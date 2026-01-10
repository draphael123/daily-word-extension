/**
 * Escape special regex characters in a string
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Validate that a sentence contains the target word as a whole word
 * @param sentence - The user's sentence
 * @param word - The target word to find
 * @returns true if the word appears as a whole word (case-insensitive)
 */
export function validateWordInSentence(sentence: string, word: string): boolean {
  if (!sentence.trim() || !word) return false;
  
  const escapedWord = escapeRegExp(word);
  const regex = new RegExp(`\\b${escapedWord}\\b`, 'i');
  return regex.test(sentence);
}

// Alias for backwards compatibility
export const validateSentence = validateWordInSentence;

