# Base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (for Docker caching)
COPY package*.json ./

# Install dependencies during the build phase
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app during the build phase (if required)

# Expose application ports (optional, based on your app)
EXPOSE 3000 8000
