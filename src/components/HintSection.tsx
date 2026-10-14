import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { WordEntry } from '../types/game';
import { getProgressiveHint } from '../data/wordDatabase';

interface HintSectionProps {
  currentWord: WordEntry;
  hintsRevealedCount: number;
  onRevealNextHint: () => void;
  onSurrender?: () => void;
  gameStatus: 'IN_PROGRESS' | 'WON' | 'LOST';
}

export const HintSection: React.FC<HintSectionProps> = ({
  currentWord,
  hintsRevealedCount,
  onRevealNextHint,
  onSurrender,
  gameStatus,
}) => {
  const [activeHintIndex, setActiveHintIndex] = useState(0);
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState(false);

  // When a new hint is unlocked, auto-focus to it
  const handleGetHint = () => {
    onRevealNextHint();
    setActiveHintIndex(hintsRevealedCount); // 0-indexed matches newly revealed count
  };

  const currentHintText = hintsRevealedCount > 0
    ? getProgressiveHint(currentWord, activeHintIndex)
    : '';

  return (
    <div className="w-full max-w-xl mx-auto px-2 my-1">
      {/* Compact Hint Toolbar */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 sm:p-2 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-sm">
        {/* Left: Hint trigger button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleGetHint}
            disabled={gameStatus !== 'IN_PROGRESS'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/15 transition active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 fill-slate-950" />
            <span>
              {hintsRevealedCount === 0 ? '💡 Get Hint' : '💡 Next Clue'}
            </span>
          </button>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Topic: <span className="text-cyan-300 font-medium">{currentWord.category}</span>
          </span>
        </div>

        {/* Right: Hint pagination and Surrender */}
        <div className="flex items-center gap-1">
          {hintsRevealedCount > 0 && (
            <div className="flex items-center gap-1 bg-slate-850 px-2 py-1 rounded-lg border border-slate-700/60 text-xs">
              <button
                onClick={() => setActiveHintIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeHintIndex === 0}
                className="p-0.5 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                aria-label="Previous hint"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="font-mono-code text-[11px] text-amber-300 font-semibold px-1">
                Clue {activeHintIndex + 1}/{hintsRevealedCount}
              </span>

              <button
                onClick={() => setActiveHintIndex((prev) => Math.min(hintsRevealedCount - 1, prev + 1))}
                disabled={activeHintIndex >= hintsRevealedCount - 1}
                className="p-0.5 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                aria-label="Next hint"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {gameStatus === 'IN_PROGRESS' && onSurrender && (
            <button
              onClick={() => setShowSurrenderConfirm(true)}
              title="Give up and reveal answer to study definition"
              className="px-2 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-rose-300 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition cursor-pointer flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reveal</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Clue Card */}
      {hintsRevealedCount > 0 && (
        <div className="mt-1.5 p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs animate-tile-pop">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11.5px] mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Clue #{activeHintIndex + 1}</span>
            <span className="text-[10px] text-slate-400 font-normal">
              (Unlimited hints available)
            </span>
          </div>
          <p className="text-slate-200 text-xs leading-snug">
            {currentHintText}
          </p>
        </div>
      )}

      {/* Surrender Confirmation Modal */}
      {showSurrenderConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-sm w-full p-4 shadow-2xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Reveal Word & End Round?</span>
            </h3>
            <p className="text-xs text-slate-300">
              Give up this round and open the Learn Mode study breakdown for this{' '}
              <strong className="text-cyan-300 font-mono-code">5-letter</strong> CS term?
            </p>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setShowSurrenderConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                Keep Guessing
              </button>
              <button
                onClick={() => {
                  setShowSurrenderConfirm(false);
                  onSurrender?.();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 cursor-pointer"
              >
                Reveal Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
