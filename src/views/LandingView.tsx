import React from 'react';
import { soundEngine } from '../utils/audio';
import { 
  Sparkles, 
  CheckSquare, 
  Network, 
  Flower2, 
  Home, 
  Gift, 
  Bot, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Flame, 
  UserPlus, 
  LogIn, 
  Play
} from 'lucide-react';

interface LandingViewProps {
  onOpenSignup: () => void;
  onOpenLogin: () => void;
  onExploreDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onOpenSignup,
  onOpenLogin,
  onExploreDemo,
}) => {
  return (
    <div className="space-y-12 animate-fade-in pb-16">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#C9E4DE] via-[#FDF0D5] to-[#FFD166]/40 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 rounded-[36px] p-8 sm:p-12 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[6px_6px_0px_#EAE6DF] dark:shadow-none overflow-hidden">
        
        {/* Decorative Floating Emblems */}
        <div className="absolute top-4 right-6 text-6xl opacity-20 pointer-events-none animate-pulse">
          🌸
        </div>
        <div className="absolute bottom-6 left-8 text-5xl opacity-20 pointer-events-none">
          ☕
        </div>

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-white font-black text-xs shadow-xs">
            <Sparkles className="w-4 h-4 text-[#F4A261] animate-spin" />
            <span>Cozy RPG Life Operating System for Students & Developers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#2D3142] dark:text-white tracking-tight leading-tight italic">
            Turn Your Daily Study & Habits Into A Cozy RPG Journey 🌸
          </h1>

          <p className="text-sm sm:text-base font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed max-w-2xl">
            Designed for students, self-taught developers, job seekers, and ADHD minds. Level up your real-world skills, earn coins, grow a zen garden, and customize your cozy study room — with <strong className="text-[#EF476F]">zero guilt</strong> and maximum encouragement.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundEngine.playPop();
                onOpenSignup();
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#EF476F] hover:brightness-105 text-white font-black text-sm border-b-4 border-[#C73859] shadow-md flex items-center space-x-2 hover:scale-102 transition-transform"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Free Account (Start Level 1)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                onOpenLogin();
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#118AB2] hover:brightness-105 text-white font-black text-sm border-b-4 border-[#0E7494] shadow-md flex items-center space-x-2 hover:scale-102 transition-transform"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                onExploreDemo();
              }}
              className="px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-[#2D3142] dark:text-slate-200 font-extrabold text-sm border-2 border-[#EAE6DF] dark:border-slate-700 hover:border-[#118AB2] shadow-xs flex items-center space-x-2"
            >
              <Play className="w-4 h-4 text-[#06D6A0]" />
              <span>Try Guest Mode</span>
            </button>
          </div>

          <div className="flex items-center space-x-6 pt-3 text-xs font-bold text-[#9A8C98] dark:text-slate-400">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#06D6A0]" />
              <span>No Pressure / Anti-Burnout</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Heart className="w-4 h-4 text-[#EF476F]" />
              <span>100% Free & Open Source</span>
            </span>
          </div>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white">
            Everything You Need to Stay Consistent ☕
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#9A8C98] max-w-lg mx-auto">
            Gamified productivity tools wrapped in a warm, relaxing aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Micro-Quests */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[28px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs hover:border-[#EF476F] transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE5EC] dark:bg-rose-950/50 text-[#EF476F] border-2 border-[#FFC2D1] flex items-center justify-center text-xl font-black">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
              Domain Micro-Quests
            </h3>
            <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed">
              Break down complex subjects (Core Java, DSA, MERN, AI/ML, Fitness, Reading) into bite-sized tasks with XP and coin rewards.
            </p>
          </div>

          {/* Card 2: Custom Skill Tree */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[28px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs hover:border-[#118AB2] transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] dark:bg-sky-950/50 text-[#118AB2] border-2 border-[#BAE6FD] flex items-center justify-center text-xl font-black">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
              Flexible Skill Trees
            </h3>
            <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed">
              Build your own learning roadmap! Add new skill trees, delete unused ones, and insert nodes anywhere — top, middle, or end.
            </p>
          </div>

          {/* Card 3: Cozy Study Room & Shop */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[28px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs hover:border-[#FFD166] transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] dark:bg-amber-950/50 text-[#B45309] border-2 border-[#FDE68A] flex items-center justify-center text-xl font-black">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
              Cozy Room & Avatar
            </h3>
            <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed">
              Spend coins earned from completed tasks to unlock desk plants, ambient lamps, study snacks, wallpapers, and cute outfits.
            </p>
          </div>

          {/* Card 4: AI Coach Mochi */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[28px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs hover:border-[#06D6A0] transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] dark:bg-emerald-950/50 text-[#04A278] border-2 border-[#A7F3D0] flex items-center justify-center text-xl font-black">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
              Mochi AI Study Coach 🐱
            </h3>
            <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed">
              Powered by Gemini 3.6 Flash. Gives gentle, non-judgmental guidance, explains tough programming concepts, and breaks down tasks when stuck.
            </p>
          </div>

          {/* Card 5: Zen Flower Garden */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[28px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs hover:border-[#F4A261] transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] dark:bg-orange-950/50 text-[#C2410C] border-2 border-[#FED7AA] flex items-center justify-center text-xl font-black">
              <Flower2 className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
              Zen Flower Garden
            </h3>
            <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed">
              Plant seeds (Sakura, Sunflowers, Tulips, Lavender), water them daily with study streak points, and watch them bloom into full flowers.
            </p>
          </div>

          {/* Card 6: Anti-Guilt Streaks */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[28px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs hover:border-[#EF476F] transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE5EC] dark:bg-rose-950/50 text-[#EF476F] border-2 border-[#FFC2D1] flex items-center justify-center text-xl font-black">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
              Guilt-Free Consistency
            </h3>
            <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed">
              No losing everything because you took a mental health day. LevelUp encourages progress over perfection and celebrates every small win.
            </p>
          </div>

        </div>
      </div>

      {/* Final Call to Action */}
      <div className="bg-[#118AB2] text-white rounded-[32px] p-8 sm:p-10 border-4 border-[#0E7494] shadow-lg text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Ready to Start Level 1? 🚀
        </h2>
        <p className="text-xs sm:text-sm font-semibold max-w-md mx-auto text-sky-100">
          Create your account in 5 seconds or explore in guest mode.
        </p>
        <div className="flex justify-center items-center gap-3 pt-2">
          <button
            onClick={() => {
              soundEngine.playPop();
              onOpenSignup();
            }}
            className="px-6 py-3 rounded-2xl bg-[#FFD166] text-[#2D3142] font-black text-xs border-b-4 border-[#F4A261] hover:brightness-105"
          >
            Sign Up Now
          </button>
          <button
            onClick={() => {
              soundEngine.playPop();
              onOpenLogin();
            }}
            className="px-6 py-3 rounded-2xl bg-white text-[#2D3142] font-black text-xs border-b-4 border-slate-200 hover:bg-slate-50"
          >
            Log In
          </button>
        </div>
      </div>

    </div>
  );
};
