FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run tsc

COPY --from=builder ./app/public ./public

COPY --from=builder ./app/build ./build

EXPOSE 4000

CMD ["node", "start"]