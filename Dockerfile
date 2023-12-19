# docker build -t amphitheatre-playground:v0.0.1 .
FROM node:18-buster-slim AS build

WORKDIR /app/playground
COPY package*.json ./
RUN npm i
COPY . .

RUN npm run build

FROM node:18-buster-slim AS prod

WORKDIR /home/app

COPY --from=build /app/playground/dist /home/app/dist
COPY --from=build /app/playground/node_modules /home/app/node_modules

ENV NODE_ENV production

CMD [ "./node_modules/vite/bin/vite.js", "./dist" ]
