Wesail is a web application created as a project for the "fullstackopen" course. It is a social media for logging sail trips, managing boat maintenance and boating trips.

## Running the application

The root directory has two docker compose files. The docker-compose.local.dev can be used when running the app locally, this will launch the app at localhost:3001. The difference with the two docker compose filesis that the docker-compose.yml has nginx as a reverse proxy. When launchin the app for the first time the app contains a default user which can be used to login right away (username: leo, password: salasana). After logging in there are already quit a lot of things a user can do, the main functionalities in the app are listed in the [requirement specification](./documentation/requirements_specification.md). Please notice that the location tracking in the /logging with PCs is quite laggy, the initial point was to also make a react native version of the application, but this is yet to be implemented. In addition the location trackig does not yet save the route anywhere. In addition in the user's ow page, the setting for changing password and email are not yet functional.

## Technologies used
The application is written in typescript. The backend runs on express, and the frontend is done with React with redux as global state management. Session management is implemented via Redis and express session, and data storing via MongodB and Mongoose. Unit testing is done via Jest both in the back and frontend. E2E testing is done with cypress. Nginx is used as a reverse proxy. CI is implemented via github actions. A complete list of libraries used is available [here](./documentation/libraries.md).

The production version of application is Hosted via digital ocean, running on <https://joukko.io>. The production version requires adding The application is running at the moment via docker compose, but I am working on migrating to kubernetes, the initial kubernetes conf files are in the kubernetes folder, but these are not yet ready.

## Folder architecture
The file structure should be rather logical. Backend contains all the files for the backend, and frontend for frontend. As one can see from the Dockerfile, during production, the frontend is first built and then the built frontend is served from a folder named frontend.

## Worklog
[Worklog](./worklog.md)