#
# docker build -t ghcr.io/amphitheatre-app/playground:v0.0.1 .
#
FROM node:21-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /home/app
COPY package.json ./
RUN yarn config set registry https://registry.npmmirror.com
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /home/app
COPY --from=deps /home/app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /home/app

ENV NODE_ENV production

RUN npm uninstall -g yarn

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /home/app/build/standalone ./
COPY --from=builder --chown=nextjs:nodejs /home/app/build/static ./build/static
COPY --from=builder --chown=nextjs:nodejs /home/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /home/app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /home/app/package.json ./package.json

USER nextjs

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000
EXPOSE $PORT

CMD ["node", "server.js"]
