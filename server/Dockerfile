# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install


# Copy the rest of the backend application code
COPY . .

# Expose the port the backend server runs on
EXPOSE 3005

# Start the backend server
CMD ["npm", "run", "dev"]