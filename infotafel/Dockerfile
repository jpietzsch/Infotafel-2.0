FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Use the ARG instruction to receive environment variables from Portainer
ARG NEXT_PUBLIC_BACKEND_APP_API_URL
ARG NEXT_PUBLIC_STRAPI_APP_API_URL

RUN npm run build \
    -e NEXT_PUBLIC_BACKEND_APP_API_URL="$NEXT_PUBLIC_BACKEND_APP_API_URL" \
    -e NEXT_PUBLIC_STRAPI_APP_API_URL="$NEXT_PUBLIC_STRAPI_APP_API_URL"

EXPOSE 3000 8000

CMD ["npm", "start"]