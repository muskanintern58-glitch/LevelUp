import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  Task, 
  SkillNode, 
  SkillTreeCategory,
  FlowerPlant, 
  RoomDecorItem, 
  RewardItem, 
  JournalEntry, 
  DailyXPLog, 
  CategoryType, 
  FlowerType,
  MoodType,
  AvatarOptions 
} from './types';
import { LevelUpState, getXpForNextLevel } from './utils/storage';
import { soundEngine } from './utils/audio';

import { Header } from './components/Header';
import { LevelUpModal } from './components/LevelUpModal';
import { AICoachDrawer } from './components/AICoachDrawer';
import { SpringBootCodeHub } from './components/SpringBootCodeHub';
import { TaskModal } from './components/TaskModal';

import { DashboardView } from './views/DashboardView';
import { SkillTreeView } from './views/SkillTreeView';
import { RoomView } from './views/RoomView';
import { GardenView } from './views/GardenView';
import { AvatarView } from './views/AvatarView';
import { RewardShopView } from './views/RewardShopView';
import { AnalyticsJournalView } from './views/AnalyticsJournalView';
import { AuthModal } from './views/AuthModal';

export default function App() {
  // State Initialization from LocalStorage or Default Presets
  const [user, setUser] = useState<UserProfile>(LevelUpState.getUser());
  const [tasks, setTasks] = useState<Task[]>(LevelUpState.getTasks());
  const [skills, setSkills] = useState<SkillNode[]>(LevelUpState.getSkills());
  const [skillDomains, setSkillDomains] = useState<SkillTreeCategory[]>(LevelUpState.getSkillDomains());
  const [plants, setPlants] = useState<FlowerPlant[]>(LevelUpState.getPlants());
  const [roomDecor, setRoomDecor] = useState<RoomDecorItem[]>(LevelUpState.getRoom());
  const [rewards, setRewards] = useState<RewardItem[]>(LevelUpState.getRewards());
  const [journal, setJournal] = useState<JournalEntry[]>(LevelUpState.getJournal());
  const [dailyLogs, setDailyLogs] = useState<DailyXPLog[]>(LevelUpState.getDailyLogs());

  // UI State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals & Drawers
  const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false);
  const [newLevel, setNewLevel] = useState<number>(user.level);
  const [showAICoach, setShowAICoach] = useState<boolean>(false);
  const [showCodeHub, setShowCodeHub] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [newTaskCategory, setNewTaskCategory] = useState<CategoryType>('Core Java');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Synchronize state changes to LocalStorage
  useEffect(() => { LevelUpState.saveUser(user); }, [user]);
  useEffect(() => { LevelUpState.saveTasks(tasks); }, [tasks]);
  useEffect(() => { LevelUpState.saveSkills(skills); }, [skills]);
  useEffect(() => { LevelUpState.saveSkillDomains(skillDomains); }, [skillDomains]);
  useEffect(() => { LevelUpState.savePlants(plants); }, [plants]);
  useEffect(() => { LevelUpState.saveRoom(roomDecor); }, [roomDecor]);
  useEffect(() => { LevelUpState.saveRewards(rewards); }, [rewards]);
  useEffect(() => { LevelUpState.saveJournal(journal); }, [journal]);
  useEffect(() => { LevelUpState.saveDailyLogs(dailyLogs); }, [dailyLogs]);

  // Handle Dark Mode Document Class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Reset Progress Handler
  const handleResetData = () => {
    LevelUpState.resetAllData();
    setUser(LevelUpState.getUser());
    setTasks(LevelUpState.getTasks());
    setSkills(LevelUpState.getSkills());
    setSkillDomains(LevelUpState.getSkillDomains());
    setPlants(LevelUpState.getPlants());
    setRoomDecor(LevelUpState.getRoom());
    setRewards(LevelUpState.getRewards());
    setJournal(LevelUpState.getJournal());
    setDailyLogs(LevelUpState.getDailyLogs());
  };

  // Handle Task Completion & Level Up Engine
  const handleCompleteTask = (taskId: string) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const task = tasks[taskIndex];
    const isNowCompleted = !task.completed;

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...task,
      completed: isNowCompleted,
      completedAt: isNowCompleted ? new Date().toISOString().split('T')[0] : undefined,
    };
    setTasks(updatedTasks);

    if (isNowCompleted) {
      soundEngine.playTaskComplete();
      soundEngine.playCoinJingle();

      // 1. Calculate XP & Coins Gain
      let newXp = user.currentXp + task.xp;
      let newCoins = user.coins + task.coins;
      let currentLevel = user.level;
      let leveledUp = false;

      // 2. Check Level Up
      let xpNeeded = getXpForNextLevel(currentLevel);
      if (newXp >= xpNeeded) {
        currentLevel += 1;
        newXp -= xpNeeded;
        newCoins += 25; // Bonus coins on level up
        leveledUp = true;
      }

      // 3. Update Streak
      const today = new Date().toISOString().split('T')[0];
      let newStreak = user.currentStreak;
      if (user.lastCompletedDate !== today) {
        newStreak += 1;
      }

      setUser({
        ...user,
        level: currentLevel,
        currentXp: newXp,
        coins: newCoins,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, user.longestStreak),
        lastCompletedDate: today,
      });

      if (leveledUp) {
        setNewLevel(currentLevel);
        setShowLevelUpModal(true);
      }

      // 4. Water Active Garden Plant (+25 Growth Points)
      setPlants((prevPlants) => {
        const updated = [...prevPlants];
        const activeIdx = updated.findIndex((p) => p.stage < 3);
        if (activeIdx !== -1) {
          const plant = updated[activeIdx];
          const newGP = plant.growthPoints + 25;
          let newStage = plant.stage;
          if (newGP >= 100) newStage = 3;
          else if (newGP >= 60) newStage = 2;
          else if (newGP >= 30) newStage = 1;

          updated[activeIdx] = {
            ...plant,
            growthPoints: Math.min(100, newGP),
            stage: newStage as 0 | 1 | 2 | 3,
            wateredToday: true,
          };
        }
        return updated;
      });

      // 5. Update Daily Logs
      setDailyLogs((prevLogs) => {
        const logIndex = prevLogs.findIndex((l) => l.date === today);
        if (logIndex !== -1) {
          const updated = [...prevLogs];
          updated[logIndex] = {
            ...updated[logIndex],
            xpGained: updated[logIndex].xpGained + task.xp,
            tasksCompleted: updated[logIndex].tasksCompleted + 1,
            studyMinutes: updated[logIndex].studyMinutes + 20,
          };
          return updated;
        } else {
          return [
            ...prevLogs,
            { date: today, xpGained: task.xp, tasksCompleted: 1, studyMinutes: 20 },
          ];
        }
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleCreateTask = (partialTask: Partial<Task>) => {
    const newTask: Task = {
      id: 'task_' + Date.now(),
      title: partialTask.title || 'Untitled Quest',
      description: partialTask.description || '',
      category: partialTask.category || 'Core Java',
      difficulty: partialTask.difficulty || 'EASY',
      xp: partialTask.xp || 10,
      coins: partialTask.coins || 5,
      completed: false,
      skillTag: partialTask.skillTag,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleWaterPlant = (plantId: string) => {
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === plantId && p.stage < 3) {
          const newGP = p.growthPoints + 25;
          let newStage = p.stage;
          if (newGP >= 100) newStage = 3;
          else if (newGP >= 60) newStage = 2;
          else if (newGP >= 30) newStage = 1;

          return {
            ...p,
            growthPoints: Math.min(100, newGP),
            stage: newStage as 0 | 1 | 2 | 3,
            wateredToday: true,
          };
        }
        return p;
      })
    );
  };

  const handlePlantNewSeed = (type: FlowerType, name: string) => {
    const newPlant: FlowerPlant = {
      id: 'plant_' + Date.now(),
      type,
      name,
      stage: 0,
      growthPoints: 0,
      maxGrowthPoints: 100,
      wateredToday: false,
      plantedAt: new Date().toISOString(),
    };
    setPlants((prev) => [newPlant, ...prev]);
  };

  const handleBuyRoomDecor = (itemId: string) => {
    const item = roomDecor.find((i) => i.id === itemId);
    if (!item || user.coins < item.price) return;

    setUser((prev) => ({ ...prev, coins: prev.coins - item.price }));
    setRoomDecor((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, unlocked: true, equipped: true } : i))
    );
  };

  const handleEquipRoomDecor = (itemId: string) => {
    const target = roomDecor.find((i) => i.id === itemId);
    if (!target) return;

    setRoomDecor((prev) =>
      prev.map((i) => {
        if (i.category === target.category) {
          return { ...i, equipped: i.id === itemId ? !i.equipped : false };
        }
        return i;
      })
    );
  };

  const handleRedeemReward = (rewardId: string) => {
    const rew = rewards.find((r) => r.id === rewardId);
    if (!rew || user.coins < rew.cost) return;

    setUser((prev) => ({ ...prev, coins: prev.coins - rew.cost }));
    setRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, redeemedCount: r.redeemedCount + 1 } : r))
    );
  };

  const handleAddCustomReward = (rew: Omit<RewardItem, 'id' | 'redeemedCount'>) => {
    const newReward: RewardItem = {
      ...rew,
      id: 'rew_' + Date.now(),
      redeemedCount: 0,
    };
    setRewards((prev) => [newReward, ...prev]);
  };

  const handleAddJournalEntry = (mood: MoodType, oneLiner: string, reflection?: string) => {
    const newEntry: JournalEntry = {
      id: 'j_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      mood,
      oneLiner,
      reflection,
    };
    setJournal((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-rose-50/40 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 selection:bg-rose-200 dark:selection:bg-rose-900">
      
      {/* Top Header Navigation */}
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenAICoach={() => setShowAICoach(true)}
        onOpenCodeHub={() => setShowCodeHub(true)}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            user={user}
            tasks={tasks}
            plants={plants}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onOpenNewTaskModal={(cat) => {
              if (cat) setNewTaskCategory(cat);
              setShowTaskModal(true);
            }}
            onOpenAICoach={() => setShowAICoach(true)}
          />
        )}

        {activeTab === 'skilltree' && (
          <SkillTreeView
            skills={skills}
            skillDomains={skillDomains}
            userLevel={user.level}
            onUnlockSkill={(skillId) => {
              setSkills((prev) =>
                prev.map((s) => (s.id === skillId ? { ...s, unlocked: true } : s))
              );
            }}
            onAddPracticeQuest={(questTitle, category) => {
              handleCreateTask({
                title: questTitle,
                category,
                difficulty: 'MEDIUM',
                xp: 20,
                coins: 10,
              });
            }}
            onAddSkillTree={(newTree) => {
              setSkillDomains((prev) => [...prev, newTree]);
            }}
            onAddSkillNode={(newNode) => {
              setSkills((prev) => [...prev, newNode]);
            }}
          />
        )}

        {activeTab === 'garden' && (
          <GardenView
            plants={plants}
            onWaterPlant={handleWaterPlant}
            onPlantNewSeed={handlePlantNewSeed}
          />
        )}

        {activeTab === 'room' && (
          <RoomView
            user={user}
            roomDecor={roomDecor}
            onBuyItem={handleBuyRoomDecor}
            onEquipItem={handleEquipRoomDecor}
          />
        )}

        {activeTab === 'avatar' && (
          <AvatarView
            user={user}
            onUpdateAvatar={(newAvatar: AvatarOptions) => {
              setUser((prev) => ({ ...prev, avatar: newAvatar }));
            }}
          />
        )}

        {activeTab === 'shop' && (
          <RewardShopView
            user={user}
            rewards={rewards}
            onRedeemReward={handleRedeemReward}
            onAddCustomReward={handleAddCustomReward}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsJournalView
            journal={journal}
            dailyLogs={dailyLogs}
            onAddJournalEntry={handleAddJournalEntry}
          />
        )}
      </main>

      {/* Level Up Celebration Modal */}
      {showLevelUpModal && (
        <LevelUpModal
          level={newLevel}
          onClose={() => setShowLevelUpModal(false)}
        />
      )}

      {/* AI Coach Assistant Drawer */}
      <AICoachDrawer
        isOpen={showAICoach}
        onClose={() => setShowAICoach(false)}
        user={user}
      />

      {/* Spring Boot & MySQL Code Architecture Hub */}
      <SpringBootCodeHub
        isOpen={showCodeHub}
        onClose={() => setShowCodeHub(false)}
      />

      {/* Create New Quest Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleCreateTask}
        initialCategory={newTaskCategory}
      />

      {/* Auth / Login Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onResetData={handleResetData}
        onAuthSuccess={(authUser) => {
          setUser((prev) => ({ ...prev, ...authUser }));
        }}
      />

    </div>
  );
}
