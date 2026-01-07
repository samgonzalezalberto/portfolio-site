# Deterministic Docker execution environment (Sprint-00)
# Base image pinned to an exact digest (linux/amd64) per spec.
FROM node:20.11.0-alpine@sha256:9b61ed13fef9ca689326f40c0c0b4da70e37a18712f200b4c66d3b44fd59d98e

WORKDIR /app

COPY package.json package-lock.json ./

# Use lockfile-enforced, deterministic install (npm install forbidden in Docker).
RUN npm ci --no-audit --no-fund

COPY . .

CMD ["npm", "run", "typecheck"]
