FROM node:19-alpine
WORKDIR /usr/src/app
COPY frontend/package.json .
COPY frontend/package-lock.json .
ENV NODE_ENV=production
RUN npm ci
COPY frontend .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]