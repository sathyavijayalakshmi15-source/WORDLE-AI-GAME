import React from 'react';
import { LetterState } from '../types/game';

interface GameBoardProps {
  guesses: string[];
  evaluations: LetterState[][];
  currentGuess: string;
  maxAttempts?: number;
  isShaking: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  guesses,
  evaluations,
  currentGuess,
  maxAttempts = 6,
  isShaking,
}) => {
  const totalRows = maxAttempts;
  const wordLength = 5; // STRICT RULE: Always exactly 5 columns
  const activeRowIndex = guesses.length;

  // Classic 5-column tile sizing, balanced and compact
  const tileSize = 'w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 text-xl sm:text-2xl';

  return (
    <div className="w-full flex justify-center py-1 sm:py-2 px-1 select-none">
      <div className="flex flex-col gap-1 sm:gap-1.5">
        {Array.from({ length: totalRows }).map((_, rowIndex) => {
          const isSubmitted = rowIndex < guesses.length;
          const isCurrent = rowIndex === activeRowIndex;

          return (
            <div
              key={`row-${rowIndex}`}
              className={`flex justify-center gap-1 sm:gap-1.5 ${
                isCurrent && isShaking ? 'animate-tile-shake' : ''
              }`}
            >
              {Array.from({ length: wordLength }).map((_, colIndex) => {
                let letter = '';
                let stateClass = 'border-slate-800 bg-[#0d1424]/60 text-slate-400';
                let animationClass = '';
                let transitionStyle = {};

                if (isSubmitted) {
                  letter = guesses[rowIndex]?.[colIndex] || '';
                  const letterState = evaluations[rowIndex]?.[colIndex] || 'absent';

                  // Flip animation with staggered column delay
                  transitionStyle = {
                    animationDelay: `${colIndex * 120}ms`,
                  };

                  if (letterState === 'correct') {
                    stateClass =
                      'bg-emerald-600 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20';
                  } else if (letterState === 'present') {
                    stateClass =
                      'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20';
                  } else {
                    stateClass = 'bg-slate-800/90 border-slate-700/80 text-slate-400';
                  }
                  animationClass = 'animate-tile-pop';
                } else if (isCurrent) {
                  letter = currentGuess[colIndex] || '';
                  if (letter) {
                    stateClass =
                      'border-cyan-400/90 bg-slate-900/90 text-white font-bold ring-1 ring-cyan-500/30 animate-tile-pop';
                  } else {
                    stateClass = 'border-slate-800 bg-[#0d1527]/70 text-transparent';
                  }
                } else {
                  // Future inactive rows
                  stateClass = 'border-slate-850/70 bg-[#0a0f1d]/30 text-transparent';
                }

                return (
                  <div
                    key={`tile-${rowIndex}-${colIndex}`}
                    style={transitionStyle}
                    className={`flex items-center justify-center font-mono-code font-bold rounded-lg border transition-colors duration-150 uppercase ${tileSize} ${stateClass} ${animationClass}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
