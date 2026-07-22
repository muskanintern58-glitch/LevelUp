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

// Calculate required XP for a given level
export function getXpForNextLevel(level: number): number {
  return level * 100;
}

export function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
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
  public static getUser(): UserProfile {
    // Check if one-time reset for starting from Level 1 is needed
    if (!localStorage.getItem(STORAGE_KEYS.RESET_FLAG)) {
      LevelUpState.resetAllData();
      localStorage.setItem(STORAGE_KEYS.RESET_FLAG, 'true');
    }
    return loadStoredData<UserProfile>(STORAGE_KEYS.USER, INITIAL_USER);
  }

  public static saveUser(user: UserProfile): void {
    saveStoredData(STORAGE_KEYS.USER, user);
  }

  public static getTasks(): Task[] {
    return loadStoredData<Task[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  }

  public static saveTasks(tasks: Task[]): void {
    saveStoredData(STORAGE_KEYS.TASKS, tasks);
  }

  public static getSkills(): SkillNode[] {
    return loadStoredData<SkillNode[]>(STORAGE_KEYS.SKILLS, CORE_JAVA_SKILL_TREE);
  }

  public static saveSkills(skills: SkillNode[]): void {
    saveStoredData(STORAGE_KEYS.SKILLS, skills);
  }

  public static getSkillDomains(): SkillTreeCategory[] {
    return loadStoredData<SkillTreeCategory[]>(STORAGE_KEYS.SKILL_DOMAINS, DEFAULT_SKILL_TREES);
  }

  public static saveSkillDomains(domains: SkillTreeCategory[]): void {
    saveStoredData(STORAGE_KEYS.SKILL_DOMAINS, domains);
  }

  public static getPlants(): FlowerPlant[] {
    return loadStoredData<FlowerPlant[]>(STORAGE_KEYS.PLANTS, INITIAL_GARDEN_PLANTS);
  }

  public static savePlants(plants: FlowerPlant[]): void {
    saveStoredData(STORAGE_KEYS.PLANTS, plants);
  }

  public static getRoom(): RoomDecorItem[] {
    return loadStoredData<RoomDecorItem[]>(STORAGE_KEYS.ROOM, INITIAL_ROOM_DECOR);
  }

  public static saveRoom(room: RoomDecorItem[]): void {
    saveStoredData(STORAGE_KEYS.ROOM, room);
  }

  public static getRewards(): RewardItem[] {
    return loadStoredData<RewardItem[]>(STORAGE_KEYS.REWARDS, INITIAL_REWARDS);
  }

  public static saveRewards(rewards: RewardItem[]): void {
    saveStoredData(STORAGE_KEYS.REWARDS, rewards);
  }

  public static getAchievements(): Achievement[] {
    return loadStoredData<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  }

  public static saveAchievements(achievements: Achievement[]): void {
    saveStoredData(STORAGE_KEYS.ACHIEVEMENTS, achievements);
  }

  public static getJournal(): JournalEntry[] {
    return loadStoredData<JournalEntry[]>(STORAGE_KEYS.JOURNAL, INITIAL_JOURNAL);
  }

  public static saveJournal(journal: JournalEntry[]): void {
    saveStoredData(STORAGE_KEYS.JOURNAL, journal);
  }

  public static getDailyLogs(): DailyXPLog[] {
    return loadStoredData<DailyXPLog[]>(STORAGE_KEYS.LOGS, INITIAL_DAILY_LOGS);
  }

  public static saveDailyLogs(logs: DailyXPLog[]): void {
    saveStoredData(STORAGE_KEYS.LOGS, logs);
  }

  public static resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.SKILL_DOMAINS);
    localStorage.removeItem(STORAGE_KEYS.PLANTS);
    localStorage.removeItem(STORAGE_KEYS.ROOM);
    localStorage.removeItem(STORAGE_KEYS.REWARDS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.JOURNAL);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.setItem(STORAGE_KEYS.RESET_FLAG, 'true');
  }
}

