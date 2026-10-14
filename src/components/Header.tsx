import React from 'react';
import { 
  Terminal, 
  Calendar, 
  Shuffle, 
  HelpCircle, 
  BarChart2, 
  BookOpen, 
  RotateCcw,
  Plus,
  Sparkles
} from 'lucide-react';
import { Difficulty, GameMode } from '../types/game';

interface HeaderProps {
  mode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  difficulty: Difficulty;
  onChangeDifficulty: (diff: Difficulty) => void;
  onOpenHowToPlay: () => void;
  onOpenStats: () => void;
  onOpenGlossary: () => void;
  onRestartRound: () => void;
  onNewGame: () => void;
  onGoHome?: () => void;
  unlockedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onSelectMode,
  difficulty,
  onChangeDifficulty,
  onOpenHowToPlay,
  onOpenStats,
  onOpenGlossary,
  onRestartRound,
  onNewGame,
  onGoHome,
  unlockedCount
}) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Brand */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group hover:opacity-90 transition cursor-pointer"
          title="Return to Home"
        >
          <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold group-hover:scale-105 transition-transform">
            <Terminal className="w-4.5 h-4.5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-white font-mono-code">
                CODE<span className="text-cyan-400">WORDLE</span>
              </span>
              <span className="text-[10px] uppercase font-mono-code tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                Class 12 CS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal">Decode the Digital World</p>
          </div>
        </button>

        {/* Center: Mode switcher */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onSelectMode('daily')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              mode === 'daily'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Daily Challenge</span>
          </button>
          <button
            onClick={() => onSelectMode('practice')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              mode === 'practice'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Practice</span>
          </button>
        </div>

        {/* Right Controls: Restart, New Game, Concept Bank, Stats, Help */}
        <div className="flex items-center gap-1.5">
          {/* Visible Restart Button */}
          <button
            onClick={onRestartRound}
            title="Restart round with fresh random word"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700/80 transition cursor-pointer active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Restart</span>
          </button>

          {/* Visible New Game Button */}
          <button
            onClick={onNewGame}
            title="Start next round with a new word"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-emerald-100 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/80 transition cursor-pointer active:scale-95 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>New Game</span>
          </button>

          <button
            onClick={onOpenGlossary}
            title="CS Concept Bank & Learn Archive"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Concepts</span>
            {unlockedCount > 0 && (
              <span className="text-[10px] font-mono-code text-cyan-300 ml-0.5">({unlockedCount})</span>
            )}
          </button>

          <button
            onClick={onOpenStats}
            title="Statistics"
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-transparent hover:border-slate-700 transition cursor-pointer"
            aria-label="Statistics"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenHowToPlay}
            title="How to Play"
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-transparent hover:border-slate-700 transition cursor-pointer"
            aria-label="How to play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Practice mode sub-bar for difficulty selection */}
      {mode === 'practice' && (
        <div className="bg-[#090d18] border-t border-slate-800/60 px-4 py-1 text-xs">
          <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Practice Word Pool:
            </span>
            <div className="flex items-center gap-1">
              {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => onChangeDifficulty(diff)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition capitalize cursor-pointer ${
                    difficulty === diff
                      ? 'bg-slate-700 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {diff === 'all' ? 'All (5L)' : diff === 'easy' ? 'Easy' : diff === 'medium' ? 'Medium' : 'Hard'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
