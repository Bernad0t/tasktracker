# Using the official Node.js image as the base image
FROM node:latest

# Setting the working directory
WORKDIR /app

# Copying package.json and package-lock.json to the working directory
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the remaining source files to the working directory
COPY . .

# Compiling TypeScript source files
RUN npx tsc

# Defining the command to run the application
CMD npx typeorm-ts-node-esm migration:run -d src/db/db.ts && npm start
# CMD sh -c "npx typeorm-ts-node-esm migration:run -d src/db/db.ts && node dist/app "
