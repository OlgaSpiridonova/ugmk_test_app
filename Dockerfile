FROM node:17-alpine
WORKDIR /ugmk_test_app
COPY package*.json /ugmk_test_app
RUN npm install
COPY . .
EXPOSE 3000:3000
CMD ["npm", "run", "start"]