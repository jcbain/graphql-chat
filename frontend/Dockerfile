FROM node:16-alpine3.12
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD yarn start