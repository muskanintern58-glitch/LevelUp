# LevelUp - Cozy Gamified Life Operating System 🌸

LevelUp is a cozy, RPG-inspired gamified life operating system designed for students, job seekers, developers, and individuals with ADHD tendencies. It turns daily study routines, coding practice, and habit tracking into a rewarding experience with zero guilt and maximum encouragement.

---

## 🌟 Key Features

1. **Dashboard & Leveling System**:
   - **Level & XP Engine**: Complete tasks to gain XP, level up, and unlock cozy titles.
   - **Streak Tracker**: Maintains daily study momentum with streak freeze protection.
   - **Daily XP Progress Bar**: Visual goal tracker with coin rewards.

2. **Domain-Based Quests**:
   - Core Java, Data Structures & Algorithms, Java Fullstack, MERN Stack, AI/ML, Fitness, Reading, and Hobbies.
   - Difficulty Tiers: Easy (10 XP), Medium (20 XP), Hard (40 XP), Boss Battle (100 XP).
   - Filter by domain and track active vs. completed quests.

3. **Cozy Life Simulation Modules**:
   - **Cozy Room & Avatar Customizer**: Spend earned coins in the shop to unlock desk plants, ambient lamps, rugs, wallpaper, study snacks, and cozy outfits.
   - **Zen Flower Garden**: Plant seeds (Cherry Blossom, Golden Sunflower, Lavender, Bluebell), water them daily, and watch them bloom into garden rewards.

4. **Analytics & One-Line Journal**:
   - Weekly XP Bar Chart & Study Logs.
   - Mood-tagged daily reflections with one-line summaries.

5. **AI Study Coach (Mochi 🐱)**:
   - Built with **Gemini 3.6 Flash**.
   - Provides anti-guilt encouragement, breaks down overwhelming topics into micro-quests, and offers technical guidance.

6. **Spring Boot 3 & MySQL Architecture Hub**:
   - Built-in Spring Boot MVC codebase viewer (Entities, Repositories, Services, Controllers, JWT Filters).
   - Full MySQL DDL `schema.sql` generator for local or Cloud SQL integration.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (Optional, for containerized setup)
- MySQL 8.0+ (Optional, for production database)

### Installation Steps

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/your-username/levelup.git
   cd levelup
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your optional `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🐳 Docker Setup

Run the full stack (App + MySQL Database) using Docker Compose:

```bash
docker-compose up --build -d
```

This starts:
- **LevelUp App**: `http://localhost:3000`
- **MySQL Database**: `localhost:3306` with automatic schema initialization from `schema.sql`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Canvas Confetti.
- **Backend Proxy**: Express.js server (`server.ts`) with Vite SSR/SPA middleware.
- **AI Integration**: Google GenAI SDK (`@google/genai`) using Gemini 3.6 Flash.
- **Backend Export Spec**: Spring Boot 3, Java 21, Spring Data JPA, Spring Security JWT, MySQL 8.
