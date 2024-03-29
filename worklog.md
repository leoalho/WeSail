# Work Log

| Day | Hours | What was accomplished |
| :----:|:-----| :-----|
| 1.12.22 | 3 | Planned project: techstack, repositories |
| 4.12.22 | 1 | Created Github repo, initialized project |
| 11.1.23 | 1 | Initialized a typescript express backend |
| 12.1.23 | 6 | Containerized backend, mongodb connection via docker, created user model and first API routes for user CRUD and login/logout |
| 13.1.23 | 4 | Created models for boats and trips, Created simple start screen for logged in users and a login form |
| 14.1.23 | 2  | Created functionality for login |
| 15.1.23 | 2 | Added express-sessions and redis for backend, created redis container |
| 16.1.23 | 5 | Added functionality for logging out. Began using react router, created a navbar, homepage and login page. Created a signup form and page and added functionality for that. Created types for backend (boat, trip) |
| 17.1.23 | 5 | Added styling to frontend, first with react-bootstrap, and then switched to vanilla CSS. Created a new page for displaying user info, updated models for user, boat and trip. |
| 19.1.23 | 3 | Started using Redux via Redux/toolkit. |
| 20.1.23 | 6 | Debugging Redux. Began using leaflet and geolocation API for logging |
| 23.1.23 | 8 | Added geoJSON layer to logging. Wrote requirements specification, set up a CI pipeline with Github Actions. Created front and backend functionality for adding a boat. |
| 24.1.23 | 4 | Added a page for a single boat and for a new event. Added a backend route for it. Made some styling changes, especially with the navbar. Updated typing and models for boats and users |
| 25.1.23 | 2 | Added a new page for a single user. Updated boat and user models: added friend and crewRequests. Added functionality for sending friend requests, accepting/declining friend requests and removing friends from your friendlist |
| 26.1.23 | 8 | Continued working on functionality for sending friend requests, accepting/declining friend requests and removing friends from your friendlist. Created search functionality for boats and users in the navbar |
| 28.1.23 | 3 | Users can follow vessels | 
| 29.1.23 | 4  | Debugging friendrequests and following vessels |
| 30.1.23 | 6 | Created form, Model, route, and services for newEvent |
| 1.2.23 | 2 | Created a page for adding a log entry, started creating the types and model for the log entries |
| 2.2.23 | 4 | Created a form for new log entries. Logging now draws a polyline on the map and creates a gpx-compliant object but does not yet save it anywhere. |
| 3.2.23 | 4 | Updated the event view to be more sophisticated |
| 4.2.23 | 2 | Created routes and backend services for logs|
| 5.2.23 | 4 | Created services for displaying logs on the main page. Added routes for user's logs, boat's logs, boat's events. Bugfixes concerning mongoose |
| 6.2.23 | 8 | Single boat page shows the boat's log and upcoming events related to the boat, single user page shows the user's log, updated the event and log cards. Again continued modifying the friend approval system: added new actions to the userReducer. |
| 8.2.23 | 5 | Updated the userReducer, refactored backend structure. Created first backend tests with jest and supertest |
| 9.2.23 | 3 | Refactored backend services. Added front- and backend functionality to join events |
| 10.2.23 | 2 | Created new backend tests for user paths |
| 17.2.23 | 7 | Refactoring backend for updating users. Created new views for boat depending on user's status. Upcoming events can be filtered |
| 19.2.23 | 2 | Changed backend methods for adding friends. |
| 20.2.23 | 5 | Asking and accepting crew member applications works on the backend: Small style edits |
| 21.2.23 | 6 | Rejecting crew applications works on both front- and backend. Created a colour scheme for the app, added new styles |
| 22.2.23 | 6 | Added styling for login and signup pages. Edited styling for cards in main feed. Added a todo list for boats, that is visible for crew members and owners. Added a list of past events for boats which as well is visible for crew members and owners |
| 24.2.23 | 7 | Todos on boatpage can be added and deleted. Added new fields with react select for adding crew members when creating logs.
| 25.2.23 | 4 | |USers can mark todos as done when creating new logs. Event cards are updated when a user joins/unjoins them. Past events can be either discarded or new log entries can be created from them. Started preparing for launching fist version.|
| 27.2.23 | 6 | Fixed some bugs with adding a new event and a new log entry, should work seamlessly now. Todos can be deleted. Users can create a log entry when marking todos as done |
| 1.3.23 | 5 | Added nginx as a reverse proxy for the backend. Started creating kubernetes configuration files |
| 2.3.23 | 4 | Debugging to get a working version, small changes to the docker compose files. |
| 3.3.23 | 10 | First version now online hosted via digital ocean! Started writing tests for frontend. There was quite a lot of problems with getting the frontend tests to work. Created first babel.config.js and jest.config.ts files and tried configuring these, but this did not have any help. Finally Adding environmental variables to the package.json fixed the issue. Made some styling changes here and there. |
| 5.3.23 | 3 | Added notifications via react-hot-toast. Edited the single boat page. Made some small style changes here and there. |
| 6.3.23 | 3 | Got the first unit test finally to work. Started working on E2E tests via Cypress. |
| 29.3.23 | 3 | Wrote a proper README. Enabled https so the geolocationAPI works in production as well. |
| 30.3.23 |2 | Created a new dockerfile for running the app locally. Small style changes. |
| 2.4.23 | 2 | Updated Pipeline.|
| 3.4.23 | 3 |started with email and password updated |
| 4.4.23 | 2 | Finished with address and email updating. Added more notifications |
| 5.4.23 | 3 | Made changes to the docker-compose files and nginx conf files, so that the frontend build is now served via nginx and not the backend server as before, this is to enable react router to work even whn refreshing pages. |
| 6.4.23 | 2 | Boat owners can now delete their own boats via the single boat page |
| 7.4.23 | 3 | Boat owners can add more owners to their boats. |
| 8.4.23 | 3 | Started working on editing upcoming events |
| 9.4.23 | 3 | Events can now be edited by the creator of the event. |
| 12.4.23 | 3 | Finished with setting up cypress. Wrote first E2E tests with cypress. |
| 13.4.23 | 3 | More E2E testing. Added a js file to initialize the db |
| 14.4.23 | 2| Began using prettier both in frontend and backend for consistent formatting. Refactored app-file in backend. Created an error handling middleware |
| 15.4.23 | 4 | Style changes here and there. Started writing a getting started guide. Wrote more of README |
| 16.4.23 | 4 | Made log togglers functional on single boat page. styling for button tags. The lists of users in events and logs now have links to the userpage and the trailing comma after the list is no longer there. Small padding and margin changes here and there. Past events were before editable and deletable by any user, this has now been changed both on the fronted and the backend. |
| Total | 214 ||