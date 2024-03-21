FROM node:18-alpine as build

WORKDIR /app

COPY shortUrlApp /app

RUN rm -rf /app/node_modules

RUN rm -rf /app/package.lock

ENV NODE_ENV=production

RUN npm i serve -g

RUN npm i --production

EXPOSE 8080

CMD ["npm","run","serve"]

#RUN npm run build

#FROM nginx:alpine
#COPY --from=build /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx","-g","daemon off;"]