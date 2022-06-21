FROM node:14-alpine3.14 AS DEVELOPMENT

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build
