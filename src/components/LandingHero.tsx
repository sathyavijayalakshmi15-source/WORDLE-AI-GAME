import React from 'react';
import { Play, Calendar, Shuffle, Terminal, Sparkles, BookOpen, ShieldCheck, Cpu } from 'lucide-react';
import { GameMode } from '../types/game';
import { getDailyPuzzleNumber } from '../utils/wordleLogic';

interface LandingHeroProps {
  onStartGame: (mode: GameMode) => void;
  onOpenHowToPlay: () => void;
  onOpenGlossary: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartGame,
  onOpenHowToPlay,
  onOpenGlossary,
}) => {
  const dailyNum = getDailyPuzzleNumber();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono-code mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>CBSE & ICSE Class 11 & 12 CS Curriculum</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-mono-code">
        CodeWordle
      </h1>
      <p className="text-lg sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 mt-2 font-mono-code">
        Decode the Digital World
      </p>

      {/* Subtitle description */}
      <p className="text-slate-300 max-w-2xl text-xs sm:text-base leading-relaxed mt-4">
        Master computer science vocabulary through interactive Wordle gameplay.
        Decode core concepts across <strong className="text-cyan-300">Python Programming</strong>,{' '}
        <strong className="text-emerald-300">Database & SQL</strong>,{' '}
        <strong className="text-blue-300">Computer Networks</strong>,{' '}
        <strong className="text-amber-300">Cybersecurity</strong>, and{' '}
        <strong className="text-purple-300">Data Structures</strong> with instant educational breakdowns.
      </p>

      {/* Interactive Tile Demonstration */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 my-6 sm:my-8">
        {[
          { char: 'S', state: 'bg-emerald-600 border-emerald-500 text-white' },
          { char: 'T', state: 'bg-emerald-600 border-emerald-500 text-white' },
          { char: 'A', state: 'bg-amber-500 border-amber-400 text-slate-950 font-bold' },
          { char: 'C', state: 'bg-slate-800 border-slate-700 text-slate-400' },
          { char: 'K', state: 'bg-emerald-600 border-emerald-500 text-white' },
        ].map((tile, i) => (
          <div
            key={i}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center text-xl sm:text-2xl font-mono-code font-bold shadow-lg transition-transform hover:scale-105 duration-200 ${tile.state}`}
          >
            {tile.char}
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10">
        <button
          onClick={() => onStartGame('daily')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition active:scale-95 group cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
          <span>Play Now (Daily #{dailyNum})</span>
        </button>

        <button
          onClick={() => onStartGame('practice')}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-slate-850 hover:bg-slate-800 border border-slate-700/80 shadow-lg flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
        >
          <Shuffle className="w-5 h-5 text-emerald-400" />
          <span>Practice Mode (Unlimited)</span>
        </button>
      </div>

      {/* 3 Pillar Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left w-full max-w-3xl">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Classic 5-Letter Wordle</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every hidden answer is strictly 5 letters long with 6 attempts. Featuring Class 11 & 12 terms like CLASS, ARRAY, DEBUG, LOGIC, PIXEL, CACHE, and ROUTE.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition">
          <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Unlimited Clue Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Progressive clues on topic context, purpose, syntax, and letter structure with no quota, no attempt penalty, and no wait time!
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition">
          <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Learn Mode & Exam Tips</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            After every round, unlock comprehensive definitions, code snippets, and Class 12 board exam tips stored in your Concept Bank.
          </p>
        </div>
      </div>
    </div>
  );
};
