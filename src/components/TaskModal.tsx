import React, { useState } from 'react';
import { Task, CategoryType, DifficultyType } from '../types';
import { soundEngine } from '../utils/audio';
import { X, Sparkles, Plus, Check } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  initialCategory?: CategoryType;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, initialCategory = 'Core Java' }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>(initialCategory);
  const [difficulty, setDifficulty] = useState<DifficultyType>('EASY');
  const [skillTag, setSkillTag] = useState('');

  if (!isOpen) return null;

  const categories: CategoryType[] = [
    'Core Java',
    'DSA',
    'Java Full Stack',
    'MERN',
    'AI/ML',
    'Languages',
    'Fitness',
    'Reading',
    'Coding',
    'Hobbies',
    'Custom Tasks',
  ];

  const difficulties: Array<{ id: DifficultyType; label: string; xp: number; coins: number; color: string; emoji: string }> = [
    { id: 'EASY', label: 'Easy', xp: 10, coins: 5, color: 'bg-[#C9E4DE] text-[#2D3142] border-[#A7C4BC]', emoji: '🌱' },
    { id: 'MEDIUM', label: 'Medium', xp: 20, coins: 10, color: 'bg-[#118AB2] text-white border-[#0E7494]', emoji: '⚡' },
    { id: 'HARD', label: 'Hard', xp: 40, coins: 20, color: 'bg-[#FFD166] text-[#2D3142] border-[#F4A261]', emoji: '🔥' },
    { id: 'BOSS', label: 'Boss Battle', xp: 100, coins: 50, color: 'bg-[#EF476F] text-white border-[#C73859]', emoji: '🐉' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    soundEngine.playPop();
    const selectedDiff = difficulties.find((d) => d.id === difficulty)!;

    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      difficulty,
      xp: selectedDiff.xp,
      coins: selectedDiff.coins,
      skillTag: skillTag.trim() || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-[32px] max-w-lg w-full p-6 sm:p-8 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-2xl animate-scale-up space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#EAE6DF] dark:border-slate-700">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-[#FDF0D5] text-[#2D3142] border-2 border-[#F4A261]">
              <Sparkles className="w-5 h-5 text-[#EF476F]" />
            </div>
            <h3 className="font-black text-[#2D3142] dark:text-white text-lg">
              Create New Quest
            </h3>
          </div>
          <button
            onClick={() => { soundEngine.playPop(); onClose(); }}
            className="p-1.5 rounded-xl text-[#2D3142] dark:text-slate-300 hover:bg-[#F8F9FA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
              Quest Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve 2 LeetCode HashMap problems or Read 15 mins"
              className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs sm:text-sm font-bold text-[#2D3142] dark:text-white focus:border-[#118AB2] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
              Cozy Notes & Steps
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Break down your quest into small comfortable steps..."
              className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs sm:text-sm font-bold text-[#2D3142] dark:text-white focus:border-[#118AB2] outline-none resize-none"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
              Quest Domain / Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs sm:text-sm font-black text-[#2D3142] dark:text-white focus:border-[#118AB2] outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Cards */}
          <div>
            <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-2">
              Difficulty & Reward Tier
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {difficulties.map((diff) => {
                const isSelected = difficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => { soundEngine.playPop(); setDifficulty(diff.id); }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-2 font-black shadow-xs ' + diff.color
                        : 'bg-[#F8F9FA] dark:bg-slate-900 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-slate-300 hover:border-[#118AB2]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black text-xs mb-1">
                      <span>{diff.emoji} {diff.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-[11px] font-bold opacity-90">
                      +{diff.xp} XP • +{diff.coins} Coins
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skill Tag */}
          <div>
            <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
              Skill Tag (Optional)
            </label>
            <input
              type="text"
              value={skillTag}
              onChange={(e) => setSkillTag(e.target.value)}
              placeholder="e.g. Collections, Spring Boot, Recursion"
              className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs sm:text-sm font-bold text-[#2D3142] dark:text-white focus:border-[#118AB2] outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#EF476F] text-white font-black text-xs border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0 transition-all flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Quest & Earn XP! 🌸</span>
          </button>

        </form>

      </div>
    </div>
  );
};

