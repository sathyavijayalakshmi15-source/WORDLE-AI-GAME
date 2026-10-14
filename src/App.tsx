import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { Keyboard } from './components/Keyboard';
import { HintSection } from './components/HintSection';
import { PostGameModal } from './components/PostGameModal';
import { StatsModal } from './components/StatsModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { GlossaryModal } from './components/GlossaryModal';
import { LandingHero } from './components/LandingHero';
import { isValid5LetterGuess, isStrictly5LetterWord } from './data/wordDatabase';
import { 
  Difficulty, 
  GameMode, 
  GameStatus, 
  LetterState, 
  UserStats, 
  WordEntry 
} from './types/game';
import { 
  evaluateGuess, 
  getDailyWord, 
  getRandomWord, 
  getTodayDateString, 
  loadDailyGameState, 
  loadUserStats, 
  recordRecentWord, 
  saveDailyGameState, 
  saveUserStats 
} from './utils/wordleLogic';

export default function App() {
  // Navigation View: 'landing' or 'game'
  const [view, setView] = useState<'landing' | 'game'>('landing');

  // Game state
  const [mode, setMode] = useState<GameMode>('daily');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  
  // Strictly verified 5-letter word state
  const [currentWord, setCurrentWord] = useState<WordEntry>(() => {
    const word = getDailyWord();
    if (!isStrictly5LetterWord(word.word)) {
      return getRandomWord();
    }
    return word;
  });

  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<LetterState[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('IN_PROGRESS');
  const [hintsRevealedCount, setHintsRevealedCount] = useState<number>(0);
  const maxAttempts = 6;

  // UI state
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showRestartConfirm, setShowRestartConfirm] = useState<boolean>(false);

  // Modals state
  const [isPostGameOpen, setIsPostGameOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  // Persistent User Statistics
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());

  // Show floating toast notification
  const showToast = useCallback((msg: string, durationMs: number = 2000) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, durationMs);
  }, []);

  // Initialize or restore Daily Challenge (strictly 5 letters)
  const initializeDailyGame = useCallback(() => {
    const today = getTodayDateString();
    const target = getDailyWord(today);
    setCurrentWord(target);

    const savedDaily = loadDailyGameState(today);
    if (savedDaily && savedDaily.word === target.word && isStrictly5LetterWord(savedDaily.word)) {
      setGuesses(savedDaily.guesses);
      const evals = savedDaily.guesses.map((g) => evaluateGuess(g, target.word));
      setEvaluations(evals);
      setGameStatus(savedDaily.gameStatus);
      setHintsRevealedCount(savedDaily.hintsCount || 0);
      setCurrentGuess('');

      if (savedDaily.gameStatus !== 'IN_PROGRESS') {
        setIsPostGameOpen(true);
      }
    } else {
      setGuesses([]);
      setEvaluations([]);
      setCurrentGuess('');
      setGameStatus('IN_PROGRESS');
      setHintsRevealedCount(0);
    }
  }, []);

  // Clean execution of reset with a fresh random 5-letter word
  const executeRestart = useCallback(() => {
    setShowRestartConfirm(false);
    // Pick a fresh random 5-letter word excluding the current word
    const nextWord = getRandomWord(difficulty, currentWord.word);
    recordRecentWord(nextWord.word);
    
    // Completely reset all round state
    setCurrentWord(nextWord);
    setGuesses([]);
    setEvaluations([]);
    setCurrentGuess('');
    setGameStatus('IN_PROGRESS');
    setHintsRevealedCount(0);
    setIsPostGameOpen(false);
    showToast(`Loaded 5-letter term: ${nextWord.category}!`, 1800);
  }, [difficulty, currentWord.word, showToast]);

  // Restart button click handler: checks for meaningful progress
  const handleRestartRound = useCallback(() => {
    // Only confirm if user has made meaningful progress in an active game
    if (guesses.length > 0 && gameStatus === 'IN_PROGRESS') {
      setShowRestartConfirm(true);
    } else {
      executeRestart();
    }
  }, [guesses.length, gameStatus, executeRestart]);

  // New Game button click handler: begins fresh round immediately
  const handleNewGame = useCallback(() => {
    executeRestart();
  }, [executeRestart]);

  // Switch game mode
  const handleSelectMode = (newMode: GameMode) => {
    setMode(newMode);
    setView('game');
    if (newMode === 'daily') {
      initializeDailyGame();
    } else {
      executeRestart();
    }
  };

  // Change practice difficulty filter
  const handleChangeDifficulty = (newDiff: Difficulty) => {
    setDifficulty(newDiff);
    if (mode === 'practice') {
      const nextWord = getRandomWord(newDiff, currentWord.word);
      recordRecentWord(nextWord.word);
      setCurrentWord(nextWord);
      setGuesses([]);
      setEvaluations([]);
      setCurrentGuess('');
      setGameStatus('IN_PROGRESS');
      setHintsRevealedCount(0);
      setIsPostGameOpen(false);
      showToast(`Selected ${newDiff} pool!`, 1500);
    }
  };

  // Map of discovered letter statuses for on-screen keyboard (purely derived)
  const letterStatuses = useMemo(() => {
    const statuses: Record<string, LetterState> = {};

    guesses.forEach((guess, rIndex) => {
      const rowEval = evaluations[rIndex];
      if (!rowEval) return;

      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const state = rowEval[i];

        if (state === 'correct') {
          statuses[letter] = 'correct';
        } else if (state === 'present' && statuses[letter] !== 'correct') {
          statuses[letter] = 'present';
        } else if (state === 'absent' && !statuses[letter]) {
          statuses[letter] = 'absent';
        }
      }
    });

    return statuses;
  }, [guesses, evaluations]);

  // Handle letter typing strictly up to 5 characters
  const handleChar = useCallback(
    (char: string) => {
      if (gameStatus !== 'IN_PROGRESS') return;
      if (isPostGameOpen || isStatsOpen || isHowToPlayOpen || isGlossaryOpen || showRestartConfirm) return;
      // Strictly prevent entering more than 5 characters
      if (currentGuess.length >= 5) return;

      setCurrentGuess((prev) => prev + char.toUpperCase());
    },
    [gameStatus, isPostGameOpen, isStatsOpen, isHowToPlayOpen, isGlossaryOpen, showRestartConfirm, currentGuess.length]
  );

  // Handle backspace
  const handleDelete = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS') return;
    if (isPostGameOpen || isStatsOpen || isHowToPlayOpen || isGlossaryOpen || showRestartConfirm) return;

    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus, isPostGameOpen, isStatsOpen, isHowToPlayOpen, isGlossaryOpen, showRestartConfirm]);

  // Handle guess submission (strictly 5 letters)
  const handleEnter = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS') return;
    if (isPostGameOpen || isStatsOpen || isHowToPlayOpen || isGlossaryOpen || showRestartConfirm) return;

    // Validate length: must be exactly 5 letters
    if (currentGuess.length !== 5) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      showToast('Guess must be exactly 5 letters long!');
      return;
    }

    // Validate characters
    if (!isValid5LetterGuess(currentGuess)) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      showToast('Please enter valid letters!');
      return;
    }

    // Evaluate guess using strict 2-pass duplicate letter handling
    const newEval = evaluateGuess(currentGuess, currentWord.word);
    const newGuesses = [...guesses, currentGuess];
    const newEvaluations = [...evaluations, newEval];

    setGuesses(newGuesses);
    setEvaluations(newEvaluations);
    setCurrentGuess('');

    const isWin = currentGuess === currentWord.word;
    const isLoss = !isWin && newGuesses.length >= maxAttempts;

    if (isWin || isLoss) {
      const finalStatus: GameStatus = isWin ? 'WON' : 'LOST';
      setGameStatus(finalStatus);

      // Update statistics
      setStats((prevStats) => {
        const attemptsUsed = newGuesses.length;
        const newGamesPlayed = prevStats.gamesPlayed + 1;
        const newGamesWon = isWin ? prevStats.gamesWon + 1 : prevStats.gamesWon;
        const newStreak = isWin ? prevStats.currentStreak + 1 : 0;
        const newMaxStreak = Math.max(prevStats.maxStreak, newStreak);
        const newDistribution = { ...prevStats.winDistribution };

        if (isWin && attemptsUsed >= 1 && attemptsUsed <= 6) {
          newDistribution[attemptsUsed] = (newDistribution[attemptsUsed] || 0) + 1;
        }

        const newUnlocked = prevStats.unlockedWords.includes(currentWord.word)
          ? prevStats.unlockedWords
          : [...prevStats.unlockedWords, currentWord.word];

        const updatedStats: UserStats = {
          ...prevStats,
          gamesPlayed: newGamesPlayed,
          gamesWon: newGamesWon,
          currentStreak: newStreak,
          maxStreak: newMaxStreak,
          winDistribution: newDistribution,
          unlockedWords: newUnlocked,
        };

        saveUserStats(updatedStats);
        return updatedStats;
      });

      if (mode === 'daily') {
        saveDailyGameState({
          date: getTodayDateString(),
          word: currentWord.word,
          guesses: newGuesses,
          gameStatus: finalStatus,
          hintsCount: hintsRevealedCount,
        });
      }

      setTimeout(() => {
        setIsPostGameOpen(true);
      }, 1100);
    } else {
      if (mode === 'daily') {
        saveDailyGameState({
          date: getTodayDateString(),
          word: currentWord.word,
          guesses: newGuesses,
          gameStatus: 'IN_PROGRESS',
          hintsCount: hintsRevealedCount,
        });
      }
    }
  }, [
    gameStatus,
    isPostGameOpen,
    isStatsOpen,
    isHowToPlayOpen,
    isGlossaryOpen,
    showRestartConfirm,
    currentGuess,
    currentWord,
    guesses,
    evaluations,
    maxAttempts,
    mode,
    hintsRevealedCount,
    showToast,
  ]);

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (view !== 'game') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnter();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleChar(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, handleEnter, handleDelete, handleChar]);

  // Unlimited progressive hints trigger
  const handleRevealNextHint = () => {
    if (gameStatus !== 'IN_PROGRESS') return;
    const nextCount = hintsRevealedCount + 1;
    setHintsRevealedCount(nextCount);
    showToast(`💡 Clue #${nextCount} unlocked!`, 1500);

    if (mode === 'daily') {
      saveDailyGameState({
        date: getTodayDateString(),
        word: currentWord.word,
        guesses,
        gameStatus,
        hintsCount: nextCount,
      });
    }
  };

  // Surrender & Reveal Answer option
  const handleSurrender = () => {
    if (gameStatus !== 'IN_PROGRESS') return;
    setGameStatus('LOST');
    setIsPostGameOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-tile-pop pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/80 text-cyan-200 text-xs font-semibold shadow-2xl shadow-cyan-950 flex items-center gap-2">
            <span>💻</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Navigation Header with Restart and New Game */}
      <Header
        mode={mode}
        onSelectMode={handleSelectMode}
        difficulty={difficulty}
        onChangeDifficulty={handleChangeDifficulty}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onRestartRound={handleRestartRound}
        onNewGame={handleNewGame}
        onGoHome={() => setView('landing')}
        unlockedCount={stats.unlockedWords.length}
      />

      {/* Main View Area */}
      {view === 'landing' ? (
        <main className="flex-1 flex flex-col justify-center">
          <LandingHero
            onStartGame={(chosenMode) => handleSelectMode(chosenMode)}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        </main>
      ) : (
        <main className="flex-1 flex flex-col justify-between max-w-xl mx-auto w-full px-2 py-1 sm:py-2">
          {/* In-Game Top Info & Controls Bar */}
          <div className="flex items-center justify-between px-2.5 py-1 text-xs text-slate-400 font-mono-code border-b border-slate-900/90 gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="capitalize text-cyan-300 font-bold">
                {mode === 'daily' ? 'Daily' : 'Practice'}
              </span>
              <span>·</span>
              <span className="text-white font-medium">5 Letters</span>
              <span>·</span>
              <span className="text-slate-400 truncate max-w-[120px] sm:max-w-none">
                {currentWord.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">
                Attempt: <strong className="text-white">{guesses.length + (gameStatus === 'IN_PROGRESS' ? 1 : 0)}/{maxAttempts}</strong>
              </span>

              {/* In-Game Quick Restart button */}
              <button
                onClick={handleRestartRound}
                title="Restart round with fresh 5-letter word"
                className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700/80 transition cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3 h-3 text-cyan-400" />
                <span>Restart</span>
              </button>

              {/* In-Game Quick New Game button */}
              <button
                onClick={handleNewGame}
                title="Start a new game with a new 5-letter word"
                className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-emerald-300 hover:text-emerald-100 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/80 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-3 h-3 text-emerald-400" />
                <span>New Game</span>
              </button>
            </div>
          </div>

          {/* Compact Game Board (Always 5 columns and 6 rows) */}
          <div className="my-auto py-1">
            <GameBoard
              guesses={guesses}
              evaluations={evaluations}
              currentGuess={currentGuess}
              maxAttempts={maxAttempts}
              isShaking={isShaking}
            />
          </div>

          {/* Unlimited Hint Bar */}
          <div className="my-1">
            <HintSection
              currentWord={currentWord}
              hintsRevealedCount={hintsRevealedCount}
              onRevealNextHint={handleRevealNextHint}
              onSurrender={handleSurrender}
              gameStatus={gameStatus}
            />
          </div>

          {/* Compact On-Screen Keyboard */}
          <div className="mt-1">
            <Keyboard
              onChar={handleChar}
              onEnter={handleEnter}
              onDelete={handleDelete}
              letterStatuses={letterStatuses}
              disabled={gameStatus !== 'IN_PROGRESS'}
            />
          </div>
        </main>
      )}

      {/* Restart Confirmation Dialog */}
      {showRestartConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-tile-pop">
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl max-w-sm w-full p-4 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Restart Round with Fresh Word?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Restarting will clear your <strong className="text-white">{guesses.length} guess{guesses.length > 1 ? 'es' : ''}</strong> and select a fresh 5-letter computer science term.
            </p>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setShowRestartConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
              >
                Keep Playing
              </button>
              <button
                onClick={executeRestart}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-md transition cursor-pointer"
              >
                Confirm Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Game Learn Mode Modal */}
      <PostGameModal
        isOpen={isPostGameOpen}
        onClose={() => setIsPostGameOpen(false)}
        word={currentWord}
        won={gameStatus === 'WON'}
        attemptsUsed={guesses.length}
        maxAttempts={maxAttempts}
        guesses={guesses}
        mode={mode}
        freeHintUsed={hintsRevealedCount > 0}
        penaltyHintUsed={false}
        onNextPractice={handleNewGame}
        onOpenGlossary={() => {
          setIsPostGameOpen(false);
          setIsGlossaryOpen(true);
        }}
      />

      {/* Statistics Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />

      {/* How to Play Guide Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      {/* Concept Bank / Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        unlockedWords={stats.unlockedWords}
      />
    </div>
  );
}
