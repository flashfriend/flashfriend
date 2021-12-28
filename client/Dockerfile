FROM node:16.13.1 AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install

COPY . ./
ENTRYPOINT npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/public .
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]