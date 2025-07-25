FROM node:24-alpine AS build
WORKDIR /app
ARG VITE_APP_BACKEND_URL
ENV VITE_APP_BACKEND_URL=$VITE_APP_BACKEND_URL
COPY frontend/package*.json ./
ENV NODE_ENV=development
RUN npm ci
COPY frontend/ ./
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
