import React, { useState } from 'react';
import { AICoachMessage, UserProfile } from '../types';
import { askAICoach } from '../services/api';
import { soundEngine } from '../utils/audio';
import { Bot, Send, Sparkles, X, Heart, RefreshCw } from 'lucide-react';

interface AICoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const AICoachDrawer: React.FC<AICoachDrawerProps> = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState<AICoachMessage[]>([
    {
      id: 'welcome_1',
      sender: 'coach',
      text: `Welcome back, ${user.name} 🌸\n\nI'm Mochi, your anti-guilt study coach! Remember that consistency isn't about working until exhaustion — it's about showing up gently every day.\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    soundEngine.playPop();
    const userMsg: AICoachMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const coachReply = await askAICoach(textToSend, {
        level: user.level,
        streak: user.currentStreak,
        currentXp: user.currentXp,
      });
      setMessages((prev) => [...prev, coachReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'coach',
          text: "I'm right here with you 🌸 Let's start with a gentle 10 XP task today. You've got this!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPills = [
    "Let's earn just 5 XP today 🌿",
    "I skipped yesterday and feel guilty",
    "Explain Spring Boot REST Controllers simply",
    "Break down DSA HashMaps into 3 steps",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full flex flex-col border-l-4 border-[#EAE6DF] dark:border-slate-800 shadow-2xl animate-slide-left">
        
        {/* Header */}
        <div className="p-4 border-b-2 border-[#EAE6DF] dark:border-slate-800 flex items-center justify-between bg-[#C9E4DE] dark:bg-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD166] border-2 border-[#F4A261] flex items-center justify-center text-white text-xl shadow-xs">
              🐱
            </div>
            <div>
              <h3 className="font-black text-[#2D3142] dark:text-white text-sm flex items-center space-x-1">
                <span>Mochi AI Study Companion</span>
                <Sparkles className="w-3.5 h-3.5 text-[#118AB2]" />
              </h3>
              <p className="text-[11px] font-bold text-[#4A4A4A] dark:text-slate-300 flex items-center space-x-1">
                <Heart className="w-3 h-3 text-[#EF476F] fill-[#EF476F]" />
                <span>Zero guilt • Unlimited encouragement</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => { soundEngine.playPop(); onClose(); }}
            className="p-1.5 rounded-xl text-[#2D3142] dark:text-slate-300 hover:bg-white/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#F8F9FA] dark:bg-slate-800/40 border-b-2 border-[#EAE6DF] dark:border-slate-800 flex space-x-2 overflow-x-auto no-scrollbar">
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pill)}
              disabled={loading}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-[11px] font-black text-[#118AB2] dark:text-sky-300 hover:border-[#118AB2] whitespace-nowrap transition-colors"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm font-bold leading-relaxed border-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#118AB2] text-white border-[#0E7494] rounded-tr-none'
                    : 'bg-[#F8F9FA] dark:bg-slate-800 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right font-black ${
                    msg.sender === 'user' ? 'text-sky-100' : 'text-[#9A8C98]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 p-3.5 rounded-2xl rounded-tl-none flex items-center space-x-2 text-xs font-black text-[#2D3142] dark:text-slate-300">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#118AB2]" />
                <span>Mochi is thinking of a cozy response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t-2 border-[#EAE6DF] dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Mochi anything or break down a quest..."
            className="flex-1 px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs sm:text-sm font-bold text-[#2D3142] dark:text-white focus:outline-none focus:border-[#118AB2]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3 rounded-2xl bg-[#EF476F] text-white disabled:opacity-50 hover:brightness-105 border-b-4 border-[#C73859] active:border-b-0 transition-all shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

