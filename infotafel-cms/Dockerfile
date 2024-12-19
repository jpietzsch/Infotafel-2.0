# Verwende Node.js als Basis
FROM node:18

# Arbeitsverzeichnis festlegen
WORKDIR /usr/src/cms

RUN npm config set registry https://registry.npmjs.org/
# package.json und Abhängigkeiten installieren
COPY package*.json ./
RUN /usr/local/bin/npm install

# Quellcode kopieren
COPY . .

# Port öffnen
EXPOSE 1337

CMD ["npm", "start"]