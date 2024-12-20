FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Set environment variables directly in the Dockerfile
ENV NEXT_PUBLIC_BACKEND_APP_API_URL=${NEXT_PUBLIC_BACKEND_APP_API_URL} 
ENV NEXT_PUBLIC_STRAPI_APP_API_URL=${NEXT_PUBLIC_STRAPI_APP_API_URL} 

RUN npm run build 

EXPOSE 3000 8000

CMD ["npm", "start"]