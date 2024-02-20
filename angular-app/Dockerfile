FROM node:current-alpine AS builder
WORKDIR /
COPY . /app
RUN npm install -g @angular/cli
RUN cd /app && npm install 
RUN cd /app && ng build --configuration=production

# Effective Stage
FROM nginx:alpine
COPY --from=builder /app/dist/ci-project /usr/share/nginx/html
