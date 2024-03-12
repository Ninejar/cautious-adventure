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

# Create a non-root user
RUN groupadd -r app-group && useradd -r -g app-group usr

# Set working directory
WORKDIR /app

# Copy project files
COPY --chown=usr:app-group . .

# Install dependencies
RUN npm install

# Expose the required port
EXPOSE 8081/tcp

# Switch to non-root user
USER usr

# Command to run the application
CMD ["npm", "run", "serve"]
