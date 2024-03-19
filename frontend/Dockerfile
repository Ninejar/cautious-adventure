FROM node:21-alpine

WORKDIR /app

# COPY --chown=user:group . /app
COPY . .

RUN npm install

RUN npm run build

EXPOSE 8081/tcp

CMD ["npm", "run", "preview"]