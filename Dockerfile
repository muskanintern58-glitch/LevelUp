# Multi-stage Dockerfile for LevelUp Gamified Life OS

# Stage 1: Build Phase
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests
COPY package.json bun.lock* ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build application bundle
RUN npm run build

# Stage 2: Production Container
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package.json and dist from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.cjs"]
