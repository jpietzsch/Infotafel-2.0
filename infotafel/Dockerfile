# Use the official Node.js 18 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Configure npm to use the default registry (in case of registry issues)
RUN npm config set registry https://registry.npmjs.org/

# Copy only package.json and package-lock.json first (for Docker caching)
COPY package*.json ./

# Install dependencies during the build phase
RUN npm install

# Copy the rest of the application code after dependencies are installed
COPY . .

# Build the app during the build phase (optional, only if needed)
#RUN npm run build  # Add this only if your app requires a build step

# Expose application ports
EXPOSE 3000 8000

CMD ["npm", "start"]
