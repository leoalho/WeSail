FROM node:16
WORKDIR /usr/src/app
COPY frontend .
RUN npm ci
RUN npm run build

FROM node:16
WORKDIR /usr/src/app
COPY  backend .
COPY --from=0 /usr/src/app/build ./frontend
RUN npm ci
CMD npm run start