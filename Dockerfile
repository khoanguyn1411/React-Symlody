# Install dependencies only when needed
FROM node:14.18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
# COPY ./patches ./patches
# RUN yarn install --frozen-lockfile --unsafe-perm
RUN yarn install --frozen-lockfile 


# Rebuild the source code only when needed
FROM node:14.18-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS="--max-old-space-size=${MAX_OLD_SPACE_SIZE}"

# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline


RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactjs -u 1001



USER reactjs

EXPOSE 3000

CMD ["yarn", "start"]
