FROM node:16
LABEL maintainer "Ivano García <ivanojgarcia@gmail.com>"

WORKDIR /app

ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN yarn install

COPY . .


EXPOSE 3000

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]