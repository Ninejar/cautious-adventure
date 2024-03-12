# FROM node:18-alpine

# EXPOSE 3000

# RUN groupadd app-gr

# RUN useradd -g app-gr usr

# RUN mkdir /app

# WORKDIR /app

# COPY --chown=user:group . /app

# RUN npm install

# USER usr

# CMD [ "node", "index.js"]

# Stage 1: Build frontend
FROM node:14.17.5 AS frontend-builder

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .

RUN npm run build

# Stage 2: Build backend
FROM node:14.17.5 AS backend-builder

WORKDIR /backend

COPY backend/package*.json ./
RUN npm install

COPY backend .

# Stage 3: Final image
FROM node:14.17.5-alpine

WORKDIR /app

# Copy built frontend and backend from previous stages
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist
COPY --from=backend-builder /app/backend /app/backend

# Expose necessary ports
EXPOSE 8081
EXPOSE 1814

# Command to run the application
CMD ["node", "backend/index.js"]
