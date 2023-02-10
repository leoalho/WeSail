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
| 17.1.23 | 5 | Added styling to frontend, first with react-bootstrap, and then switchet to vanilla CSS. Created a new page for displaying user info, updated models for user, boat and trip. |
| 19.1.23 | 3 | Started using Redux via Redux/toolkit. |
| 20.1.23 | 6 | Debugging Redux. Began using leaflet and geolocation API for logging |
| 23.1.23 | 8 | Added geoJSON layer to logging. Wrote requirements specification, set up a CI pipeline with Github Actions. Created front and backend functionality for adding a boat. |
| 24.1.23 | 4 | Added a page for a single boat and for a new event. Added a backend route for it. Made some styling changes, especially with the navbar. Updated typing and models for boats and users |
| 25.1.23 | 2 | Added a new page for a single user. Updated boat and user models: added friend and crewRequests. Added functionality for sending friend requests, accepting/declining friend requests and removing friends from your friendlist |
| 26.1.23 | 8 | Continued working on functionality for sending friend requests, accepting/declining friend requests and removing friends from your friendlist. Created search functionality for boats and users in the navbar |
| 28.1.23 | 3 | Users can follow vessels | 
| 29.1.23 | 4  | Debuggin frindrequests and following vessels |
| 30.1.23 | 6 | Created form, Model, route, and services for newEvent |
| 1.2.23 | 2 | Created a page for adding a log entry, started creating the types and model for the log entries |
| 2.2.23 | 4 | Created a form for new log entries. Logging now draws a polyline on the map and creates a gpx-complient object but does not yet save it anywhere. |
| 3.2.23 | 4 | Updated the event view to be more sophisticated |
| 4.2.23 | 2 | Created routes and backend services for logs|
| 5.2.23 | 4 | Created servics for displaying logs on the main page. Added routes for user's logs, boat's logs, boat's events. Bugfixes conserning mongoose |
| 6.2.23 | 8 | Single boat page shows the boat's log and upcoming events related to the boat, single user page shows the user's log, updated the event and log cards. Again continued modifying the friend approval system: added new actions to the userReducer. |
| 8.2.23 | 5 | Updated the userReducer, refactored backend structure. Created first backend tests with jest and supertest |
| 9.2.23 | 3 | Refactored backend services. Wrote more API tests. Added functionality to join events |
| Total | 105 ||
