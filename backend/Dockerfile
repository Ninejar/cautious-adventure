FROM node:20-alpine3.17

EXPOSE 1814/tcp

RUN mkdir /app

WORKDIR /app

COPY --chown=user:group . /app

RUN npm install

CMD ["npm", "start"]