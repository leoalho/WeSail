Wesail is a web application created as a project for the "fullstackopen" course. It is a social media application for logging planning and sharing sail trips and boat maintenance.

## Running the application
Running the application requires that the user has docker installed and running. The root directory has three docker compose files. 

The docker-compose.local.dev can be used with docker compose to run the app locally (command: docker compose -f docker-compose.local.yml up -d), this will launch the app at http://localhost:3001. 

[Docker-compose.yml](docker-compose.yml) is intended for production, it has https enabled and nginx won't work without adding a SSL certificate and key into the ./backend/ssl directory.
The docker-compose.localstack.yml can be used to run the application in swarm mode. The sphepherd container used for automatic updates works only on computers with a UNIX-like filesystem but the application will launch even if spherpherd does not work.

When launchin the app for the first time the database is initialized according to the [dev-mongo-init.js](./backend/mongo/dev-mongo-init.js) file located in ./backend/mongo/ directory. It initializes the db with a default user which can be used to login right away (username: test, password: salasana).
After logging in there are already quit a lot of things a user can do, the main functionalities in the app are listed in the [requirement specification](./documentation/requirements_specification.md). Please notice that the location tracking in /logging with PCs is quite laggy, the initial point was to also make a react native version of the application, but this is yet to be implemented. In addition the location trackig does not yet save the route anywhere. In addition in the user's own page, the setting for changing password and email are not yet functional.

## Architecture
The application is written in typescript. The backend runs on express, and the frontend is done with React with redux as global state management. Session management is implemented via Redis and express session, and data storing via MongodB and Mongoose. Unit testing is done via Jest both in the back and frontend. E2E testing is done with cypress. Nginx is used as a reverse proxy and for serving the built React app in production mode. CI is implemented via github actions. A complete list of libraries used is available [here](./documentation/libraries.md).


![architecture](./documentation/images/architecture.png)

The production version of application is Hosted via digital ocean, running on <https://joukko.io>. The production version is running at the moment via docker compose, but I am working on migrating to kubernetes, the initial kubernetes conf files are in the kubernetes folder, but these are not yet ready.

### Folder architecture
The file structure should be rather logical. Backend contains all the files for the backend, and frontend for frontend. The root firectory of backend contain some configuration files and subdirectories mongo and redis.

The code itself is located in the ./frontend/src and ./backend/src directories. The ./backend/src has 5 subdirectories: models, routes, services, tests, and utils. Models contains files for the mongoose models, ruotes files for express routing, services for the functionality of routes, tests for testfiles and utils fr helper functions etc. The frontend/src contain three subdirectories: components, reducer and services. Components contains the subdirectories and files for the tsx components, reducers the reduers for redux and services the functionality for the components (mainly communiating with the backend).

As one can see from the Dockerfile, during production, the frontend is first built and then the built frontend is served via nginx.

## Worklog
[Worklog](./worklog.md)

## Reflection
The biggest criticism at the moment is the way I have implemented the styling of the frontend. I played with both bootstrap and Material UI but ended up with native css. At the moment there is one large App.css file in the ./frontend/src directory. In addition there are style objects in some components and some inline styling.

Some components are too bloated, and should be split into several smaller components.

This was my first larger project with both Typescript and React so quite a lot of time went to getting used to using Typescript.