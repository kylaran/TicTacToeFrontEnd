FROM node:14.17.1-alpine AS build
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run nginx ###
FROM nginx:1.17.1-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/webapp /usr/share/nginx/html

