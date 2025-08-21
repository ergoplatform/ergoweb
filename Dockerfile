# Install dependencies only when needed
FROM node:20.19.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:20.19.0-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV NEXT_PUBLIC_STRAPI_API='https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app'

RUN npm run build && npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:20.19.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
RUN npx next telemetry disable

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
CMD ["npm", "run", "start"]
