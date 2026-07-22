export type CategoryType = 
  | 'Core Java'
  | 'DSA'
  | 'Java Full Stack'
  | 'MERN'
  | 'AI/ML'
  | 'Languages'
  | 'Fitness'
  | 'Reading'
  | 'Coding'
  | 'Hobbies'
  | 'Custom Tasks';

export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD' | 'BOSS';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  difficulty: DifficultyType;
  xp: number;
  coins: number;
  completed: boolean;
  completedAt?: string;
  dueDate?: string;
  skillTag?: string;
  createdAt: string;
}

export type SkillDomain = string;

export interface SkillTreeCategory {
  id: string; // e.g. 'JAVA', 'DSA', 'MERN', 'AIML', 'PYTHON'
  label: string;
  icon: string;
}

export interface SkillNode {
  id: string;
  domain: SkillDomain;
  name: string;
  description: string;
  levelRequired: number;
  prerequisiteIds: string[];
  unlocked: boolean;
  completed: boolean;
  icon: string;
  estimatedHours: number;
  practiceQuests: string[];
}

export type FlowerType = 'DAISY' | 'SUNFLOWER' | 'SAKURA' | 'LAVENDER' | 'TULIP' | 'GOLDEN_LOTUS';

export interface FlowerPlant {
  id: string;
  type: FlowerType;
  name: string;
  stage: 0 | 1 | 2 | 3; // 0: Seed, 1: Sprout, 2: Bud, 3: Full Bloom
  growthPoints: number;
  maxGrowthPoints: number;
  wateredToday: boolean;
  plantedAt: string;
  lastWateredAt?: string;
}

export type RoomItemCategory = 'DESK' | 'SHELF' | 'PLANT' | 'LAPTOP' | 'PET' | 'WINDOW' | 'WALL' | 'LAMP';

export interface RoomDecorItem {
  id: string;
  name: string;
  category: RoomItemCategory;
  price: number;
  unlocked: boolean;
  equipped: boolean;
  emoji: string;
  color: string;
  description: string;
}

export interface AvatarOptions {
  gender: 'cozy' | 'chibi' | 'bear';
  hairstyle: string;
  hairColor: string;
  outfit: string;
  accessory: string;
  expression: string;
  background: string;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  category: 'BREAK' | 'TREAT' | 'ENTERTAINMENT' | 'SELF_CARE' | 'CUSTOM';
  redeemedCount: number;
}

export type MoodType = 'COZY' | 'INSPIRED' | 'TIRED' | 'CALM' | 'FOCUSED';

export interface JournalEntry {
  id: string;
  date: string;
  mood: MoodType;
  oneLiner: string;
  reflection?: string;
}

export interface DailyXPLog {
  date: string; // YYYY-MM-DD
  xpGained: number;
  tasksCompleted: number;
  studyMinutes: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: number;
  currentXp: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  todayGoalXp: number;
  title: string;
  avatar: AvatarOptions;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rewardCoins: number;
  progress: number;
  maxProgress: number;
}

export interface AICoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  suggestedTasks?: Array<{
    title: string;
    category: CategoryType;
    difficulty: DifficultyType;
    xp: number;
  }>;
}
