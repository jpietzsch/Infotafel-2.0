FROM node:20

WORKDIR /usr/src/app

# Define environment variables as build arguments
ARG NEXT_PUBLIC_BACKEND_APP_API_URL
ARG NEXT_PUBLIC_STRAPI_APP_API_URL

COPY package*.json ./
RUN npm install

COPY . .

# Use the defined environment variables during the build process
RUN npm run build -- -e NEXT_PUBLIC_BACKEND_APP_API_URL=$NEXT_PUBLIC_BACKEND_APP_API_URL \
                   -e NEXT_PUBLIC_STRAPI_APP_API_URL=$NEXT_PUBLIC_STRAPI_APP_API_URL

EXPOSE 3000

CMD ["npm", "start"]