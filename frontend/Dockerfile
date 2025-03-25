# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/build /usr/share/nginx/html

# ✅ Add config.json so the app can fetch backend URL at runtime
COPY config.json /usr/share/nginx/html

# Optional: custom NGINX config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
