import React from 'react';
import { FlowerPlant, FlowerType } from '../types';
import { soundEngine } from '../utils/audio';
import { Flower2, Droplets, Plus, Sparkles, Check } from 'lucide-react';

interface GardenViewProps {
  plants: FlowerPlant[];
  onWaterPlant: (plantId: string) => void;
  onPlantNewSeed: (type: FlowerType, name: string) => void;
}

export const GardenView: React.FC<GardenViewProps> = ({ plants, onWaterPlant, onPlantNewSeed }) => {
  const flowerEmojiMap: Record<FlowerType, { seed: string; sprout: string; bud: string; bloom: string }> = {
    DAISY: { seed: '🫘', sprout: '🌱', bud: '🌼', bloom: '🌼' },
    SUNFLOWER: { seed: '🫘', sprout: '🌱', bud: '🌻', bloom: '🌻' },
    SAKURA: { seed: '🫘', sprout: '🌱', bud: '🌸', bloom: '🌸' },
    LAVENDER: { seed: '🫘', sprout: '🌱', bud: '🪻', bloom: '🪻' },
    TULIP: { seed: '🫘', sprout: '🌱', bud: '🌷', bloom: '🌷' },
    GOLDEN_LOTUS: { seed: '🫘', sprout: '🌱', bud: '🪷', bloom: '🪷' },
  };

  const getPlantEmoji = (plant: FlowerPlant) => {
    const set = flowerEmojiMap[plant.type] || flowerEmojiMap.SAKURA;
    if (plant.stage === 0) return set.seed;
    if (plant.stage === 1) return set.sprout;
    if (plant.stage === 2) return set.bud;
    return set.bloom;
  };

  const stageLabels = ['Seedling 🌱', 'Growing Sprout 🌿', 'Fragrant Bud 🌷', 'Full Bloom 🌸'];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner - Vibrant Palette */}
      <div className="bg-[#FDF0D5] dark:bg-slate-800 p-6 sm:p-8 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[4px_4px_0px_#EAE6DF] dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#EF476F] font-black text-xs shadow-xs mb-2">
            <Flower2 className="w-3.5 h-3.5" />
            <span>Anti-Guilt Flower Sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white tracking-tight">
            Consistency Garden 🌸
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 max-w-lg mt-1">
            Every quest you complete waters your garden! Skipping a day will never destroy your flowers.
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playPop();
            onPlantNewSeed('TULIP', 'Cozy Tulip of Growth');
          }}
          className="px-5 py-3 rounded-2xl bg-[#EF476F] text-white font-black text-xs sm:text-sm border-b-4 border-[#C73859] hover:brightness-105 active:border-b-0 transition-all flex items-center justify-center space-x-2 shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Plant New Seed (Free)</span>
        </button>
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {plants.map((plant) => {
          const emoji = getPlantEmoji(plant);
          const percent = Math.min(100, Math.round((plant.growthPoints / plant.maxGrowthPoints) * 100));
          const isBloom = plant.stage === 3;

          return (
            <div
              key={plant.id}
              className={`p-6 rounded-[32px] border-4 transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isBloom
                  ? 'bg-white dark:bg-slate-800 border-[#06D6A0] shadow-[4px_4px_0px_#06D6A0]'
                  : 'bg-white dark:bg-slate-800 border-[#EAE6DF] dark:border-slate-700 shadow-xs'
              }`}
            >
              
              {/* Top Row & Emoji Stage */}
              <div className="text-center space-y-3">
                <div className="relative mx-auto w-20 h-20 rounded-2xl bg-[#FFD166] border-2 border-[#F4A261] flex items-center justify-center text-4xl shadow-xs">
                  <span className={`${isBloom ? 'animate-bounce' : ''}`}>{emoji}</span>
                  {isBloom && (
                    <span className="absolute -top-1 -right-1 p-1 bg-[#06D6A0] text-white rounded-full text-xs animate-pulse border-2 border-white">
                      ✨
                    </span>
                  )}
                </div>

                <h4 className="font-black text-[#2D3142] dark:text-white text-base">
                  {plant.name}
                </h4>

                <span className="inline-block px-3 py-1 rounded-full bg-[#FDF0D5] text-[#735D36] font-black text-[10px] uppercase tracking-wider border border-[#F4A261]/40">
                  {stageLabels[plant.stage]}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-black text-[#9A8C98] dark:text-slate-400">
                  <span>Growth</span>
                  <span>{plant.growthPoints}/{plant.maxGrowthPoints} GP</span>
                </div>
                <div className="w-full bg-[#F0F0F0] dark:bg-slate-700 h-3 rounded-full overflow-hidden border-2 border-[#EAE6DF] dark:border-slate-600">
                  <div
                    className="bg-[#06D6A0] h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Water Plant Button */}
              <button
                onClick={() => {
                  soundEngine.playWaterPlant();
                  onWaterPlant(plant.id);
                }}
                disabled={isBloom}
                className={`w-full py-3 px-4 rounded-2xl font-black text-xs flex items-center justify-center space-x-1.5 transition-all ${
                  isBloom
                    ? 'bg-[#C9E4DE] text-[#2D3142] border-2 border-[#A7C4BC] cursor-default'
                    : 'bg-[#118AB2] text-white border-b-4 border-[#0E7494] hover:brightness-105 active:border-b-0'
                }`}
              >
                {isBloom ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Full Bloom! 🌸</span>
                  </>
                ) : (
                  <>
                    <Droplets className="w-4 h-4" />
                    <span>Water Plant (+25 GP)</span>
                  </>
                )}
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
};

