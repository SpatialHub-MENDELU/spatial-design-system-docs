# Stage 1: Build the Vite App
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the Vite app
RUN npm run build

###########

# Stage 2: Serve the App with a Static Server
FROM nginx:stable-alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built app from the previous stage to the NGINX web root
COPY --from=build /app/.vitepress/dist /usr/share/nginx/html

# Expose the port that NGINX will listen on (usually 80 by default)
EXPOSE 8081

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]