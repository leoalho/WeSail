FROM node:19-alpine
WORKDIR /usr/src/app
COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm ci
COPY frontend .
RUN npm run build

FROM node:19-alpine
WORKDIR /usr/src/app
COPY backend/package.json .
COPY backend/package-lock.json .
RUN npm ci
COPY  backend .
COPY --from=0 /usr/src/app/build ./frontend
CMD npm run start