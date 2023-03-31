Wesail is a web application created as a project for the "fullstackopen" course. It is a social media for logging sail trips, managing boat maintenance and boating trips.

## Running the application
The application is Hosted via digital ocean, running on <https://joukko.io>. The application is running at the moment via docker compose, but I am working on migrating to kubernetes, the initial kubernetes conf files are in the kubernetes folder, but these are not yet ready.

The application is written in typescript. The backend runs on express, and the frontend is done with React with redux as global state management. Session management is implemented via Redis and express session, and data storing via MongodB and Mongoose. In addition nginx is used as a reverse proxy. CI is implemented via github actions. A complete list of libraries used is available here.

When running locally the app can be launched with docker compose by running docker compose up at the root directory, after that the app runs on port 80 of localhost. The app contains a default user which can be used to login right away (username: leo, password: salasana). After logging in there are already quit a lot of things a user can do, please notice that the location tracking in the /logging with PCs is quite laggy, the initial point was to also make a react native version of the application, but this is yet to be implemented. For a list of functionalities, the requirement_specification -page might be useful.

The file structure should be rather logical. Backend contains all the files for the backend, and frontend for frontend. As one can see from the Dockerfile, during production, the frontend is first built and then the built frontend is served from a folder named frontend.

Worklog