FROM node:20 AS build

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN echo "$(pwd)" && echo "$(ls)"

EXPOSE 8081

CMD ["npm", "run", "serve"]