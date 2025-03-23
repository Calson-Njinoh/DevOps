# Stage 1: Build the React app
FROM node:18 AS build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the production version
RUN npm run build

# Stage 2: Serve it with NGINX
FROM nginx:alpine

# Copy built assets from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom NGINX configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
