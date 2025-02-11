# Use Node.js to build the app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variable during build
ARG VITE_GOOGLE_MAPS_API
ENV VITE_GOOGLE_MAPS_API=$VITE_GOOGLE_MAPS_API

# Build the React app
RUN npm run build --verbose

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy build files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
