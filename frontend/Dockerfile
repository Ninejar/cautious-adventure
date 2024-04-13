FROM node:21-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm ci

COPY . /app

EXPOSE 8081

CMD ["npm", "run", "dev"]