FROM node:24-alpine

WORKDIR /frontend

COPY package.json package-lock.json /frontend/

RUN npm ci

COPY . /frontend/

CMD npm run dev
