FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Pass environment variables during the build process
ARG NEXT_PUBLIC_BACKEND_APP_API_URL
ARG NEXT_PUBLIC_STRAPI_APP_API_URL

RUN npm run build \
    NEXT_PUBLIC_BACKEND_APP_API_URL="${NEXT_PUBLIC_BACKEND_APP_API_URL}" \
    NEXT_PUBLIC_STRAPI_APP_API_URL="${NEXT_PUBLIC_STRAPI_APP_API_URL}"

EXPOSE 3000 8000

CMD ["npm", "start"]