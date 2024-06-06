# Stage 1: Build the Next.js application
FROM node:22-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the application with a minimal Node.js image
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm ci --only=production

EXPOSE 3030

ENV PORT=3030

CMD ["npm", "start"]