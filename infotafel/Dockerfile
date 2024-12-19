# Base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (for Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose application ports
EXPOSE 3000 8000

# Default command
CMD ["npm", "start"]
