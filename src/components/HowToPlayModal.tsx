import React from 'react';
import { X, HelpCircle, Lightbulb, BookOpen, Flame, AlertTriangle } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1322] border border-slate-700/80 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close how to play"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>How to Play CodeWordle</span>
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Guess the secret Computer Science term in 6 attempts or fewer!
        </p>

        <div className="space-y-4 overflow-y-auto pr-1 text-xs text-slate-300">
          {/* Tile Color Explanations */}
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono-code">
              Tile Color Coding
            </h3>

            {/* Example: 5-Letter Rows */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div>
                <div className="flex gap-1.5 mb-1.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-emerald-600 border border-emerald-500 text-white font-mono-code font-bold flex items-center justify-center text-sm shadow-sm">
                    C
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    L
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    A
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    S
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    S
                  </div>
                </div>
                <p className="text-[11px] text-slate-300">
                  <strong className="text-emerald-400 font-mono-code">C</strong> is in the 5-letter word and in the <span className="underline decoration-emerald-400">correct position</span>.
                </p>
              </div>

              <div>
                <div className="flex gap-1.5 mb-1.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-amber-500 border border-amber-400 text-slate-950 font-mono-code font-bold flex items-center justify-center text-sm shadow-sm">
                    R
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    O
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    U
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    T
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    E
                  </div>
                </div>
                <p className="text-[11px] text-slate-300">
                  <strong className="text-amber-400 font-mono-code">R</strong> is in the target word but in the <span className="underline decoration-amber-400">wrong position</span>.
                </p>
              </div>

              <div>
                <div className="flex gap-1.5 mb-1.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-500 font-mono-code font-bold flex items-center justify-center text-sm">
                    P
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-500 font-mono-code font-bold flex items-center justify-center text-sm">
                    I
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono-code font-bold flex items-center justify-center text-sm">
                    X
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-500 font-mono-code font-bold flex items-center justify-center text-sm">
                    E
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-800 border border-slate-700 text-slate-500 font-mono-code font-bold flex items-center justify-center text-sm">
                    L
                  </div>
                </div>
                <p className="text-[11px] text-slate-300">
                  <strong className="text-slate-400 font-mono-code">Grey tiles</strong>: Letters do not occur in the target answer.
                </p>
              </div>
            </div>
          </div>

          {/* Strict 5-Letter Rule */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
              <span>Strict 5-Letter CS Words (5 Columns & 6 Rows)</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Every hidden answer contains exactly 5 English letters (e.g. <span className="font-mono-code text-cyan-300">CLASS</span>, <span className="font-mono-code text-cyan-300">ARRAY</span>, <span className="font-mono-code text-cyan-300">DEBUG</span>, <span className="font-mono-code text-cyan-300">LOGIC</span>, <span className="font-mono-code text-cyan-300">PIXEL</span>, <span className="font-mono-code text-cyan-300">CACHE</span>, <span className="font-mono-code text-cyan-300">ROUTE</span>). Longer words such as PYTHON, STRING, BINARY, SERVER, or MEMORY are never hidden answers. You have exactly 6 attempts to decode the term. Repeated letters are handled accurately according to official Wordle rules.
            </p>
          </div>

          {/* Unlimited Hints system */}
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40">
            <h4 className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Unlimited Progressive Clue Engine</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
              <li>
                <strong className="text-white">Zero Penalty:</strong> Get unlimited clues anytime with no guess penalty and no wait time!
              </li>
              <li>
                <strong className="text-amber-300">Progressive Stages:</strong> Clues progressively reveal syllabus context, operational purpose, code syntax/examples, and letter structure.
              </li>
            </ul>
          </div>

          {/* Curriculum */}
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
            <h4 className="font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Class 11 & 12 Syllabus Coverage</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Every word is directly curated from CBSE / ICSE / state senior secondary syllabi: Python programming, Database & SQL queries, Computer Networks, Cybersecurity & Cyber Law, Hardware architectures, and Data Structures.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-md shadow-cyan-500/20 transition"
        >
          Got It, Let’s Play!
        </button>
      </div>
    </div>
  );
};
