import { CS_WORDS, isStrictly5LetterWord } from '../data/wordDatabase';
import { LetterState, UserStats, WordEntry } from '../types/game';

const STATS_STORAGE_KEY = 'codewordle_user_stats_v3';
const RECENT_WORDS_STORAGE_KEY = 'codewordle_recent_5letter_words_v3';
const DAILY_STORAGE_KEY_PREFIX = 'codewordle_daily_state_v3_';

/**
 * 2-pass evaluation of a 5-letter guess against the target solution.
 * Correctly handles repeated letters strictly according to standard Wordle rules.
 */
export function evaluateGuess(guess: string, solution: string): LetterState[] {
  const g = guess.toUpperCase().trim();
  const s = solution.toUpperCase().trim();
  const len = 5;
  const result: LetterState[] = new Array(len).fill('absent');

  // Count available frequencies in solution
  const letterCounts: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    const char = s[i];
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  // Pass 1: Correct letters in correct spot (Green)
  for (let i = 0; i < len; i++) {
    if (g[i] === s[i]) {
      result[i] = 'correct';
      letterCounts[g[i]] -= 1;
    }
  }

  // Pass 2: Present letters in wrong spot (Yellow)
  for (let i = 0; i < len; i++) {
    if (result[i] === 'correct') continue;

    const char = g[i];
    if (letterCounts[char] && letterCounts[char] > 0) {
      result[i] = 'present';
      letterCounts[char] -= 1;
    } else {
      result[i] = 'absent';
    }
  }

  return result;
}

/**
 * Get date string in YYYY-MM-DD format (local timezone)
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Deterministically select a Daily Challenge 5-letter word based on the date string.
 * Strictly filters at the source for words matching ^[A-Z]{5}$.
 */
export function getDailyWord(dateStr: string = getTodayDateString()): WordEntry {
  const eligible = CS_WORDS.filter(w => isStrictly5LetterWord(w.word));
  if (eligible.length === 0) {
    throw new Error('No valid 5-letter words found in database');
  }

  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const positiveHash = Math.abs(hash);
  const index = positiveHash % eligible.length;
  const chosen = eligible[index];

  // If a word is invalid, skip it and select another valid word
  if (!isStrictly5LetterWord(chosen.word)) {
    return eligible.find(w => isStrictly5LetterWord(w.word)) || eligible[0];
  }
  return chosen;
}

/**
 * Daily game number counter starting from Day 1 (epoch reference)
 */
export function getDailyPuzzleNumber(dateStr: string = getTodayDateString()): number {
  const startDate = new Date('2025-01-01T00:00:00Z').getTime();
  const currentDate = new Date(`${dateStr}T00:00:00Z`).getTime();
  const diffDays = Math.max(1, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)));
  return diffDays;
}

/**
 * Load list of recently played 5-letter words to avoid repeats until pool is exhausted
 */
export function loadRecentWords(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_WORDS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save recently played word
 */
export function recordRecentWord(word: string): void {
  try {
    let recent = loadRecentWords();
    if (!recent.includes(word)) {
      recent.push(word);
    }
    const eligibleCount = CS_WORDS.filter(w => isStrictly5LetterWord(w.word)).length;
    // If pool exhausted or almost full, reset pool
    if (recent.length >= eligibleCount) {
      recent = [word];
    }
    localStorage.setItem(RECENT_WORDS_STORAGE_KEY, JSON.stringify(recent));
  } catch {
    // ignore storage errors
  }
}

/**
 * Pick a random valid 5-letter word without repeating recently used words
 * until the available pool has been exhausted.
 * Strictly validates matching ^[A-Z]{5}$ at the source.
 */
export function getRandomWord(
  difficulty: 'all' | 'easy' | 'medium' | 'hard' = 'all',
  excludeWord?: string
): WordEntry {
  // STRICT FILTER at the source: must match ^[A-Z]{5}$
  let candidates = CS_WORDS.filter(w => isStrictly5LetterWord(w.word));

  if (difficulty !== 'all') {
    const filtered = candidates.filter(w => w.difficulty === difficulty);
    if (filtered.length > 0) {
      candidates = filtered;
    }
  }

  const recent = loadRecentWords();
  // Filter out recently used words and current word
  let unplayed = candidates.filter(w => !recent.includes(w.word) && w.word !== excludeWord);

  // If pool exhausted, reset
  if (unplayed.length === 0) {
    unplayed = candidates.filter(w => w.word !== excludeWord);
  }
  if (unplayed.length === 0) {
    unplayed = candidates;
  }

  const randomIndex = Math.floor(Math.random() * unplayed.length);
  const selected = unplayed[randomIndex];

  // Final sanity check: if invalid, skip and pick a valid one
  if (!isStrictly5LetterWord(selected.word)) {
    return candidates.find(w => isStrictly5LetterWord(w.word)) || candidates[0];
  }

  return selected;
}

/**
 * Default empty stats object
 */
export function getDefaultStats(): UserStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    unlockedWords: [],
    dailyResults: {}
  };
}

/**
 * Load user statistics from local storage
 */
export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return getDefaultStats();
    const parsed = JSON.parse(raw);
    return {
      gamesPlayed: Number(parsed.gamesPlayed) || 0,
      gamesWon: Number(parsed.gamesWon) || 0,
      currentStreak: Number(parsed.currentStreak) || 0,
      maxStreak: Number(parsed.maxStreak) || 0,
      winDistribution: {
        1: Number(parsed.winDistribution?.[1]) || 0,
        2: Number(parsed.winDistribution?.[2]) || 0,
        3: Number(parsed.winDistribution?.[3]) || 0,
        4: Number(parsed.winDistribution?.[4]) || 0,
        5: Number(parsed.winDistribution?.[5]) || 0,
        6: Number(parsed.winDistribution?.[6]) || 0,
      },
      lastDailyDate: parsed.lastDailyDate || undefined,
      unlockedWords: Array.isArray(parsed.unlockedWords) ? parsed.unlockedWords : [],
      dailyResults: parsed.dailyResults || {}
    };
  } catch (err) {
    return getDefaultStats();
  }
}

/**
 * Save user statistics to local storage
 */
export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.warn('Failed to save user stats:', err);
  }
}

export interface StoredDailyGame {
  date: string;
  word: string;
  guesses: string[];
  gameStatus: 'IN_PROGRESS' | 'WON' | 'LOST';
  hintsCount: number;
}

export function loadDailyGameState(dateStr: string = getTodayDateString()): StoredDailyGame | null {
  try {
    const raw = localStorage.getItem(`${DAILY_STORAGE_KEY_PREFIX}${dateStr}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveDailyGameState(state: StoredDailyGame): void {
  try {
    localStorage.setItem(`${DAILY_STORAGE_KEY_PREFIX}${state.date}`, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to save daily state:', err);
  }
}

/**
 * Generate shareable text for clipboard
 */
export function generateShareText(
  word: string,
  guesses: string[],
  won: boolean,
  attemptsUsed: number,
  mode: 'daily' | 'practice',
  maxAttempts: number = 6,
  hintsUsedCount: number = 0
): string {
  const title = mode === 'daily' 
    ? `CodeWordle Daily #${getDailyPuzzleNumber()}` 
    : `CodeWordle Practice (5 Letters)`;
  
  const scoreDisplay = won ? `${attemptsUsed}/${maxAttempts}` : `X/${maxAttempts}`;
  const hintMarker = hintsUsedCount > 0 ? ` (💡 ${hintsUsedCount} hint${hintsUsedCount > 1 ? 's' : ''})` : '';

  const rows = guesses.map(g => {
    const evaluation = evaluateGuess(g, word);
    return evaluation.map(state => {
      if (state === 'correct') return '🟩';
      if (state === 'present') return '🟨';
      return '⬛';
    }).join('');
  });

  return `${title} ${scoreDisplay}${hintMarker}\n\n${rows.join('\n')}\n\nDecode the Digital World 💻`;
}
