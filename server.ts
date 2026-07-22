import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';


async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini AI client for server-side AI Coach
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Authentication REST endpoints (JWT simulation)
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEiLCJuYW1lIjoiTXVza2FuIiwiaWF0IjoxNTE2MjM5MDIyfQ.sample_jwt_token';
    return res.json({
      token,
      user: {
        id: 'user_1',
        name: 'Muskan',
        email,
        level: 3,
        currentXp: 85,
        coins: 140,
        currentStreak: 5,
        longestStreak: 12,
        todayGoalXp: 50,
        title: 'Cozy Java Adventurer',
      },
    });
  });

  app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.new_user_token';
    return res.json({
      token,
      user: {
        id: 'user_' + Date.now(),
        name,
        email,
        level: 1,
        currentXp: 0,
        coins: 50, // Welcome gift!
        currentStreak: 1,
        longestStreak: 1,
        todayGoalXp: 50,
        title: 'Novice Adventurer',
      },
    });
  });

  app.post('/api/auth/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    return res.json({ message: `Password reset link sent to ${email} 🌸` });
  });

  // AI Coach endpoint powered by Gemini 3.6 Flash
  app.post('/api/ai-coach/chat', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      const userLevel = context?.level || 1;
      const userStreak = context?.streak || 1;

      const systemInstruction = `
You are "Mochi 🐱", the official AI Study Coach for LevelUp - a cozy, RPG-style gamified life operating system.
Your mission: Help students, job seekers, developers, and people with ADHD tendencies stay consistent WITHOUT GUILT.
Key Guidelines:
1. ALWAYS respond with warmth, kindness, and gentle encouragement.
2. NEVER guilt, punish, or sound aggressive. Use cozy emojis (🌸, 🌿, ☕, 🐱, ✨).
3. If the user feels overwhelmed or stuck, break down their studying into tiny micro-quests (e.g. 5-10 minute tasks worth 10 XP).
4. Provide structured, clear learning tips for technical topics like Core Java, DSA, Spring Boot, React, or System Design.
5. User info: Level ${userLevel}, Current Streak: ${userStreak} Days.
6. Keep answers concise, clear, and inspiring.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "Welcome back 🌸 Remember that slow and steady progress is still progress! How can I help you today?";

      return res.json({
        id: 'coach_' + Date.now(),
        sender: 'coach',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } catch (err) {
      console.error('Gemini AI Coach error:', err);
      return res.json({
        id: 'coach_' + Date.now(),
        sender: 'coach',
        text: "Welcome back 🌸 I'm right here with you! Let's pick a gentle 10 XP quest today and build consistency step by step ✨",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
  });

  // Spring Boot & MySQL Full Architecture Exporter
  app.get('/api/backend-code', (req, res) => {
    const files = [
      {
        path: 'com.levelup.entity.UserEntity.java',
        category: 'Entity',
        content: `package com.levelup.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String name;

    private Integer level = 1;
    private Integer currentXp = 0;
    private Integer coins = 50;
    private Integer currentStreak = 1;
    private Integer longestStreak = 1;

    private LocalDateTime lastCompletedAt;
    private LocalDateTime createdAt = LocalDateTime.now();
}`
      },
      {
        path: 'com.levelup.entity.TaskEntity.java',
        category: 'Entity',
        content: `package com.levelup.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks", indexes = {
    @Index(name = "idx_task_user", columnList = "user_id"),
    @Index(name = "idx_task_category", columnList = "category")
})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // EASY (10XP), MEDIUM (20XP), HARD (40XP), BOSS (100XP)

    private Integer xpReward;
    private Integer coinReward;
    private Boolean completed = false;

    private LocalDateTime completedAt;
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Category { CORE_JAVA, DSA, JAVA_FULLSTACK, MERN, AI_ML, FITNESS, READING, HOBBIES }
    public enum Difficulty { EASY, MEDIUM, HARD, BOSS }
}`
      },
      {
        path: 'com.levelup.repository.UserRepository.java',
        category: 'Repository',
        content: `package com.levelup.repository;

import com.levelup.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Boolean existsByEmail(String email);
}`
      },
      {
        path: 'com.levelup.service.TaskService.java',
        category: 'Service',
        content: `package com.levelup.service;

import com.levelup.entity.TaskEntity;
import com.levelup.entity.UserEntity;
import com.levelup.repository.TaskRepository;
import com.levelup.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public TaskEntity completeTask(Long taskId, Long userId) {
        TaskEntity task = taskRepository.findByIdAndUserId(taskId, userId)
            .orElseThrow(() -> new RuntimeException("Task not found"));

        if (task.getCompleted()) return task;

        task.setCompleted(true);
        task.setCompletedAt(LocalDateTime.now());

        UserEntity user = task.getUser();
        user.setCurrentXp(user.getCurrentXp() + task.getXpReward());
        user.setCoins(user.getCoins() + task.getCoinReward());

        // Level Up Logic: Level N requires N * 100 XP
        int xpNeeded = user.getLevel() * 100;
        if (user.getCurrentXp() >= xpNeeded) {
            user.setLevel(user.getLevel() + 1);
            user.setCurrentXp(user.getCurrentXp() - xpNeeded);
            user.setCoins(user.getCoins() + 25); // Level Up Bonus!
        }

        userRepository.save(user);
        return taskRepository.save(task);
    }
}`
      },
      {
        path: 'com.levelup.controller.TaskController.java',
        category: 'Controller',
        content: `package com.levelup.controller;

import com.levelup.entity.TaskEntity;
import com.levelup.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<TaskEntity> completeTask(@PathVariable Long id, @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(taskService.completeTask(id, userId));
    }
}`
      },
      {
        path: 'com.levelup.security.JwtAuthenticationFilter.java',
        category: 'Security',
        content: `package com.levelup.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = getJwtFromRequest(request);
        if (token != null && tokenProvider.validateToken(token)) {
            Long userId = tokenProvider.getUserIdFromJWT(token);
            request.setAttribute("userId", userId);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userId, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}`
      }
    ];

    const schemaSql = `-- LevelUp MySQL Production Database Schema
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
    last_completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL, -- EASY (10XP), MEDIUM (20XP), HARD (40XP), BOSS (100XP)
    xp_reward INT NOT NULL,
    coin_reward INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    due_date DATETIME,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_task_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_user_category (user_id, category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Flower Garden Table
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
`;

    return res.json({ files, schemaSql });
  });

  // Vite development middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 LevelUp Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
