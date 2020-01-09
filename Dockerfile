FROM node:10 

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install 

COPY . . 

EXPOSE 4001 

CMD ["yarn", "docker"]