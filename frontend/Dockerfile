FROM node:18-alpine as development
WORKDIR /app

COPY package*.json .  

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM node:18-alpine as production
WORKDIR /app

COPY --from=build /app/dist/ /app/dist/

EXPOSE 5173

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 5173

CMD ["npm", "run", "preview"]


