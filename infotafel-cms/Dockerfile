# Verwende Node.js als Basis
FROM node:18

# Arbeitsverzeichnis festlegen
WORKDIR /usr/src/cms

# package.json und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Port öffnen
EXPOSE 1337

# Strapi starten
CMD ["npm", "run", "start"]
