FROM node:16.8-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV API_URL=http://0.0.0.0:8080
EXPOSE 3000
CMD ["npm", "start"]