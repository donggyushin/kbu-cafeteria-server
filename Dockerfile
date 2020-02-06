FROM node:10 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . . 

RUN npm run build

COPY src/keys /usr/src/app/dist/keys

EXPOSE 4001 


CMD ["yarn", "docker"]