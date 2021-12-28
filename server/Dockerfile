FROM node:16.13.1
WORKDIR /app/server
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 3000
ENTRYPOINT node ./server.js