FROM node:21.6.1-slim

EXPOSE 8081/tcp

RUN groupadd app-gr

RUN useradd -g app-gr usr

RUN mkdir /app

WORKDIR /app

COPY --chown=user:group . /app

RUN npm install

USER usr

CMD ["npm", "run", "serve"]