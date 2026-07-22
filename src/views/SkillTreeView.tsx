import React, { useState } from 'react';
import { SkillNode, SkillTreeCategory, CategoryType } from '../types';
import { soundEngine } from '../utils/audio';
import { 
  Network, 
  Lock, 
  CheckCircle2, 
  ArrowDown, 
  Sparkles, 
  Plus, 
  Check, 
  Clock, 
  ChevronRight,
  FolderPlus,
  X,
  Layers
} from 'lucide-react';

interface SkillTreeViewProps {
  skills: SkillNode[];
  skillDomains: SkillTreeCategory[];
  userLevel: number;
  onUnlockSkill: (skillId: string) => void;
  onAddPracticeQuest: (questTitle: string, category: CategoryType) => void;
  onAddSkillTree: (tree: SkillTreeCategory) => void;
  onAddSkillNode: (node: SkillNode) => void;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({
  skills,
  skillDomains,
  userLevel,
  onUnlockSkill,
  onAddPracticeQuest,
  onAddSkillTree,
  onAddSkillNode,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>(skillDomains[0]?.id || 'JAVA');
  const [activeSkillNode, setActiveSkillNode] = useState<SkillNode | null>(
    skills.find((s) => s.domain === (skillDomains[0]?.id || 'JAVA')) || skills[0] || null
  );
  const [addedQuests, setAddedQuests] = useState<Record<string, boolean>>({});

  // Modals
  const [showAddTreeModal, setShowAddTreeModal] = useState<boolean>(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState<boolean>(false);

  // New Skill Tree Form State
  const [newTreeLabel, setNewTreeLabel] = useState('');
  const [newTreeIcon, setNewTreeIcon] = useState('🐍');

  // New Node Form State
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeDesc, setNewNodeDesc] = useState('');
  const [newNodeLevel, setNewNodeLevel] = useState(1);
  const [newNodeIcon, setNewNodeIcon] = useState('⚡');
  const [newNodeHours, setNewNodeHours] = useState(5);
  const [newNodeQuests, setNewNodeQuests] = useState('');

  const currentDomainSkills = skills.filter((s) => s.domain === selectedDomain);

  const handleAddQuest = (questTitle: string) => {
    soundEngine.playTaskComplete();
    // Default mapping or custom category fallback
    let cat: CategoryType = 'Coding';
    if (selectedDomain === 'JAVA') cat = 'Core Java';
    else if (selectedDomain === 'DSA') cat = 'DSA';
    else if (selectedDomain === 'MERN') cat = 'MERN';
    else if (selectedDomain === 'AIML') cat = 'AI/ML';

    onAddPracticeQuest(questTitle, cat);
    setAddedQuests((prev) => ({ ...prev, [questTitle]: true }));
  };

  const handleCreateSkillTree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTreeLabel.trim()) return;

    soundEngine.playPop();
    const domainId = newTreeLabel.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_' + Date.now().toString().slice(-4);
    const newCategory: SkillTreeCategory = {
      id: domainId,
      label: newTreeLabel.trim(),
      icon: newTreeIcon || '🌳',
    };

    onAddSkillTree(newCategory);
    setSelectedDomain(domainId);

    // Reset form
    setNewTreeLabel('');
    setNewTreeIcon('🐍');
    setShowAddTreeModal(false);
  };

  const handleCreateSkillNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    soundEngine.playPop();
    const questsList = newNodeQuests
      .split(',')
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    const newNode: SkillNode = {
      id: 'node_' + Date.now(),
      domain: selectedDomain,
      name: newNodeName.trim(),
      description: newNodeDesc.trim() || 'Custom progression topic.',
      levelRequired: Number(newNodeLevel) || 1,
      prerequisiteIds: [],
      unlocked: true,
      completed: false,
      icon: newNodeIcon || '⚡',
      estimatedHours: Number(newNodeHours) || 4,
      practiceQuests: questsList.length > 0 ? questsList : [`Practice ${newNodeName.trim()} basics`],
    };

    onAddSkillNode(newNode);
    setActiveSkillNode(newNode);

