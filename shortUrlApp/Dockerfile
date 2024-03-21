FROM node:18-alpine as build

WORKDIR /app

COPY shortUrlApp /app

RUN rm -rf /app/node_modules

RUN rm -rf /app/package.lock

ENV NODE_ENV=production

RUN npm i serve -g

RUN npm i --production

# Instala TypeScript globalmente
RUN npm install -g typescript

#RUN npm run build

EXPOSE 8080

CMD ["npm","run","serve"]