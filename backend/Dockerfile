FROM node:20

WORKDIR /app

COPY . /app

RUN npm ci

EXPOSE 8091

CMD ["npm", "start"]