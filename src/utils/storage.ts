import {
  UserProfile,
  Task,
  SkillNode,
  SkillTreeCategory,
  FlowerPlant,
  RoomDecorItem,
  RewardItem,
  Achievement,
  JournalEntry,
  DailyXPLog
} from '../types';
import {
  INITIAL_USER,
  INITIAL_TASKS,
  CORE_JAVA_SKILL_TREE,
  DEFAULT_SKILL_TREES,
  INITIAL_GARDEN_PLANTS,
  INITIAL_ROOM_DECOR,
  INITIAL_REWARDS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_JOURNAL,
  INITIAL_DAILY_LOGS
} from './initialData';

const STORAGE_KEYS = {
  USER: 'levelup_user',
  TASKS: 'levelup_tasks',
  SKILLS: 'levelup_skills',
  SKILL_DOMAINS: 'levelup_skill_domains',
  PLANTS: 'levelup_plants',
  ROOM: 'levelup_room',
  REWARDS: 'levelup_rewards',
  ACHIEVEMENTS: 'levelup_achievements',
  JOURNAL: 'levelup_journal',
  LOGS: 'levelup_logs',
  RESET_FLAG: 'levelup_v3_reset',
};

function getKey(baseKey: string, userEmail?: string): string {
  if (!userEmail) return baseKey;
  const clean = userEmail.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
  return `${baseKey}_${clean}`;
}

// Calculate required XP for a given level
export function getXpForNextLevel(level: number): number {
  return level * 100;
}

export function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : JSON.parse(JSON.stringify(fallback));
  } catch {
    return JSON.parse(JSON.stringify(fallback));
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
}

export class LevelUpState {
  public static getUser(userEmail?: string): UserProfile {
    const key = getKey(STORAGE_KEYS.USER, userEmail);
    const fallbackUser: UserProfile = {
      ...INITIAL_USER,
      email: userEmail || INITIAL_USER.email,
      name: userEmail ? userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1) : INITIAL_USER.name,
      level: 1,
      currentXp: 0,
      coins: 100,
      currentStreak: 1,
      longestStreak: 1,
      title: 'Novice Adventurer'
    };

    return loadStoredData<UserProfile>(key, fallbackUser);
  }

  public static saveUser(user: UserProfile, userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.USER, userEmail || user.email);
    saveStoredData(key, user);
  }

  public static getTasks(userEmail?: string): Task[] {
    const key = getKey(STORAGE_KEYS.TASKS, userEmail);
    return loadStoredData<Task[]>(key, INITIAL_TASKS);
  }

  public static saveTasks(tasks: Task[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.TASKS, userEmail);
    saveStoredData(key, tasks);
  }

  public static getSkills(userEmail?: string): SkillNode[] {
    const key = getKey(STORAGE_KEYS.SKILLS, userEmail);
    return loadStoredData<SkillNode[]>(key, CORE_JAVA_SKILL_TREE);
  }

  public static saveSkills(skills: SkillNode[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.SKILLS, userEmail);
    saveStoredData(key, skills);
  }

  public static getSkillDomains(userEmail?: string): SkillTreeCategory[] {
    const key = getKey(STORAGE_KEYS.SKILL_DOMAINS, userEmail);
    return loadStoredData<SkillTreeCategory[]>(key, DEFAULT_SKILL_TREES);
  }

  public static saveSkillDomains(domains: SkillTreeCategory[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.SKILL_DOMAINS, userEmail);
    saveStoredData(key, domains);
  }

  public static getPlants(userEmail?: string): FlowerPlant[] {
    const key = getKey(STORAGE_KEYS.PLANTS, userEmail);
    return loadStoredData<FlowerPlant[]>(key, INITIAL_GARDEN_PLANTS);
  }

  public static savePlants(plants: FlowerPlant[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.PLANTS, userEmail);
    saveStoredData(key, plants);
  }

  public static getRoom(userEmail?: string): RoomDecorItem[] {
    const key = getKey(STORAGE_KEYS.ROOM, userEmail);
    return loadStoredData<RoomDecorItem[]>(key, INITIAL_ROOM_DECOR);
  }

  public static saveRoom(room: RoomDecorItem[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.ROOM, userEmail);
    saveStoredData(key, room);
  }

  public static getRewards(userEmail?: string): RewardItem[] {
    const key = getKey(STORAGE_KEYS.REWARDS, userEmail);
    return loadStoredData<RewardItem[]>(key, INITIAL_REWARDS);
  }

  public static saveRewards(rewards: RewardItem[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.REWARDS, userEmail);
    saveStoredData(key, rewards);
  }

  public static getAchievements(userEmail?: string): Achievement[] {
    const key = getKey(STORAGE_KEYS.ACHIEVEMENTS, userEmail);
    return loadStoredData<Achievement[]>(key, INITIAL_ACHIEVEMENTS);
  }

  public static saveAchievements(achievements: Achievement[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.ACHIEVEMENTS, userEmail);
    saveStoredData(key, achievements);
  }

  public static getJournal(userEmail?: string): JournalEntry[] {
    const key = getKey(STORAGE_KEYS.JOURNAL, userEmail);
    return loadStoredData<JournalEntry[]>(key, INITIAL_JOURNAL);
  }

  public static saveJournal(journal: JournalEntry[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.JOURNAL, userEmail);
    saveStoredData(key, journal);
  }

  public static getDailyLogs(userEmail?: string): DailyXPLog[] {
    const key = getKey(STORAGE_KEYS.LOGS, userEmail);
    return loadStoredData<DailyXPLog[]>(key, INITIAL_DAILY_LOGS);
  }

  public static saveDailyLogs(logs: DailyXPLog[], userEmail?: string): void {
    const key = getKey(STORAGE_KEYS.LOGS, userEmail);
    saveStoredData(key, logs);
  }

  public static resetUserData(userEmail?: string): void {
    const keys = [
      STORAGE_KEYS.USER,
      STORAGE_KEYS.TASKS,
      STORAGE_KEYS.SKILLS,
      STORAGE_KEYS.SKILL_DOMAINS,
      STORAGE_KEYS.PLANTS,
      STORAGE_KEYS.ROOM,
      STORAGE_KEYS.REWARDS,
      STORAGE_KEYS.ACHIEVEMENTS,
      STORAGE_KEYS.JOURNAL,
      STORAGE_KEYS.LOGS,
    ];

    keys.forEach((k) => {
      localStorage.removeItem(getKey(k, userEmail));
      if (userEmail) {
        localStorage.removeItem(k);
      }
    });
  }

  public static resetAllData(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }
}

