# Basis-Image
FROM node:18

# Arbeitsverzeichnis festlegen
WORKDIR /usr/src/app

# package.json kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Ports öffnen (Frontend und Backend)
EXPOSE 3000 8000
