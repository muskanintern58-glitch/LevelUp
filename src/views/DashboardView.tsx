import React, { useState } from 'react';
import { Task, CategoryType, UserProfile, FlowerPlant } from '../types';
import { soundEngine } from '../utils/audio';
import { 
  Sparkles, 
  Plus, 
  Search, 
  CheckCircle2, 
  Circle, 
  Coins, 
  Trash2, 
  Zap, 
  Smile, 
  Bot, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  tasks: Task[];
  plants: FlowerPlant[];
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenNewTaskModal: (category?: CategoryType) => void;
  onOpenAICoach: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  tasks,
  plants,
  onCompleteTask,
  onDeleteTask,
  onOpenNewTaskModal,
  onOpenAICoach,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Array<{ id: string; label: string; emoji: string }> = [
    { id: 'ALL', label: 'All Quests', emoji: '🌟' },
    { id: 'Core Java', label: 'Core Java', emoji: '☕' },
    { id: 'DSA', label: 'DSA', emoji: '⚡' },
    { id: 'Java Full Stack', label: 'Java Full Stack', emoji: '🚀' },
    { id: 'MERN', label: 'MERN', emoji: '💻' },
    { id: 'AI/ML', label: 'AI/ML', emoji: '🤖' },
    { id: 'Languages', label: 'Languages', emoji: '🗣️' },
    { id: 'Fitness', label: 'Fitness', emoji: '🌿' },
    { id: 'Reading', label: 'Reading', emoji: '📚' },
    { id: 'Coding', label: 'Coding', emoji: '💻' },
    { id: 'Hobbies', label: 'Hobbies', emoji: '🎨' },
  ];

  const filteredTasks = tasks.filter((t) => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.skillTag && t.skillTag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const completedToday = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const todayXpEarned = tasks
    .filter((t) => t.completed && t.completedAt === new Date().toISOString().split('T')[0])
    .reduce((acc, t) => acc + t.xp, 0);

  const activePlant = plants.find((p) => p.stage < 3) || plants[0];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Cozy Motivation Card - Vibrant Palette */}
      <div className="bg-[#FDF0D5] dark:bg-slate-800 p-6 sm:p-8 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[4px_4px_0px_#EAE6DF] dark:shadow-none relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#EF476F] font-black text-xs shadow-xs">
              <Smile className="w-3.5 h-3.5" />
              <span>No Guilt, Only Growth 🌸</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white tracking-tight">
              Welcome back, {user.name}! ✨
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 max-w-lg leading-relaxed">
              You earned <strong className="text-[#EF476F] font-black">{todayXpEarned} XP</strong> today! Each completed quest gently waters your <strong className="text-[#06D6A0] font-black">{activePlant?.name || 'garden flowers'}</strong>.
            </p>
          </div>

          {/* Quick AI Coach Tip Callout */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border-3 border-[#EAE6DF] dark:border-slate-700 flex items-center space-x-3.5 shadow-xs md:max-w-xs">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD166] border-2 border-[#F4A261] flex items-center justify-center text-2xl shrink-0">
              🐱
            </div>
            <div className="flex-1 text-xs">
              <p className="font-black text-[#2D3142] dark:text-white mb-0.5">Mochi's Cozy Tip</p>
              <p className="text-[11px] font-medium leading-tight text-[#9A8C98] dark:text-slate-400">
                "Start with just 1 easy 10 XP task! Big progress is just small habits stacked together."
              </p>
            </div>
            <button
              onClick={() => { soundEngine.playPop(); onOpenAICoach(); }}
              className="p-2 rounded-xl bg-[#118AB2] text-white hover:brightness-105 transition-colors shrink-0"
              title="Chat with Mochi"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Action Bar & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#9A8C98] absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quests, skills (e.g. HashMap, Core Java)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs sm:text-sm font-bold text-[#2D3142] dark:text-white focus:outline-none focus:border-[#118AB2]"
          />
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => { soundEngine.playPop(); onOpenNewTaskModal(); }}
          className="px-5 py-3 rounded-2xl bg-[#EF476F] text-white font-black text-xs sm:text-sm border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0 transition-all flex items-center justify-center space-x-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Quest (+10 to 100 XP)</span>
        </button>

      </div>

      {/* Category Pills Bar */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { soundEngine.playPop(); setSelectedCategory(cat.id); }}
              className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#118AB2] text-white border-2 border-[#0E7494] shadow-[2px_2px_0px_#0E7494]'
                  : 'bg-white dark:bg-slate-800 text-[#9A8C98] dark:text-slate-300 border-2 border-[#EAE6DF] dark:border-slate-700 hover:text-[#2D3142] dark:hover:text-white hover:border-[#118AB2]'
              }`}
            >
              <span>{cat.emoji}</span> <span className="ml-1">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quest List Grid */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-[32px] border-4 border-dashed border-[#EAE6DF] dark:border-slate-700 p-8">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#FDF0D5] dark:bg-slate-700 flex items-center justify-center text-3xl">
              🌱
            </div>
            <h3 className="font-black text-[#2D3142] dark:text-white text-lg mb-1">
              No quests found here!
            </h3>
            <p className="text-xs font-semibold text-[#9A8C98] dark:text-slate-400 mb-4 max-w-sm mx-auto">
              Create a new cozy quest or try changing your category filter.
            </p>
            <button
              onClick={() => { soundEngine.playPop(); onOpenNewTaskModal(); }}
              className="px-4 py-2.5 rounded-2xl bg-[#EF476F] text-white font-black text-xs border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0"
            >
              + Create First Quest
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.completed;

            let diffBadgeColor = 'bg-[#C9E4DE] text-[#2D3142] border-[#A7C4BC]';
            let diffEmoji = '🌱';
            if (task.difficulty === 'MEDIUM') {
              diffBadgeColor = 'bg-[#FFD166] text-[#2D3142] border-[#E2B340]';
              diffEmoji = '⚡';
            } else if (task.difficulty === 'HARD') {
              diffBadgeColor = 'bg-[#F4A261] text-white border-[#D98240]';
              diffEmoji = '🔥';
            } else if (task.difficulty === 'BOSS') {
              diffBadgeColor = 'bg-[#EF476F] text-white border-[#C73859] animate-pulse';
              diffEmoji = '🐉';
            }

            return (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl border-3 transition-all duration-200 flex items-start sm:items-center justify-between gap-3 ${
                  isCompleted
                    ? 'bg-[#F8F9FA] dark:bg-slate-900/40 border-[#EAE6DF] dark:border-slate-800 opacity-70'
                    : 'bg-white dark:bg-slate-800 border-[#EAE6DF] dark:border-slate-700 hover:border-[#118AB2] shadow-xs'
                }`}
              >
                
                {/* Checkbox & Task Info */}
                <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => onCompleteTask(task.id)}
                    className="mt-0.5 sm:mt-0 text-[#9A8C98] hover:text-[#06D6A0] transition-colors shrink-0"
                    title={isCompleted ? 'Mark incomplete' : 'Complete quest & earn XP!'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-7 h-7 text-[#06D6A0] fill-[#06D6A0]/20" />
                    ) : (
                      <Circle className="w-7 h-7 hover:scale-110 transition-transform" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border-2 ${diffBadgeColor}`}>
                        {diffEmoji} {task.difficulty}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F8F9FA] dark:bg-slate-700 text-[#2D3142] dark:text-slate-300 text-[10px] font-extrabold border border-[#EAE6DF] dark:border-slate-600">
                        {task.category}
                      </span>
                      {task.skillTag && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FDF0D5] text-[#735D36] text-[10px] font-black border border-[#F4A261]/50">
                          #{task.skillTag}
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm font-black text-[#2D3142] dark:text-white leading-snug ${isCompleted ? 'line-through text-[#9A8C98] dark:text-slate-500' : ''}`}>
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-400 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rewards & Delete Button */}
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="text-right">
                    <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-[#FFD166] text-[#2D3142] border-2 border-[#F4A261] text-xs font-black">
                      <Zap className="w-3.5 h-3.5 fill-[#2D3142]" />
                      <span>+{task.xp} XP</span>
                    </div>
                    <div className="text-[10px] font-black text-[#06D6A0] mt-0.5">
                      +{task.coins} Coins
                    </div>
                  </div>

                  <button
                    onClick={() => { soundEngine.playPop(); onDeleteTask(task.id); }}
                    className="p-2 rounded-xl text-[#9A8C98] hover:text-[#EF476F] hover:bg-[#EF476F]/10 transition-colors"
                    title="Delete quest"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

