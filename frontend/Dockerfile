# FROM node:21.6.1-slim

# EXPOSE 8081/tcp

# # RUN groupadd app-gr

# # RUN useradd -g app-gr usr

# RUN mkdir /app

# WORKDIR /app

# COPY --chown=user:group . /app

# RUN npm install

# # USER usr

# CMD ["npm", "run", "serve"]

FROM node:14.17.5-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY --chown=node:node . .

# Install dependencies
RUN npm install

# Expose the required port
EXPOSE 8081/tcp

# Command to run the application
CMD ["npm", "run", "serve"]
