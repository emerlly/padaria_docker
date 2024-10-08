# Use Node.js as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code to the container
COPY . .

# Expose the port the service will run on
EXPOSE 4000

# Start the application
CMD ["node", "src/index.js"]
