FROM node:16-alpine as development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/index.js" ]

