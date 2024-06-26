FROM node:alpine3.19

EXPOSE 3000

WORKDIR /opt/app

COPY server.js logger-middleware.js package.json ./

RUN npm install 

CMD node server.js