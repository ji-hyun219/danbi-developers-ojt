# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn install
CMD ["npm", "start"]
EXPOSE 3001