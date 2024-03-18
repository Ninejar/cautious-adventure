FROM node:18-alpine

WORKDIR /app

# COPY --chown=user:group . /app
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081/tcp

CMD ["npm", "run", "preview"]