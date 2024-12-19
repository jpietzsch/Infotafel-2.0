# Use the official Node.js 18 image as the base
FROM node:18
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies BEFORE copying the rest of the code
RUN npm install 

# Now copy the rest of the application code
COPY . .

EXPOSE 3000 8000

CMD ["npm", "start"] 
