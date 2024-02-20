# Use the official Node.js 16 image as a base
FROM node:16

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Angular application
RUN npm run build 

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the Angular application
CMD ["npm", "run", "start"]