    // Reset form
    setNewNodeName('');
    setNewNodeDesc('');
    setNewNodeLevel(1);
    setNewNodeIcon('⚡');
    setNewNodeHours(5);
    setNewNodeQuests('');
    setShowAddNodeModal(false);
  };

  const activeDomainInfo = skillDomains.find((d) => d.id === selectedDomain);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#C9E4DE] dark:bg-slate-800 p-6 sm:p-8 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 shadow-[4px_4px_0px_#EAE6DF] dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-700 text-[#2D3142] dark:text-white font-black text-xs shadow-xs mb-2">
            <Network className="w-3.5 h-3.5 text-[#06D6A0]" />
            <span>Interactive Tech Skill Tree</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D3142] dark:text-white tracking-tight">
            Visual Learning Path 🌳
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 max-w-lg mt-1">
            Unlock nodes as you level up. Add custom skill trees and progression nodes anytime!
          </p>
        </div>

        {/* Domain Tabs + Add Tree Button */}
        <div className="flex flex-wrap items-center gap-2">
          {skillDomains.map((tab) => {
            const isSelected = selectedDomain === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedDomain(tab.id);
                  const firstInDomain = skills.find((s) => s.domain === tab.id);
                  setActiveSkillNode(firstInDomain || null);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#118AB2] text-white border-2 border-[#0E7494] shadow-[2px_2px_0px_#0E7494]'
                    : 'bg-white dark:bg-slate-800 text-[#2D3142] dark:text-slate-300 border-2 border-[#EAE6DF] dark:border-slate-700 hover:border-[#118AB2]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* Add New Skill Tree Button */}
          <button
            onClick={() => {
              soundEngine.playPop();
              setShowAddTreeModal(true);
            }}
            className="px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#FFD166] hover:brightness-105 text-[#2D3142] border-2 border-[#F4A261] shadow-[2px_2px_0px_#F4A261] flex items-center space-x-1.5 transition-transform"
          >
            <FolderPlus className="w-4 h-4" />
            <span>+ New Skill Tree</span>
          </button>
        </div>
      </div>

      {/* Split View: Tree Flow + Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Tree Progression Column (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-7 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#EAE6DF] dark:border-slate-700 pb-3">
            <h3 className="font-black text-[#2D3142] dark:text-white text-sm uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#118AB2]" />
              <span>
                {activeDomainInfo ? activeDomainInfo.label : 'Progression'} ({currentDomainSkills.length} Nodes)
              </span>
            </h3>

            {/* Add Node Button */}
            <button
              onClick={() => {
                soundEngine.playPop();
                setShowAddNodeModal(true);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-black bg-[#06D6A0] hover:brightness-105 text-slate-950 border-b-2 border-[#04A278] flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Node</span>
            </button>
          </div>

          <div className="relative space-y-3 py-2">
            {currentDomainSkills.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-3xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-dashed border-[#EAE6DF] dark:border-slate-700 space-y-3">
                <p className="text-sm font-bold text-[#9A8C98]">
                  No progression nodes in this skill tree yet!
                </p>
                <button
                  onClick={() => setShowAddNodeModal(true)}
                  className="px-4 py-2 rounded-2xl bg-[#06D6A0] text-slate-950 font-black text-xs border-b-2 border-[#04A278] hover:brightness-105"
                >
                  + Add First Node
                </button>
              </div>
            ) : (
              currentDomainSkills.map((node, index) => {
                const isSelected = activeSkillNode?.id === node.id;
                const isLocked = !node.unlocked && userLevel < node.levelRequired;

                return (
                  <React.Fragment key={node.id}>
                    
                    {/* Connector Arrow */}
                    {index > 0 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="w-5 h-5 text-[#06D6A0] animate-bounce" />
                      </div>
                    )}

                    {/* Skill Node Box */}
                    <button
                      onClick={() => {
                        soundEngine.playPop();
                        setActiveSkillNode(node);
                      }}
                      className={`w-full p-4 rounded-2xl border-3 text-left transition-all duration-200 relative flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FDF0D5] dark:bg-slate-700 border-[#F4A261] shadow-[3px_3px_0px_#F4A261]'
                          : node.completed
                          ? 'bg-[#C9E4DE]/50 dark:bg-slate-900 border-[#A7C4BC] dark:border-slate-800'
                          : isLocked
                          ? 'bg-[#F8F9FA] dark:bg-slate-900/40 border-[#EAE6DF] dark:border-slate-800 opacity-60'
                          : 'bg-white dark:bg-slate-800 border-[#EAE6DF] dark:border-slate-700 hover:border-[#118AB2]'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 font-black border-2 ${
                          node.completed
                            ? 'bg-[#06D6A0] text-white border-[#05B386]'
                            : isLocked
                            ? 'bg-[#EAE6DF] dark:bg-slate-800 text-[#9A8C98] border-[#9A8C98]/30'
                            : 'bg-[#FFD166] text-[#2D3142] border-[#F4A261]'
                        }`}>
                          {isLocked ? <Lock className="w-5 h-5" /> : node.icon}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-sm text-[#2D3142] dark:text-white">
                              {node.name}
                            </span>
                            {node.completed && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#06D6A0] text-white text-[10px] font-black flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Mastered</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-[#4A4A4A] dark:text-slate-400 line-clamp-1 mt-0.5">
                            {node.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-[#9A8C98]">
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-xl bg-[#F8F9FA] dark:bg-slate-700 text-[#2D3142] dark:text-slate-300 border border-[#EAE6DF] dark:border-slate-600">
                          Lvl {node.levelRequired}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </div>

                    </button>

                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>

        {/* Node Detail & Practice Quest Generator (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-[32px] p-6 sm:p-7 border-4 border-[#EAE6DF] dark:border-slate-700 shadow-xs flex flex-col justify-between">
          {activeSkillNode ? (
            <div className="space-y-4">
              
              <div className="flex items-center space-x-3.5 pb-4 border-b-2 border-[#EAE6DF] dark:border-slate-700">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD166] border-2 border-[#F4A261] text-[#2D3142] text-2xl flex items-center justify-center font-black shrink-0">
                  {activeSkillNode.icon}
                </div>
                <div>
                  <h3 className="font-black text-[#2D3142] dark:text-white text-base">
                    {activeSkillNode.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#9A8C98] dark:text-slate-400 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#118AB2]" />
                    <span>Est. {activeSkillNode.estimatedHours} Hours of Learning</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Topic Overview
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-[#4A4A4A] dark:text-slate-300 leading-relaxed bg-[#F8F9FA] dark:bg-slate-900 p-4 rounded-2xl border-2 border-[#EAE6DF] dark:border-slate-800">
                  {activeSkillNode.description}
                </p>
              </div>

              {/* Recommended Practice Quests */}
              <div>
                <h4 className="text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
                  <span>Recommended Micro-Quests</span>
                </h4>

                <div className="space-y-2">
                  {activeSkillNode.practiceQuests.map((questTitle, idx) => {
                    const isAdded = addedQuests[questTitle];
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900 border-2 border-[#EAE6DF] dark:border-slate-800 flex items-center justify-between text-xs gap-2"
                      >
                        <span className="font-bold text-[#2D3142] dark:text-slate-200">
                          {questTitle}
                        </span>
                        <button
                          onClick={() => handleAddQuest(questTitle)}
                          disabled={isAdded}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-black flex items-center space-x-1 shrink-0 transition-colors ${
                            isAdded
                              ? 'bg-[#C9E4DE] text-[#2D3142] border border-[#A7C4BC]'
                              : 'bg-[#EF476F] text-white border-b-2 border-[#C73859] hover:brightness-105'
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'Added!' : '+ Quest'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-[#9A8C98] font-bold">
              Select a node to inspect topic details and micro-quests.
            </div>
          )}
        </div>

      </div>

      {/* Modal: Add New Skill Tree */}
      {showAddTreeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#EAE6DF] dark:border-slate-800">
              <div className="flex items-center space-x-2 text-[#118AB2]">
                <FolderPlus className="w-5 h-5" />
                <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
                  Create New Skill Tree
                </h3>
              </div>
              <button
                onClick={() => setShowAddTreeModal(false)}
                className="p-2 rounded-xl bg-[#F8F9FA] dark:bg-slate-800 text-[#9A8C98] hover:text-[#2D3142] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSkillTree} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                  Skill Tree Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python & AI, DevOps & Cloud, CyberSecurity"
                  value={newTreeLabel}
                  onChange={(e) => setNewTreeLabel(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-sm font-bold text-[#2D3142] dark:text-white focus:outline-hidden focus:border-[#118AB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                  Choose Icon / Emoji
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['🐍', '🛡️', '☁️', '📱', '🎨', '🚀', '🧠', '📊', '⚡', '☕'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewTreeIcon(emoji)}
                      className={`w-10 h-10 rounded-2xl text-xl border-2 font-black transition-transform ${
                        newTreeIcon === emoji
                          ? 'bg-[#FFD166] border-[#F4A261] scale-110'
                          : 'bg-[#F8F9FA] dark:bg-slate-800 border-[#EAE6DF] dark:border-slate-700 hover:scale-105'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddTreeModal(false)}
                  className="px-4 py-2.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 text-[#4A4A4A] dark:text-slate-300 font-bold text-xs border border-[#EAE6DF] dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#118AB2] text-white font-black text-xs border-b-2 border-[#0E7494] hover:brightness-105"
                >
                  Create Skill Tree
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Modal: Add New Progression Node */}
      {showAddNodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border-4 border-[#EAE6DF] dark:border-slate-700 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#EAE6DF] dark:border-slate-800">
              <div className="flex items-center space-x-2 text-[#06D6A0]">
                <Plus className="w-5 h-5" />
                <h3 className="font-black text-lg text-[#2D3142] dark:text-white">
                  Add Progression Node
                </h3>
              </div>
              <button
                onClick={() => setShowAddNodeModal(false)}
                className="p-2 rounded-xl bg-[#F8F9FA] dark:bg-slate-800 text-[#9A8C98] hover:text-[#2D3142] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSkillNode} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                  Node Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AsyncIO & Multithreading, System Design Patterns"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-sm font-bold text-[#2D3142] dark:text-white focus:outline-hidden focus:border-[#06D6A0]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                  Topic Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Key concepts, principles, and learning goals for this node..."
                  value={newNodeDesc}
                  onChange={(e) => setNewNodeDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-semibold text-[#2D3142] dark:text-white focus:outline-hidden focus:border-[#06D6A0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                    Level Required
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={newNodeLevel}
                    onChange={(e) => setNewNodeLevel(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-bold text-[#2D3142] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                    Est. Hours
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newNodeHours}
                    onChange={(e) => setNewNodeHours(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-bold text-[#2D3142] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                  Practice Micro-Quests (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Build Event Loop demo, Write Custom Coroutine"
                  value={newNodeQuests}
                  onChange={(e) => setNewNodeQuests(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 border-2 border-[#EAE6DF] dark:border-slate-700 text-xs font-semibold text-[#2D3142] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#2D3142] dark:text-slate-300 uppercase mb-1">
                  Node Icon
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['⚡', '📦', '🛡️', '🌊', '🗄️', '🌐', '🌱', '🚀', '👑', '🐍', '🧠'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewNodeIcon(emoji)}
                      className={`w-9 h-9 rounded-2xl text-lg border-2 font-black transition-transform ${
                        newNodeIcon === emoji
                          ? 'bg-[#06D6A0] text-slate-950 border-[#04A278] scale-110'
                          : 'bg-[#F8F9FA] dark:bg-slate-800 border-[#EAE6DF] dark:border-slate-700 hover:scale-105'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddNodeModal(false)}
                  className="px-4 py-2.5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800 text-[#4A4A4A] dark:text-slate-300 font-bold text-xs border border-[#EAE6DF] dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#06D6A0] text-slate-950 font-black text-xs border-b-2 border-[#04A278] hover:brightness-105"
                >
                  Add Progression Node
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
