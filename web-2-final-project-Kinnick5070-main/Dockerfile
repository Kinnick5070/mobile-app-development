FROM node:20
WORKDIR /app
COPY package.json .
RUN npm config set strict-ssl false
COPY . .
CMD node app.js