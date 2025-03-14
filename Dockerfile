# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

# Step 2: Serve with Nginx
FROM nginx:1.25-alpine

# Copy Nginx config from repo
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default Nginx static files and copy Angular dist output
RUN rm -rf /usr/share/nginx/html/*
# Make sure this matches your Angular output structure
COPY --from=build /app/dist/logit /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]