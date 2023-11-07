FROM node:19 

COPY . .

RUN npm install 

RUN npm run build

EXPOSE 8080

CMD ["node", "build/main.js"]
