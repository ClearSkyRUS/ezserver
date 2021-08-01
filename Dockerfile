FROM node:12-alpine

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

WORKDIR /home/app

COPY package*.json ./
COPY .babelrc ./

RUN npm i

COPY ./src ./src

EXPOSE 3003 

USER node

CMD npm run build-start