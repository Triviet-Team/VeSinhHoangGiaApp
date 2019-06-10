FROM node:10.16.0
WORKDIR /usr/src/app
RUN chmod -R 777 /usr/src/app
COPY package.json ./
RUN yarn install
RUN yarn global add expo-cli
COPY . .
EXPOSE 19002
CMD ["yarn", "start"]