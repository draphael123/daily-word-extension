/**
 * Enhance existing words.json with etymology, categories, related words, and difficulty
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wordsPath = resolve(__dirname, '../src/data/words.json');

// Read existing words
const existingWords = JSON.parse(readFileSync(wordsPath, 'utf-8'));

// Etymology patterns for common word origins
const etymologyPatterns = {
  'Latin': ['tion', 'sion', 'ous', 'ious', 'ent', 'ant', 'able', 'ible', 'al', 'or', 'us'],
  'Greek': ['ology', 'phon', 'graph', 'morph', 'path', 'scope', 'phobia', 'phil', 'chron', 'aero'],
  'French': ['ette', 'ique', 'aire', 'eur', 'oir', 'age', 'ance', 'ence'],
  'Germanic': ['ness', 'ful', 'less', 'dom', 'ship', 'hood', 'ward'],
  'Old English': ['wh', 'gh', 'ght'],
};

// Categories based on word characteristics
const categoryKeywords = {
  formal: ['discourse', 'elucidate', 'manifold', 'paradigm', 'constitute', 'pursuant', 'heretofore'],
  casual: ['quirky', 'snazzy', 'nifty', 'groovy', 'peachy', 'swell'],
  poetic: ['ethereal', 'gossamer', 'luminous', 'mellifluous', 'resplendent', 'celestial', 'verdant'],
  technical: ['algorithm', 'synthesis', 'parameter', 'coefficient', 'vector', 'matrix'],
  literary: ['bildungsroman', 'denouement', 'leitmotif', 'protagonist', 'allegory', 'metaphor'],
  archaic: ['forsooth', 'wherefore', 'hitherto', 'perchance', 'verily', 'prithee'],
};

// Related words database (partial - for demo)
const relatedWordsMap = {
  'susurrus': ['whisper', 'murmur', 'rustle'],
  'petrichor': ['rain', 'earth', 'aroma'],
  'ephemeral': ['fleeting', 'transient', 'momentary'],
  'serendipity': ['fortune', 'luck', 'chance'],
  'mellifluous': ['melodious', 'dulcet', 'harmonious'],
  'luminous': ['radiant', 'glowing', 'brilliant'],
  'ethereal': ['celestial', 'otherworldly', 'heavenly'],
  'ineffable': ['indescribable', 'unspeakable', 'unutterable'],
  'sonder': ['empathy', 'awareness', 'consciousness'],
  'vellichor': ['nostalgia', 'books', 'memory'],
};

function guessEtymology(word) {
  const lower = word.toLowerCase();
  for (const [origin, patterns] of Object.entries(etymologyPatterns)) {
    for (const pattern of patterns) {
      if (lower.includes(pattern)) {
        return `From ${origin}`;
      }
    }
  }
  return 'Origin uncertain';
}

function guessCategory(word, definition) {
  const text = (word + ' ' + definition).toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) {
        return category;
      }
    }
  }
  // Default category based on definition content
  if (definition.includes('literary') || definition.includes('poetry')) return 'literary';
  if (definition.includes('archaic') || definition.includes('obsolete')) return 'archaic';
  if (definition.includes('formal')) return 'formal';
  return 'literary'; // Most rare words are literary
}

function guessDifficulty(word, definition) {
  // Base difficulty on word length and complexity
  let difficulty = 2;
  if (word.length > 10) difficulty++;
  if (word.length > 14) difficulty++;
  if (definition.length > 100) difficulty++;
  if (word.includes('-')) difficulty--;
  return Math.min(5, Math.max(1, difficulty));
}

function getRelatedWords(word) {
  if (relatedWordsMap[word.toLowerCase()]) {
    return relatedWordsMap[word.toLowerCase()];
  }
  // Generate some plausible related words
  return [];
}

// Enhance each word
const enhancedWords = existingWords.map(entry => ({
  ...entry,
  etymology: entry.etymology || guessEtymology(entry.word),
  category: entry.category || guessCategory(entry.word, entry.definition),
  difficulty: entry.difficulty || guessDifficulty(entry.word, entry.definition),
  related: entry.related || getRelatedWords(entry.word),
}));

// Write enhanced words
writeFileSync(wordsPath, JSON.stringify(enhancedWords, null, 2));

console.log(`Enhanced ${enhancedWords.length} words with etymology, category, difficulty, and related words.`);
console.log('\nSample enhanced word:');
console.log(JSON.stringify(enhancedWords[0], null, 2));

