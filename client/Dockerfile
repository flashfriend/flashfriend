FROM node:16.13.1
WORKDIR /app/client
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 8080
ENTRYPOINT npm run build