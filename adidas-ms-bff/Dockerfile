FROM node:16
LABEL maintainer "Ivano García <ivanojgarcia@gmail.com>"

WORKDIR /app

ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN yarn install

COPY . .


EXPOSE 8000

CMD ["yarn", "start"]