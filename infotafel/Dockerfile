# Stage 1: Install dependencies
FROM node:18 AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Stage 2: Copy the rest of the app
FROM node:18

WORKDIR /usr/src/app

# Copy installed dependencies from build stage
COPY --from=build /usr/src/app /usr/src/app

# Copy the rest of the application
COPY . .

# Run build process
RUN npm run build

# Expose ports
EXPOSE 3000 8000

# Command to start the app
CMD ["npm", "run", "start"]
