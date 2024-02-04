FROM --platform=linux/arm64/v8 node:20-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .