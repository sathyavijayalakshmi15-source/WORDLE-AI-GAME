import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen, Terminal, GraduationCap, Lock, CheckCircle2 } from 'lucide-react';
import { CS_WORDS } from '../data/wordDatabase';
import { WordCategory, WordEntry } from '../types/game';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedWords: string[];
}

const CATEGORIES: (WordCategory | 'All')[] = [
  'All',
  'Python',
  'Database & SQL',
  'Computer Networks',
  'Cybersecurity',
  'Data Structures',
  'Hardware & Architecture',
  'Operating Systems & Software',
  'Computer Fundamentals',
];

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  unlockedWords,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | 'All'>('All');
  const [activeWord, setActiveWord] = useState<WordEntry | null>(null);

  const unlockedSet = useMemo(() => new Set(unlockedWords.map((w) => w.toUpperCase())), [unlockedWords]);

  const filteredWords = useMemo(() => {
    return CS_WORDS.filter((item) => {
      const matchesSearch =
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden">
      <div className="bg-[#0b1322] border border-slate-700/80 rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl relative my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Class 12 CS Concept Bank</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono-code border border-cyan-800/60">
                  {unlockedSet.size} / {CS_WORDS.length} Mastered
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore syllabus definitions, code examples, and board exam tips.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close glossary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900/60 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search concepts by keyword or definition (e.g. recursion, SQL, router)..."
              className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Split View for desktop or list */}
        <div className="flex-1 flex overflow-hidden">
          {/* List column */}
          <div className="w-full md:w-1/2 border-r border-slate-800/80 overflow-y-auto p-3 space-y-2">
            {filteredWords.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No matching terms found. Try a different query or category filter.
              </div>
            ) : (
              filteredWords.map((item) => {
                const isMastered = unlockedSet.has(item.word);
                const isSelected = activeWord?.word === item.word;

                return (
                  <button
                    key={item.word}
                    onClick={() => setActiveWord(item)}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/80'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code font-bold text-white text-sm">
                          {item.word}
                        </span>
                        {isMastered ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-800/50">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Solved</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Lock className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5 max-w-[280px]">
                        {item.definition}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-800 text-cyan-300 ml-2 shrink-0">
                      {item.category.split(' ')[0]}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Details column (Desktop right pane, mobile overlay) */}
          <div className="hidden md:flex flex-1 flex-col overflow-y-auto p-5 bg-[#080d18]">
            {activeWord ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono-code">
                      {activeWord.word}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeWord.category} · {activeWord.length} Letters · Difficulty: {activeWord.difficulty}
                    </p>
                  </div>
                  {unlockedSet.has(activeWord.word) && (
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 text-xs font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Unlocked in Game</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Academic Definition</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed text-sm">
                    {activeWord.definition}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-2">
                    <Terminal className="w-4 h-4" />
                    <span>Code Syntax & Implementation</span>
                  </div>
                  <pre className="font-mono-code text-xs p-3 rounded-lg bg-slate-950 text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed border border-slate-850">
                    {activeWord.example}
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/50 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Board Exam Key Note</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {activeWord.examTip}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs p-6">
                <BookOpen className="w-10 h-10 mb-2 opacity-30 text-cyan-400" />
                <p className="font-medium text-slate-300">Select any term to inspect syllabus notes</p>
                <p className="text-slate-500 mt-1 max-w-xs">
                  Browse definitions, syntax, and board exam tips for Python, SQL, Networks, and Data Structures.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
