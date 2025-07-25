FROM node:24-alpine as build

WORKDIR /frontend
COPY package.json package-lock.json /frontend/
RUN npm ci
COPY . /frontend/
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
