FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000 8000

CMD ["sh", "-c", "npm install && npm run dev"]