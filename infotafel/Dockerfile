# Base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (for Docker caching)
COPY package*.json ./

# Install dependencies and print a log during the build
RUN echo "Installing dependencies..." && npm install

# Copy the rest of the application
COPY . .


# Expose application ports (optional)
EXPOSE 3000 8000
