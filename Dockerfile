FROM node:18-alpine

EXPOSE 3000

RUN groupadd app-gr

RUN useradd -g app-gr usr

RUN mkdir /app

WORKDIR /app

COPY --chown=user:group . /app

RUN npm install

USER usr

CMD [ "node", "index.js"]