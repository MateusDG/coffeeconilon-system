FROM node:20-alpine AS build
WORKDIR /app
COPY package.json tsconfig.json vite.config.ts index.html ./
RUN npm install
COPY public ./public
COPY src ./src
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]