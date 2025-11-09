FROM node:24-alpine

WORKDIR /front

COPY package*.json .
RUN npm ci

COPY *config* .
COPY components.json .
COPY proxy.ts .
COPY lib ./lib
COPY app ./app
COPY components ./components
COPY hooks ./hooks

CMD ["npm", "run", "dev"]