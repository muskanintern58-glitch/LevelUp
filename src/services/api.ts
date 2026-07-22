import { Task, UserProfile, AICoachMessage } from '../types';

export interface SpringBootFile {
  path: string;
  category: 'Entity' | 'Controller' | 'Service' | 'Repository' | 'DTO' | 'Security' | 'Config' | 'Schema';
  content: string;
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: UserProfile }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  return res.json();
}

export async function signupUser(name: string, email: string, password: string): Promise<{ token: string; user: UserProfile }> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Signup failed');
  }
  return res.json();
}

export async function askAICoach(userPrompt: string, userContext: { level: number; streak: number; currentXp: number }): Promise<AICoachMessage> {
  const res = await fetch('/api/ai-coach/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: userPrompt, context: userContext }),
  });
  if (!res.ok) {
    // Fallback friendly offline response if API unavailable
    return {
      id: 'coach_' + Date.now(),
      sender: 'coach',
      text: "Welcome back 🌸 Remember that consistency is built step-by-step. How about picking one small 10 XP task to start with today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }
  return res.json();
}

export async function fetchSpringBootCode(): Promise<{ files: SpringBootFile[]; schemaSql: string }> {
  const res = await fetch('/api/backend-code');
  if (!res.ok) {
    throw new Error('Failed to load Spring Boot architecture codebase');
  }
  return res.json();
}
