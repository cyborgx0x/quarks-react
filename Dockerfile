FROM node:16 as build-stage
WORKDIR /app
COPY . .
RUN yarn install 
RUN yarn build