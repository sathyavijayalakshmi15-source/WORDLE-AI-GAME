export type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export type GameStatus = 'IN_PROGRESS' | 'WON' | 'LOST';

export type GameMode = 'daily' | 'practice';

export type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

export type WordCategory =
  | 'Python'
  | 'Database & SQL'
  | 'Computer Networks'
  | 'Cybersecurity'
  | 'Data Structures'
  | 'Hardware & Architecture'
  | 'Operating Systems & Software'
  | 'Artificial Intelligence'
  | 'Computer Fundamentals';

export interface WordEntry {
  word: string;
  length: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: WordCategory;
  hints: string[];     // Progressive clues: 1. Topic context, 2. Purpose/Function, 3. Practical syntax/example, 4. Structural/Letter clue
  clue1?: string;      // Optional backwards compatibility
  clue2?: string;
  definition: string;  // Clear educational summary
  example: string;     // Code snippet or technical example
  examTip: string;     // Class 12 Board Exam Tip
}

export interface GuessEvaluation {
  guess: string;
  states: LetterState[];
}

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  winDistribution: Record<number, number>; // 1 to 6
  lastDailyDate?: string;
  unlockedWords: string[]; // List of words learned/unlocked for concept bank
  dailyResults: Record<string, { won: boolean; attempts: number; maxAttempts: number }>;
}
