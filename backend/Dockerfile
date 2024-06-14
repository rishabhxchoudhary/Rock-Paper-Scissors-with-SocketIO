FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 8000

CMD ["npm", "run", "dev"]