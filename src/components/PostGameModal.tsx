import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  XCircle, 
  Share2, 
  ArrowRight, 
  BookOpen, 
  Check, 
  Terminal, 
  GraduationCap, 
  Clock, 
  X 
} from 'lucide-react';
import { GameMode, WordEntry } from '../types/game';
import { generateShareText, getDailyPuzzleNumber } from '../utils/wordleLogic';

interface PostGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: WordEntry;
  won: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  guesses: string[];
  mode: GameMode;
  freeHintUsed: boolean;
  penaltyHintUsed: boolean;
  onNextPractice: () => void;
  onOpenGlossary: () => void;
}

export const PostGameModal: React.FC<PostGameModalProps> = ({
  isOpen,
  onClose,
  word,
  won,
  attemptsUsed,
  maxAttempts,
  guesses,
  mode,
  freeHintUsed,
  penaltyHintUsed,
  onNextPractice,
  onOpenGlossary,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeUntilNextDay, setTimeUntilNextDay] = useState('');

  // Fire celebratory confetti on win!
  useEffect(() => {
    if (isOpen && won) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#f59e0b', '#3b82f6'],
        });
      } catch (err) {
        // ignore if canvas not supported
      }
    }
  }, [isOpen, won]);

  // Compute countdown to midnight for Daily mode
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeUntilNextDay(
        `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const hintsCount = (freeHintUsed ? 1 : 0) + (penaltyHintUsed ? 1 : 0);

  const handleShare = async () => {
    const text = generateShareText(
      word.word,
      guesses,
      won,
      attemptsUsed,
      mode,
      maxAttempts,
      hintsCount
    );

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        // fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1322] border border-slate-700/80 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status header banner */}
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
              won
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-emerald-500/10'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-rose-500/10'
            }`}
          >
            {won ? <Trophy className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">
                {won ? 'Compilation Succeeded!' : 'Execution Terminated'}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {won
                ? `You decoded the target in ${attemptsUsed} of ${maxAttempts} attempts!`
                : `Out of attempts! The target keyword is revealed below.`}
            </p>
          </div>
        </div>

        {/* Word Reveal Hero */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-950/80 text-center mb-4">
          <span className="text-[10px] uppercase font-mono-code tracking-widest text-slate-400">
            Target CS Term
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 font-mono-code my-1">
            {word.word}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-1">
            <span className="text-cyan-300 font-medium">{word.category}</span>
            <span>·</span>
            <span>{word.length} Letters</span>
            <span>·</span>
            <span className="capitalize">{word.difficulty}</span>
          </div>
        </div>

        {/* Educational Breakdown (Learn Mode) */}
        <div className="space-y-3 mb-5 max-h-[42vh] overflow-y-auto pr-1">
          {/* Definition */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Definition & Concept:</span>
            </div>
            <p className="text-slate-200 leading-relaxed">{word.definition}</p>
          </div>

          {/* Example / Code Snippet */}
          <div className="p-3 rounded-xl bg-[#070d18] border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Syntax & Example:</span>
              </div>
              <span className="text-[10px] font-mono-code text-slate-500">Live Code</span>
            </div>
            <pre className="font-mono-code text-[11.5px] p-2.5 rounded-lg bg-slate-950 text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed border border-slate-900">
              {word.example}
            </pre>
          </div>

          {/* Class 12 Board Exam Tip */}
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Class 12 Board Exam Tip:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{word.examTip}</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={handleShare}
            className={`w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-md ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-950" />
                <span>Share Results</span>
              </>
            )}
          </button>

          {mode === 'practice' ? (
            <button
              onClick={() => {
                onClose();
                onNextPractice();
              }}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md shadow-emerald-600/20"
            >
              <span>Next Practice Word</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400">Next Daily In:</div>
                <div className="font-mono-code font-bold text-cyan-300">{timeUntilNextDay}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
