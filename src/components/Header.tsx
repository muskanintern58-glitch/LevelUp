import React, { useState } from 'react';
import { UserProfile } from '../types';
import { soundEngine } from '../utils/audio';
import { getXpForNextLevel } from '../utils/storage';
import { 
  Sparkles, 
  Coins, 
  Flame, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Code2, 
  Bot, 
  User as UserIcon,
  CheckSquare,
  Network,
  Flower2,
  Home,
  Gift,
  BarChart3,
  LogIn,
  LogOut,
  RotateCcw,
  X
} from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenAICoach: () => void;
  onOpenCodeHub: () => void;
  onOpenAuth: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onResetData?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled,
  onOpenAICoach,
  onOpenCodeHub,
  onOpenAuth,
  isLoggedIn,
  onLogout,
  onResetData,
}) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const xpNeeded = getXpForNextLevel(user.level);
  const xpPercent = Math.min(100, Math.round((user.currentXp / xpNeeded) * 100));

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Quests', icon: CheckSquare },
    { id: 'skilltree', label: 'Skill Tree', icon: Network },
    { id: 'garden', label: 'Garden', icon: Flower2 },
    { id: 'room', label: 'Study Room', icon: Sparkles },
    { id: 'avatar', label: 'Avatar', icon: UserIcon },
    { id: 'shop', label: 'Shop', icon: Gift },
    { id: 'analytics', label: 'Journal', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-[#EAE6DF] dark:border-slate-800 transition-colors duration-300 shadow-xs">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Level Badge */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => { soundEngine.playPop(); setActiveTab('home'); }}
              className="flex items-center space-x-3 text-left group"
            >
              <div className="w-12 h-12 bg-[#FFD166] rounded-2xl border-4 border-[#F4A261] flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
                🌸
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#2D3142] dark:text-white tracking-tight italic">
                  LevelUp
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9A8C98]">
                  Cozy Growth Engine
                </p>
              </div>
            </button>

            {/* Level & XP Bar */}
            <div className="hidden md:flex items-center space-x-3 pl-4 border-l-2 border-[#EAE6DF] dark:border-slate-700">
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-black text-[#EF476F]">LEVEL {user.level}</span>
                  <div className="w-36 h-3 bg-[#F0F0F0] dark:bg-slate-800 rounded-full overflow-hidden border-2 border-[#EAE6DF] dark:border-slate-700">
                    <div 
                      className="h-full bg-[#EF476F] transition-all duration-500"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#9A8C98]">
                    {user.currentXp}/{xpNeeded} XP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Widgets (Coins, Streak, Controls) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Coins & Streak Stats Group */}
            <div className="flex items-center space-x-2 bg-[#F8F9FA] dark:bg-slate-800/90 px-3 py-1.5 rounded-2xl border-2 border-[#EAE6DF] dark:border-slate-700">
              {/* Coins Widget */}
              <button 
                onClick={() => { soundEngine.playCoinJingle(); setActiveTab('shop'); }}
                className="flex items-center space-x-1.5 text-xs font-black hover:scale-105 transition-transform"
                title="Click to visit Reward Shop"
              >
                <span className="text-base">✨</span>
                <span className="font-black text-[#06D6A0]">{user.coins}</span>
              </button>

              <div className="w-[2px] h-5 bg-[#EAE6DF] dark:bg-slate-700" />

              {/* Streak Widget */}
              <div 
                className="group relative flex items-center space-x-1.5 text-xs font-black cursor-help"
              >
                <span className="text-base">🔥</span>
                <span className="font-black text-[#F4A261]">{user.currentStreak}d</span>

                {/* Anti-guilt Tooltip */}
                <div className="absolute right-0 top-full mt-2 w-56 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-[#EAE6DF] dark:border-slate-700 text-xs text-[#2D3142] dark:text-slate-200 hidden group-hover:block z-50 pointer-events-none">
                  <p className="font-black text-[#EF476F] mb-1">
                    🔥 {user.currentStreak}-Day Consistency Streak
                  </p>
                  <p className="text-[11px] font-medium leading-relaxed">
                    No guilt here! Skipping a day will never destroy your hard work. You earn progress every time you show up 🌸
                  </p>
                </div>
              </div>
            </div>

            {/* AI Coach Button */}
            <button
              onClick={() => { soundEngine.playPop(); onOpenAICoach(); }}
              className="p-2.5 rounded-2xl bg-[#FDF0D5] dark:bg-amber-950/40 border-2 border-[#F4A261] text-[#735D36] dark:text-amber-300 hover:brightness-105 transition-all relative"
              title="Ask Mochi AI Study Coach"
            >
              <Bot className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#06D6A0] rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
            </button>

            {/* Spring Boot & MySQL Hub Button */}
            <button
              onClick={() => { soundEngine.playPop(); onOpenCodeHub(); }}
              className="p-2.5 rounded-2xl bg-[#C9E4DE] dark:bg-teal-950/40 border-2 border-[#A7C4BC] text-[#2D3142] dark:text-teal-300 hover:brightness-105 transition-all"
              title="Spring Boot & MySQL Code Hub"
            >
              <Code2 className="w-4 h-4" />
            </button>

            {/* Toggle Sound */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                soundEngine.setSoundEnabled(next);
                if (next) soundEngine.playPop();
              }}
              className="p-2.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#4A4A4A] dark:text-slate-300 hover:bg-[#EAE6DF]/50 transition-colors"
              title={soundEnabled ? 'Mute audio' : 'Unmute sound effects'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#9A8C98]" />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                soundEngine.playPop();
                setDarkMode(!darkMode);
              }}
              className="p-2.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#4A4A4A] dark:text-slate-300 hover:bg-[#EAE6DF]/50 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#FFD166]" /> : <Moon className="w-4 h-4 text-[#118AB2]" />}
            </button>

            {/* Auth / Profile & Reset Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {onResetData && (
                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      setShowResetModal(true);
                    }}
                    className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-2 rounded-2xl bg-[#FFD166] text-[#2D3142] font-black text-[11px] sm:text-xs border-b-4 border-[#F4A261] hover:brightness-105 active:border-b-0 transition-all shadow-xs"
                    title="Reset your account progress back to Level 1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline sm:inline">Reset Progress</span>
                    <span className="xs:hidden sm:hidden">Reset</span>
                  </button>
                )}
                <button
                  onClick={() => { soundEngine.playPop(); onLogout && onLogout(); }}
                  className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-2 rounded-2xl bg-[#EF476F] text-white font-black text-[11px] sm:text-xs border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0 transition-all shadow-xs"
                  title="Log out of session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log Out ({user.name})</span>
                  <span className="sm:hidden">Log Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { soundEngine.playPop(); onOpenAuth(); }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-[#118AB2] text-white font-black text-xs border-b-4 border-[#0E7494] hover:brightness-105 active:border-b-0 transition-all shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>

        </div>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-6 border-2 border-[#F4A261] dark:border-slate-700 shadow-2xl relative text-center animate-scale-up">
              <button
                onClick={() => { soundEngine.playPop(); setShowResetModal(false); }}
                className="absolute top-4 right-4 p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#FFD166]/30 text-[#F4A261] flex items-center justify-center text-2xl mx-auto mb-3 font-bold">
                🔄
              </div>

              <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-1">
                Reset Account Progress?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                Are you sure you want to reset all tasks, XP, level, garden plants, and room decor for <strong className="text-rose-500">{user.name}</strong> back to Level 1?
              </p>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => { soundEngine.playPop(); setShowResetModal(false); }}
                  className="flex-1 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playTaskComplete();
                    setShowResetModal(false);
                    if (onResetData) onResetData();
                  }}
                  className="flex-1 py-2.5 rounded-2xl bg-[#EF476F] text-white font-extrabold text-xs shadow-md hover:brightness-105 transition-all"
                >
                  Yes, Reset to Level 1
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile XP Bar */}
        <div className="md:hidden pb-3">
          <div className="flex items-center justify-between text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
            <span className="text-[#EF476F]">LEVEL {user.level} ({user.title})</span>
            <span className="text-[#9A8C98]">{user.currentXp}/{xpNeeded} XP</span>
          </div>
          <div className="w-full bg-[#F0F0F0] dark:bg-slate-800 h-3 rounded-full overflow-hidden border-2 border-[#EAE6DF] dark:border-slate-700">
            <div 
              className="bg-[#EF476F] h-full transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-2 overflow-x-auto py-2.5 no-scrollbar border-t-2 border-[#EAE6DF] dark:border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playPop();
                  setActiveTab(item.id);
                }}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#118AB2] text-white border-2 border-[#0E7494] shadow-[2px_2px_0px_#0E7494]'
                    : 'bg-white dark:bg-slate-800 text-[#9A8C98] dark:text-slate-400 border-2 border-[#EAE6DF] dark:border-slate-700 hover:text-[#2D3142] dark:hover:text-white hover:border-[#118AB2]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};

