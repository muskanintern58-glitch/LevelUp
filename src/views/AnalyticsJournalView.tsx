import React, { useState } from 'react';
import { JournalEntry, DailyXPLog, MoodType } from '../types';
import { soundEngine } from '../utils/audio';
import { BarChart3, BookOpen, Smile, Sparkles, Calendar, Plus, Clock, TrendingUp } from 'lucide-react';

interface AnalyticsJournalViewProps {
  journal: JournalEntry[];
  dailyLogs: DailyXPLog[];
  onAddJournalEntry: (mood: MoodType, oneLiner: string, reflection?: string) => void;
}

export const AnalyticsJournalView: React.FC<AnalyticsJournalViewProps> = ({
  journal,
  dailyLogs,
  onAddJournalEntry,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('COZY');
  const [oneLiner, setOneLiner] = useState('');
  const [reflection, setReflection] = useState('');

  const moods: Array<{ id: MoodType; label: string; emoji: string }> = [
    { id: 'COZY', label: 'Cozy', emoji: '😊' },
    { id: 'INSPIRED', label: 'Inspired', emoji: '🌸' },
    { id: 'TIRED', label: 'Tired', emoji: '😴' },
    { id: 'CALM', label: 'Calm', emoji: '🌿' },
    { id: 'FOCUSED', label: 'Focused', emoji: '✨' },
  ];

  const handleSubmitJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oneLiner.trim()) return;

    soundEngine.playTaskComplete();
    onAddJournalEntry(selectedMood, oneLiner.trim(), reflection.trim() || undefined);

    setOneLiner('');
    setReflection('');
  };

  const totalStudyMinutes = dailyLogs.reduce((acc, log) => acc + log.studyMinutes, 0);
  const totalXpGained = dailyLogs.reduce((acc, log) => acc + log.xpGained, 0);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner - Vibrant Palette */}
      <div className="bg-[#C9E4DE] dark:bg-slate-800 p-6 sm:p-8 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[4px_4px_0px_#EAE6DF] dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-white font-black text-xs shadow-xs mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-[#118AB2]" />
            <span>Progress & Reflection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white tracking-tight">
            Analytics & One-Line Journal 📊
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 max-w-lg mt-1">
            Track your weekly XP trends and write gentle one-line daily reflections.
          </p>
        </div>

        {/* Quick Stat Pills */}
        <div className="flex items-center space-x-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-center shadow-xs">
            <div className="text-xs font-black text-[#9A8C98]">Total Study</div>
            <div className="text-sm font-black text-[#118AB2]">
              {Math.round(totalStudyMinutes / 60)} Hrs ({totalStudyMinutes} mins)
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-center shadow-xs">
            <div className="text-xs font-black text-[#9A8C98]">Weekly XP</div>
            <div className="text-sm font-black text-[#06D6A0]">
              +{totalXpGained} XP
            </div>
          </div>
        </div>
      </div>

      {/* Weekly XP Bar Chart & Heatmap */}
      <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-8 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs space-y-4">
        <h3 className="font-black text-[#2D3142] dark:text-white text-base flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-[#118AB2]" />
          <span>Daily Study XP Log</span>
        </h3>

        <div className="grid grid-cols-7 gap-2 pt-4 items-end h-40 border-b-2 border-[#EAE6DF] dark:border-slate-700 pb-2">
          {dailyLogs.map((log, idx) => {
            const heightPercent = Math.min(100, Math.round((log.xpGained / 80) * 100));
            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-black text-[#118AB2] dark:text-indigo-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  +{log.xpGained} XP
                </span>
                <div
                  className="w-full max-w-[28px] bg-[#118AB2] rounded-t-xl border-t-2 border-x-2 border-[#0E7494] transition-all duration-500"
                  style={{ height: `${Math.max(15, heightPercent)}%` }}
                />
                <span className="text-[10px] font-black text-[#9A8C98] mt-2">
                  {log.date.slice(8)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* One-Line Journal Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Write Journal Entry (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-8 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs space-y-4">
          <h3 className="font-black text-[#2D3142] dark:text-white text-base flex items-center space-x-2 border-b-2 border-[#EAE6DF] dark:border-slate-700 pb-3">
            <BookOpen className="w-4 h-4 text-[#EF476F]" />
            <span>Write Today's Reflection</span>
          </h3>

          <form onSubmit={handleSubmitJournal} className="space-y-4">
            
            {/* Mood Selector */}
            <div>
              <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-2">
                How did studying feel today?
              </label>
              <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
                {moods.map((m) => {
                  const isSelected = selectedMood === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { soundEngine.playPop(); setSelectedMood(m.id); }}
                      className={`px-3 py-1.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-[#EF476F] text-white border-2 border-[#C73859] shadow-xs'
                          : 'bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-slate-300'
                      }`}
                    >
                      <span>{m.emoji} {m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* One Liner Input */}
            <div>
              <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
                One-Line Summary *
              </label>
              <input
                type="text"
                required
                value={oneLiner}
                onChange={(e) => setOneLiner(e.target.value)}
                placeholder="e.g. Mastered Java Collections & built 1 Spring REST endpoint!"
                className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-bold text-[#2D3142] dark:text-white outline-none focus:border-[#118AB2]"
              />
            </div>

            {/* Optional Note */}
            <div>
              <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
                Gentle Reflection (Optional)
              </label>
              <textarea
                rows={2}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What went well? Any gentle lessons for tomorrow?"
                className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-bold text-[#2D3142] dark:text-white outline-none focus:border-[#118AB2] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#118AB2] text-white font-black text-xs border-b-4 border-[#0E7494] hover:brightness-105 active:border-b-0 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Save Journal Entry 🌸</span>
            </button>

          </form>
        </div>

        {/* History Entries (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-8 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs space-y-3">
          <h3 className="font-black text-[#2D3142] dark:text-white text-base border-b-2 border-[#EAE6DF] dark:border-slate-700 pb-3">
            Journal History ({journal.length} Entries)
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {journal.map((entry) => {
              const moodObj = moods.find((m) => m.id === entry.mood) || moods[0];
              return (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-[#2D3142] dark:text-white flex items-center space-x-1.5">
                      <span>{moodObj.emoji}</span>
                      <span>{entry.date}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FDF0D5] text-[#735D36] font-black text-[10px] border border-[#F4A261]/40">
                      {moodObj.label}
                    </span>
                  </div>

                  <p className="text-xs font-black text-[#2D3142] dark:text-slate-200 leading-snug">
                    "{entry.oneLiner}"
                  </p>

                  {entry.reflection && (
                    <p className="text-[11px] font-semibold text-[#4A4A4A] dark:text-slate-400 italic">
                      {entry.reflection}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

