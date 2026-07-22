import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';
import { Sparkles, Trophy, Coins, Check } from 'lucide-react';

interface LevelUpModalProps {
  level: number;
  unlockedTitle?: string;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, unlockedTitle = 'Master Adventurer', onClose }) => {
  useEffect(() => {
    // Play celebratory level up fanfare
    soundEngine.playLevelUpFanfare();

    // Trigger canvas confetti fireworks
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-8 max-w-sm w-full text-center border-4 border-[#EAE6DF] dark:border-slate-700 shadow-2xl relative overflow-hidden animate-scale-up space-y-4">
        
        {/* Level Up Badge */}
        <div className="relative mx-auto w-24 h-24 mb-2">
          <div className="w-full h-full rounded-[28px] bg-[#FFD166] border-4 border-[#F4A261] flex items-center justify-center text-[#2D3142] text-4xl font-black shadow-xs animate-bounce">
            {level}
          </div>
          <div className="absolute -top-2 -right-2 p-1.5 bg-[#EF476F] text-white rounded-full border-2 border-white animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-[#FDF0D5] text-[#735D36] font-black text-xs uppercase tracking-wider border border-[#F4A261]/40">
          Level Up Unlocked! 🌸
        </span>

        <h2 className="text-2xl font-black text-[#2D3142] dark:text-white">
          You Reached Level {level}!
        </h2>

        <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed">
          Your consistency is blooming! Keep following your cozy path step by step.
        </p>

        {/* Rewards Box */}
        <div className="p-4 rounded-2xl bg-[#FDF0D5] border-2 border-[#F4A261]/60 flex items-center justify-around text-xs font-black text-[#2D3142]">
          <div className="flex items-center space-x-1.5">
            <Coins className="w-4 h-4 text-[#FFD166]" />
            <span>+25 Bonus Coins</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Trophy className="w-4 h-4 text-[#118AB2]" />
            <span>{unlockedTitle}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            soundEngine.playPop();
            onClose();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#EF476F] text-white font-black text-xs border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0 transition-all flex items-center justify-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Keep Leveling Up! ✨</span>
        </button>

      </div>
    </div>
  );
};

