import React from 'react';
import { Delete, CornerDownLeft } from 'lucide-react';
import { LetterState } from '../types/game';

interface KeyboardProps {
  onChar: (char: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  letterStatuses: Record<string, LetterState>;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export const Keyboard: React.FC<KeyboardProps> = ({
  onChar,
  onEnter,
  onDelete,
  letterStatuses,
  disabled = false,
}) => {
  const getKeyStyle = (key: string) => {
    const status = letterStatuses[key];

    if (key === 'ENTER' || key === 'BACKSPACE') {
      return 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
    }

    if (status === 'correct') {
      return 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-600/30';
    }
    if (status === 'present') {
      return 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm shadow-amber-500/30';
    }
    if (status === 'absent') {
      return 'bg-slate-900/90 text-slate-500 border-slate-850 opacity-60';
    }

    return 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700/60';
  };

  const handleKeyClick = (key: string) => {
    if (disabled) return;
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onDelete();
    } else {
      onChar(key);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 py-1 select-none">
      <div className="flex flex-col gap-1 sm:gap-1.5">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map((key) => {
              const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
              const keyStyle = getKeyStyle(key);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKeyClick(key)}
                  disabled={disabled}
                  aria-label={key === 'BACKSPACE' ? 'Delete letter' : key === 'ENTER' ? 'Submit guess' : key}
                  className={`flex items-center justify-center font-mono-code font-semibold rounded-md sm:rounded-lg text-xs border transition-all active:scale-95 duration-100 cursor-pointer ${
                    isSpecial
                      ? 'px-2 sm:px-3 h-10 sm:h-11.5 text-[11px] sm:text-xs min-w-[46px] sm:min-w-[58px]'
                      : 'w-7 sm:w-9.5 h-10 sm:h-11.5'
                  } ${keyStyle}`}
                >
                  {key === 'ENTER' ? (
                    <span className="flex items-center gap-1 font-bold">
                      <CornerDownLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">ENTER</span>
                    </span>
                  ) : key === 'BACKSPACE' ? (
                    <Delete className="w-4 h-4" />
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
