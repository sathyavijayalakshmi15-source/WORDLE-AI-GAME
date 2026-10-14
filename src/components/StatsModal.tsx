import React from 'react';
import { X, Flame, Award, Hash, CheckCircle2 } from 'lucide-react';
import { UserStats } from '../types/game';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  const maxDistributionCount = Math.max(
    1,
    ...Object.values(stats.winDistribution)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b1322] border border-slate-700/80 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close stats"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <span>Player Statistics</span>
        </h2>

        {/* 4 Big Metrics */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono-code">
              {stats.gamesPlayed}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Played</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono-code">
              {winPercentage}%
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Win %</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono-code flex items-center justify-center gap-0.5">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{stats.currentStreak}</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Current</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono-code">
              {stats.maxStreak}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Max</div>
          </div>
        </div>

        {/* Guess Distribution */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 font-mono-code">
            Guess Distribution
          </h3>
          <div className="space-y-1.5">
            {[1, 2, 3, 4, 5, 6].map((attempt) => {
              const count = stats.winDistribution[attempt] || 0;
              const widthPct = Math.max(8, Math.round((count / maxDistributionCount) * 100));

              return (
                <div key={attempt} className="flex items-center gap-2 text-xs">
                  <span className="w-3 font-mono-code font-bold text-slate-400">{attempt}</span>
                  <div className="flex-1 bg-slate-900 rounded h-5 overflow-hidden flex items-center">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className={`h-full flex items-center justify-end px-2 text-[11px] font-mono-code font-bold transition-all duration-500 ${
                        count > 0 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Concept bank summary */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">Terms Mastered in Concept Bank</span>
          </div>
          <span className="font-mono-code font-bold text-cyan-400">
            {stats.unlockedWords.length} terms
          </span>
        </div>
      </div>
    </div>
  );
};
