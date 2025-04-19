# Using node.js to develop and build
FROM node:16 AS builder

# Setting the working directory inside the container
WORKDIR /app

# Copying package.json and package-lock.json
COPY package.json package-lock.json ./

# Installing dependencies
RUN npm install

# Copying the source code of the project
COPY . .

# Building the project for production
RUN npm run build

# Running nginx
CMD ["npm", "start"]
