# Dockerfile

# Use node alpine as it's a small node image
FROM node:18-alpine
#FROM node:20-alpine3.19

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /paymenthistory

# Set /app as the working directory
WORKDIR /paymenthistory

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /paymenthistory

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY . /paymenthistory

# Ensure port 4005 is accessible to our system
EXPOSE 4005

# Run yarn dev, as we would via the command line 
CMD ["npm", "run", "start"]