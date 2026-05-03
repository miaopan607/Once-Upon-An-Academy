FROM node:22-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --prod --frozen-lockfile

COPY server/ ./server/

EXPOSE 3001
CMD ["node", "server/index.js"]
