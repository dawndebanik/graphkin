FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . .

# build
RUN npm run build

EXPOSE 8080
CMD [ "node", "build/routes/index.js" ]