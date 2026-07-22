import React, { useState } from 'react';
import { RoomDecorItem, UserProfile } from '../types';
import { soundEngine } from '../utils/audio';
import { Home, ShoppingBag, Check, Coins, Sparkles, Heart } from 'lucide-react';

interface RoomViewProps {
  user: UserProfile;
  roomDecor: RoomDecorItem[];
  onBuyItem: (itemId: string) => void;
  onEquipItem: (itemId: string) => void;
}

export const RoomView: React.FC<RoomViewProps> = ({ user, roomDecor, onBuyItem, onEquipItem }) => {
  const [activeTab, setActiveTab] = useState<'ROOM' | 'STORE'>('ROOM');

  const equippedItems = roomDecor.filter((item) => item.equipped);
  const getEquipped = (cat: string) => roomDecor.find((i) => i.category === cat && i.equipped);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner - Vibrant Palette */}
      <div className="bg-[#FFD166] dark:bg-slate-800 p-6 sm:p-8 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[4px_4px_0px_#EAE6DF] dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-white font-black text-xs shadow-xs mb-2">
            <Home className="w-3.5 h-3.5 text-[#F4A261]" />
            <span>Cozy RPG Study Corner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white tracking-tight">
            Study Room Decorator 🛋️
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 max-w-lg mt-1">
            Decorate your personal sanctuary using coins earned from completed study quests!
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => { soundEngine.playPop(); setActiveTab('ROOM'); }}
            className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'ROOM'
                ? 'bg-[#118AB2] text-white border-2 border-[#0E7494] shadow-[2px_2px_0px_#0E7494]'
                : 'bg-white dark:bg-slate-800 text-[#2D3142] dark:text-slate-300 border-2 border-[#EAE6DF] dark:border-slate-700 hover:border-[#118AB2]'
            }`}
          >
            🛋️ Study Room
          </button>
          <button
            onClick={() => { soundEngine.playPop(); setActiveTab('STORE'); }}
            className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              activeTab === 'STORE'
                ? 'bg-[#118AB2] text-white border-2 border-[#0E7494] shadow-[2px_2px_0px_#0E7494]'
                : 'bg-white dark:bg-slate-800 text-[#2D3142] dark:text-slate-300 border-2 border-[#EAE6DF] dark:border-slate-700 hover:border-[#118AB2]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Decor Shop</span>
          </button>
        </div>
      </div>

      {activeTab === 'ROOM' ? (
        /* Visual Interactive Room Canvas */
        <div className="relative w-full min-h-[420px] bg-[#FDF0D5] dark:bg-slate-900 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 p-6 sm:p-10 shadow-xs overflow-hidden flex flex-col justify-between">
          
          {/* Wall Window Background */}
          <div className="flex justify-between items-start">
            
            {/* Window */}
            {getEquipped('WINDOW') ? (
              <div className="p-4 rounded-3xl bg-sky-100 dark:bg-slate-800 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs text-center">
                <div className="text-4xl animate-pulse">🌧️</div>
                <span className="text-[10px] font-black text-[#2D3142] dark:text-sky-300">Rainy Vibe</span>
              </div>
            ) : (
              <div className="p-4 rounded-3xl bg-[#FFD166]/50 dark:bg-slate-800/80 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs text-center">
                <div className="text-4xl">☀️</div>
                <span className="text-[10px] font-black text-[#2D3142] dark:text-amber-300">Cozy Day</span>
              </div>
            )}

            {/* Wall Lamp */}
            {getEquipped('LAMP') && (
              <div className="p-3 rounded-2xl bg-[#FFD166] border-2 border-[#F4A261] shadow-xs animate-pulse">
                <div className="text-3xl">💡</div>
              </div>
            )}

            {/* Bookshelf */}
            {getEquipped('SHELF') && (
              <div className="p-4 rounded-2xl bg-[#C9E4DE] border-2 border-[#A7C4BC] text-center shadow-xs">
                <div className="text-4xl">📚</div>
                <span className="text-[10px] font-black text-[#2D3142]">Tech Shelf</span>
              </div>
            )}
          </div>

          {/* Center Desk Setup */}
          <div className="my-8 text-center space-y-2">
            <div className="relative inline-block p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-800/90 border-4 border-[#EAE6DF] dark:border-slate-600 shadow-sm max-w-lg w-full">
              
              {/* Items on desk */}
              <div className="flex items-end justify-center space-x-6 mb-2">
                
                {/* Potted Plant */}
                {getEquipped('PLANT') && (
                  <button
                    onClick={() => soundEngine.playWaterPlant()}
                    className="p-2 hover:scale-110 transition-transform cursor-pointer"
                    title="Water Monstera Plant"
                  >
                    <div className="text-4xl">🌿</div>
                  </button>
                )}

                {/* Laptop */}
                {getEquipped('LAPTOP') && (
                  <div className="p-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-700 border-2 border-[#EAE6DF] dark:border-slate-500 shadow-xs text-center">
                    <div className="text-4xl">💻</div>
                    <span className="text-[10px] font-black text-[#2D3142] dark:text-slate-200">Java Dev</span>
                  </div>
                )}

                {/* Cat Mochi */}
                {getEquipped('PET') && (
                  <button
                    onClick={() => soundEngine.playPop()}
                    className="p-2 hover:scale-110 transition-transform cursor-pointer group relative"
                    title="Pet Mochi the Cat!"
                  >
                    <div className="text-4xl animate-bounce">🐱</div>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#EF476F] text-white font-black text-[9px] shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Purr~ ❤️
                    </span>
                  </button>
                )}

              </div>

              {/* Wooden Desk Surface */}
              <div className="w-full h-4 bg-[#F4A261] rounded-full shadow-inner border-2 border-[#D98240]" />
              <div className="text-xs font-black text-[#2D3142] dark:text-amber-200 mt-2">
                Warm Oak Study Sanctuary
              </div>

            </div>
          </div>

          {/* Floor Decor Items */}
          <div className="flex justify-between items-center text-xs font-black text-[#2D3142] dark:text-slate-400">
            <span>{equippedItems.length} Cozy Items Equipped</span>
            <button
              onClick={() => { soundEngine.playPop(); setActiveTab('STORE'); }}
              className="px-4 py-2 rounded-2xl bg-[#EF476F] text-white font-black border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0"
            >
              + Add Decor Items
            </button>
          </div>

        </div>
      ) : (
        /* Store View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {roomDecor.map((item) => {
            const canAfford = user.coins >= item.price;
            return (
              <div
                key={item.id}
                className="p-6 rounded-[32px] bg-white dark:bg-slate-800 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFD166] border-2 border-[#F4A261] flex items-center justify-center text-2xl shrink-0 font-black">
                      {item.emoji}
                    </div>
                    <div>
                      <h4 className="font-black text-[#2D3142] dark:text-white text-base">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-400 line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-[#EAE6DF] dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#2D3142] dark:text-amber-300 font-black text-xs">
                    <span className="text-sm">✨</span>
                    <span className="text-[#06D6A0]">{item.price === 0 ? 'Free Starter' : `${item.price} Coins`}</span>
                  </div>

                  {item.unlocked ? (
                    <button
                      onClick={() => { soundEngine.playPop(); onEquipItem(item.id); }}
                      className={`px-4 py-2 rounded-2xl text-xs font-black transition-colors ${
                        item.equipped
                          ? 'bg-[#C9E4DE] text-[#2D3142] border-2 border-[#A7C4BC]'
                          : 'bg-[#118AB2] text-white border-b-2 border-[#0E7494] hover:brightness-105'
                      }`}
                    >
                      {item.equipped ? 'Equipped ✓' : 'Equip Item'}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (canAfford) {
                          soundEngine.playCoinJingle();
                          onBuyItem(item.id);
                        }
                      }}
                      disabled={!canAfford}
                      className="px-4 py-2 rounded-2xl bg-[#EF476F] text-white font-black text-xs border-b-4 border-[#C73859] hover:brightness-105 disabled:opacity-50 transition-all"
                    >
                      Unlock Item
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

