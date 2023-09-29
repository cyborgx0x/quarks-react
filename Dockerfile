FROM node:18 as build-stage
WORKDIR /app
COPY . .
RUN yarn install 
RUN yarn build