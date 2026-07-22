import React, { useState } from 'react';
import { RewardItem, UserProfile } from '../types';
import { soundEngine } from '../utils/audio';
import { Gift, Coins, Plus, Check, Sparkles, Heart } from 'lucide-react';

interface RewardShopViewProps {
  user: UserProfile;
  rewards: RewardItem[];
  onRedeemReward: (rewardId: string) => void;
  onAddCustomReward: (reward: Omit<RewardItem, 'id' | 'redeemedCount'>) => void;
}

export const RewardShopView: React.FC<RewardShopViewProps> = ({
  user,
  rewards,
  onRedeemReward,
  onAddCustomReward,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCost, setNewCost] = useState(25);
  const [newIcon, setNewIcon] = useState('🎁');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    soundEngine.playPop();
    onAddCustomReward({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom real-life self-care treat',
      cost: Number(newCost) || 20,
      icon: newIcon || '🎁',
      category: 'CUSTOM',
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner - Vibrant Palette */}
      <div className="bg-[#FFD166] dark:bg-slate-800 p-6 sm:p-8 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[4px_4px_0px_#EAE6DF] dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-white font-black text-xs shadow-xs mb-2">
            <Gift className="w-3.5 h-3.5 text-[#EF476F]" />
            <span>Guilt-Free Self-Care Rewards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white tracking-tight">
            Real-Life Reward Shop 🎁
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 max-w-lg mt-1">
            Redeem your coins for real-life breaks, boba tea, episodes, or create custom rewards!
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-amber-200 font-black text-xs sm:text-sm shadow-xs">
            <Coins className="w-5 h-5 text-[#FFD166]" />
            <span>{user.coins} Coins Available</span>
          </div>

          <button
            onClick={() => { soundEngine.playPop(); setShowAddModal(true); }}
            className="px-5 py-3 rounded-2xl bg-[#EF476F] text-white font-black text-xs sm:text-sm border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0 transition-all flex items-center space-x-2 shrink-0 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Custom Reward</span>
          </button>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {rewards.map((rew) => {
          const canAfford = user.coins >= rew.cost;
          return (
            <div
              key={rew.id}
              className="p-6 rounded-[32px] bg-white dark:bg-slate-800 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#FDF0D5] border-2 border-[#F4A261] flex items-center justify-center text-2xl shrink-0 font-black">
                  {rew.icon}
                </div>
                <div>
                  <h4 className="font-black text-[#2D3142] dark:text-white text-base">
                    {rew.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-400 mt-0.5 leading-snug">
                    {rew.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#EAE6DF] dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-[#2D3142] dark:text-amber-300 font-black text-xs">
                  <span className="text-sm">✨</span>
                  <span className="text-[#06D6A0]">{rew.cost} Coins</span>
                </div>

                <button
                  onClick={() => {
                    if (canAfford) {
                      soundEngine.playCoinJingle();
                      onRedeemReward(rew.id);
                    }
                  }}
                  disabled={!canAfford}
                  className="px-4 py-2 rounded-2xl bg-[#06D6A0] text-white font-black text-xs border-b-4 border-[#05B386] hover:brightness-105 disabled:opacity-40 transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Redeem Treat</span>
                </button>
              </div>

              {rew.redeemedCount > 0 && (
                <div className="text-[10px] font-black text-[#EF476F] text-right">
                  Enjoyed {rew.redeemedCount} times 🎉
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Add Custom Reward Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-[32px] max-w-md w-full p-6 sm:p-8 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-2xl space-y-4">
            <h3 className="font-black text-[#2D3142] dark:text-white text-lg">
              Add Custom Real-Life Reward
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
                  Reward Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Order Pizza, Go for Boba, 1 Hour Skateboarding"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-bold text-[#2D3142] dark:text-white outline-none focus:border-[#118AB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
                  Cost in Coins
                </label>
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-bold text-[#2D3142] dark:text-white outline-none focus:border-[#118AB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 mb-1">
                  Emoji Icon
                </label>
                <input
                  type="text"
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-bold text-[#2D3142] dark:text-white outline-none focus:border-[#118AB2]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-2xl border-2 border-[#EAE6DF] text-[#2D3142] dark:text-slate-300 font-black text-xs hover:bg-[#F8F9FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#EF476F] text-white font-black text-xs border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0"
                >
                  Save Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

