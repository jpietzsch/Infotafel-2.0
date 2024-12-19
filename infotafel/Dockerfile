FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retry-timeout 60000 \
    && npm config set fetch-retry-maxtries 5 \
    && ping -c 3 registry.npmjs.org \
    && nslookup registry.npmjs.org \
    && npm ci --verbose \
    || { echo "npm ci failed. Check logs above:"; true; exit 1; }

COPY . .

CMD ["npm", "run", "dev"]