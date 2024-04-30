FROM node:21 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# FROM nginx:stable-alpine

# COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8081

CMD ["npm", "run", "serve"]