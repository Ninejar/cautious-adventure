FROM node:20 AS build

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["npm", "run", "serve"]