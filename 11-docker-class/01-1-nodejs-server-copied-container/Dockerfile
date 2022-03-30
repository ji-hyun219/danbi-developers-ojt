# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000