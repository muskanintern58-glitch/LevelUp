import React from 'react';
import { UserProfile, AvatarOptions } from '../types';
import { soundEngine } from '../utils/audio';
import { User, Sparkles, Check, Palette } from 'lucide-react';

interface AvatarViewProps {
  user: UserProfile;
  onUpdateAvatar: (avatar: AvatarOptions) => void;
}

export const AvatarView: React.FC<AvatarViewProps> = ({ user, onUpdateAvatar }) => {
  const hairstyles = [
    { id: 'soft_waves', name: 'Soft Waves', icon: '💇‍♀️' },
    { id: 'cute_bun', name: 'Cozy Bun', icon: '🏼' },
    { id: 'short_crop', name: 'Short Crop', icon: '💇‍♂️' },
    { id: 'ponytail', name: 'High Ponytail', icon: '👱‍♀️' },
  ];

  const outfits = [
    { id: 'pastel_sweater', name: 'Pastel Rose Sweater', icon: '🧥' },
    { id: 'cozy_hoodie', name: 'Dev Hoodie', icon: '👕' },
    { id: 'study_kimono', name: 'Cozy Kimono', icon: '👘' },
    { id: 'academic_blazer', name: 'Scholar Blazer', icon: '👔' },
  ];

  const accessories = [
    { id: 'cat_ears', name: 'Cute Cat Ears', icon: '🐱' },
    { id: 'round_glasses', name: 'Round Glasses', icon: '👓' },
    { id: 'flower_pin', name: 'Sakura Pin', icon: '🌸' },
    { id: 'wizard_hat', name: 'Wizard Hat', icon: '🧙' },
  ];

  const expressions = [
    { id: 'happy_smile', name: 'Happy Smile', icon: '😊' },
    { id: 'wink_sparkle', name: 'Playful Wink', icon: '😉' },
    { id: 'zen_calm', name: 'Zen Calm', icon: '😌' },
    { id: 'focused_eyes', name: 'Focus Mode', icon: '🤓' },
  ];

  const currentAvatar = user.avatar;

  const handleSelect = (key: keyof AvatarOptions, val: string) => {
    soundEngine.playPop();
    onUpdateAvatar({
      ...currentAvatar,
      [key]: val,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner - Vibrant Palette */}
      <div className="bg-[#C9E4DE] dark:bg-slate-800 p-6 sm:p-8 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[4px_4px_0px_#EAE6DF] dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-white font-black text-xs shadow-xs mb-2">
            <User className="w-3.5 h-3.5 text-[#118AB2]" />
            <span>Cozy Character Customizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white tracking-tight">
            Custom Avatar & Title 👤
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 max-w-lg mt-1">
            Express your unique vibe with hairstyles, cute accessories, and expressions!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Avatar Preview Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-8 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs flex flex-col items-center justify-center text-center space-y-4">
          
          <div className="relative w-44 h-44 rounded-[32px] bg-[#FFD166] border-4 border-[#F4A261] shadow-xs flex items-center justify-center text-6xl">
            <div className="relative">
              {/* Expression */}
              <span>
                {expressions.find((e) => e.id === currentAvatar.expression)?.icon || '😊'}
              </span>
              {/* Accessory */}
              <span className="absolute -top-6 -right-2 text-3xl">
                {accessories.find((a) => a.id === currentAvatar.accessory)?.icon}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#2D3142] dark:text-white text-lg">
              {user.name}
            </h3>
            <p className="text-xs font-black text-[#EF476F] mt-0.5">
              Level {user.level} • {user.title}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-black text-[#2D3142] dark:text-slate-300 bg-[#F8F9FA] dark:bg-slate-900 px-4 py-2 rounded-2xl border-2 border-[#EAE6DF] dark:border-slate-800">
            <Sparkles className="w-4 h-4 text-[#F4A261]" />
            <span>Cozy RPG Profile Active</span>
          </div>

        </div>

        {/* Right Customization Options (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-8 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs space-y-6">
          
          {/* Hairstyle Picker */}
          <div>
            <h4 className="text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Palette className="w-4 h-4 text-[#EF476F]" />
              <span>Hairstyle</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {hairstyles.map((hair) => {
                const isSelected = currentAvatar.hairstyle === hair.id;
                return (
                  <button
                    key={hair.id}
                    onClick={() => handleSelect('hairstyle', hair.id)}
                    className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                      isSelected
                        ? 'bg-[#FDF0D5] dark:bg-amber-950/60 border-[#F4A261] text-[#2D3142] dark:text-amber-300 font-black shadow-xs'
                        : 'bg-[#F8F9FA] dark:bg-slate-900 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-slate-300 hover:border-[#118AB2]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{hair.icon}</div>
                    <div className="text-[11px] font-black">{hair.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Outfits Picker */}
          <div>
            <h4 className="text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase tracking-wider mb-2">
              Cozy Outfit
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {outfits.map((outfit) => {
                const isSelected = currentAvatar.outfit === outfit.id;
                return (
                  <button
                    key={outfit.id}
                    onClick={() => handleSelect('outfit', outfit.id)}
                    className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                      isSelected
                        ? 'bg-[#C9E4DE] dark:bg-teal-950/60 border-[#A7C4BC] text-[#2D3142] dark:text-teal-300 font-black shadow-xs'
                        : 'bg-[#F8F9FA] dark:bg-slate-900 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-slate-300 hover:border-[#118AB2]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{outfit.icon}</div>
                    <div className="text-[11px] font-black">{outfit.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accessories Picker */}
          <div>
            <h4 className="text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase tracking-wider mb-2">
              Headwear & Accessories
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {accessories.map((acc) => {
                const isSelected = currentAvatar.accessory === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => handleSelect('accessory', acc.id)}
                    className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                      isSelected
                        ? 'bg-[#FFD166] dark:bg-amber-950/60 border-[#F4A261] text-[#2D3142] dark:text-amber-300 font-black shadow-xs'
                        : 'bg-[#F8F9FA] dark:bg-slate-900 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-slate-300 hover:border-[#118AB2]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{acc.icon}</div>
                    <div className="text-[11px] font-black">{acc.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expressions Picker */}
          <div>
            <h4 className="text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase tracking-wider mb-2">
              Expression
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {expressions.map((exp) => {
                const isSelected = currentAvatar.expression === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleSelect('expression', exp.id)}
                    className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                      isSelected
                        ? 'bg-[#06D6A0] text-white border-[#05B386] font-black shadow-xs'
                        : 'bg-[#F8F9FA] dark:bg-slate-900 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-slate-300 hover:border-[#118AB2]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{exp.icon}</div>
                    <div className="text-[11px] font-black">{exp.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

