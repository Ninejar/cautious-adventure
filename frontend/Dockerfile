FROM node:20-alpine3.17

EXPOSE 8081/tcp

WORKDIR /app

COPY --chown=user:group . /app

RUN npm install

CMD ["npm", "run", "serve"]