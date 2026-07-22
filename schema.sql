-- LevelUp - Gamified Life Operating System Database Schema
-- Compatible with MySQL 8.0+ and MariaDB

CREATE DATABASE IF NOT EXISTS levelup_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE levelup_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    level INT DEFAULT 1,
    current_xp INT DEFAULT 0,
    coins INT DEFAULT 50,
    current_streak INT DEFAULT 1,
    longest_streak INT DEFAULT 1,
    today_goal_xp INT DEFAULT 50,
    title VARCHAR(100) DEFAULT 'Novice Adventurer',
    last_completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tasks / Quests Table
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- CORE_JAVA, DSA, JAVA_FULLSTACK, MERN, AI_ML, FITNESS, READING, HOBBIES
    difficulty VARCHAR(20) NOT NULL, -- EASY (10XP), MEDIUM (20XP), HARD (40XP), BOSS (100XP)
    xp_reward INT NOT NULL,
    coin_reward INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    skill_tag VARCHAR(100),
    due_date DATETIME,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_task_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_user_category (user_id, category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Garden Plants Table
CREATE TABLE IF NOT EXISTS garden_plants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    flower_type VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    stage INT DEFAULT 0, -- 0: Seed, 1: Sprout, 2: Bud, 3: Bloom
    growth_points INT DEFAULT 0,
    watered_today BOOLEAN DEFAULT FALSE,
    planted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_garden_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Room Decor Table
CREATE TABLE IF NOT EXISTS room_decor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    item_code VARCHAR(50) NOT NULL,
    equipped BOOLEAN DEFAULT FALSE,
    unlocked BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_decor_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Journal Entries Table
CREATE TABLE IF NOT EXISTS journal_entries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50) NOT NULL,
    one_liner VARCHAR(255) NOT NULL,
    reflection TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_journal_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
