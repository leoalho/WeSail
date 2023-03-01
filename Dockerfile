FROM node:16
WORKDIR /usr/src/app
COPY wesailfrontend .
RUN npm ci
CMD npm run build

FROM node:16
WORKDIR /usr/src/app
COPY  WeSailBackend .
COPY --from=0 /usr/src/app/build ./frontend
RUN npm ci
CMD npm run start