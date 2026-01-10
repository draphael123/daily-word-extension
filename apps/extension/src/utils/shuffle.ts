/**
 * Fisher-Yates shuffle algorithm
 * Creates an unbiased random permutation of the input array
 * @param array - Array to shuffle (will be modified in place)
 * @returns The shuffled array
 */
export function fisherYatesShuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generate a shuffled array of indices from 0 to length-1
 * @param length - Number of indices to generate
 * @returns Shuffled array of indices
 */
export function generateShuffledIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  return fisherYatesShuffle(indices);
}

