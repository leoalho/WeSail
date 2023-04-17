# Getting started <!-- omit in toc -->

[Wesail](https://joukko.io) is a web application created as a project for the "fullstackopen" course. It is a social media application for logging, planning and sharing sail trips and boat maintenance.

- [Navigation bar](#navigation-bar)
- [Logging in](#logging-in)
- [Signing up](#signing-up)
- [Creating a new boat](#creating-a-new-boat)
- [Main page](#main-page)
- [Boat page](#boat-page)
  - [Following a boat](#following-a-boat)
  - [Settings](#settings)
  - [Events](#events)
  - [Todos](#todos)
- [New log entry](#new-log-entry)
- [New event](#new-event)
- [User page](#user-page)
- [Settings](#settings-1)

## Navigation bar

The navigation bar is visible on all pages.

When not logged in the navigation bar presents links to [logging in](#logging-in) and [creating a new user](#signing-up).

When logged in the navigation bar presents links to the [main page](#main-page) (The WeSail link), the user's boats via a dropdown menu (only visible if the user has any boats), [creating a new log entry](#new-log-entry), [creating a new event](#new-event), a link to the user's [settings](#settings) (denoted by the user's name) and a link to log out.

In addition the navigation bar contains a search bar for searching for users and boats.

## Logging in

When opening the app for the first time a login form is presented. One can login ith the test user (username: test, password: salasana) or with any other created user by typing in username and password into their respective fields an clicking on the login button.

## Signing up

A new user can be created via the sign up link in the right corner of the menu bar. The use has to enter a unique username, a password two times and an email. At the moment any string is accepted as an email. The passwords have to match in order to create a new user. When a new user is created the user is redireted to the login view and the user is able to login with the new credentials.

## Creating a new boat

Users can create a new boat by first accessing the settings page via clicking their own username on the right side of the navbar. On the settings page there is a link to ./newboat which opens a short interface for creating a new boat. After creating a boat the user is automatically navigated to the newly created boat page.

## Main page

When logged in the user is presented with the main view. which consists of a [navigation bar](#navigation-bar), a list of upcoming events and a list of previous logs. The user can toggle which events and log entries they want to see by toggling the different buttons presented above the log entries. User's can join/unjoin events. If the user is the creator of an upcoming event they can edit the event by clicking on the edit button in the bottom right corner of the event card next to the join/unjoin button.

## Boat page

Boat pages have a slightly different look depending on the user's relationship to the boat (no relationship, crewmember, owner). All users can see the boat's image, name logs, and events. The boat's log can be toggled by the two buttons on top of the log to only show sails and/or maintenances.

### Following a boat

Users that are not boat owners or crew members can start following a boat in order to see the boats events and logs on the main page. They can in addition apply to be crew members, after which a boat owner has to accept the application.

### Settings

Boat owners can access the boat settings by pressing the edit button. Via the settings it is possible add other owners to the boat and delete the boat.

### Events

All upcoming and past events of the boat are displayed On the right side on the boat page. Past events can be deleted by the creator of the event. When deleting an event, it is possible to create a log entry.

### Todos

On the right side a list of todos is displayed. Todos are displayed to crew members and boat owners and can be added and checked by boat owners and crew members. When checking a todo as done, it is possible to create a log entry associated to it.

## New log entry

n.b The user has to have a boat in order to create a log entry.

On the ./logger page the user is presented with an interactive map which shows the user's location (if the user has accepted to share location). Below the map there are two buttons: start logging and create a new event without logging.

When the start logging button is clicked the app begins to track the location of the user. Tracking can be paused by clicking the pause button, and again continued by clicking the continue button. At the moment the tracking only displays the current location of the user but does not save it anywhere. The user can create a log entry by then clicking the submit button.

The form to create a new log entry contains different fields depending on the type of log entry (sail or maintenance).

## New event

n.b The user has to have a boat in order to create an event

New events can be created by first clicking the new event button on the navbar. The user has to select a boat, event type (sail or maintenance), starting time, location and description. After the event is created, it is displayed on the main page and on the boat's own page. After creation events can be edited or deleted by the creator of the event. When the starting time of the event has passed, it is no longer displayed on the upcoming events part, instead it is displayed on the past events section of the boat page.

## User page

Each user has their own page which can be accessed by searching for the user via the searchbar. Users can send friend requests to other users. Friend requests have to be accepted via [settings](#settings-1)

## Settings

The settings page can be accessed by clicking on the username on the right side of the navigation bar. On the settings page the user can change their passowrd and email and create a new boat.

In addition all of the user's friends are displayed, it is possible to remove friends. Also all of the friend requests are displayed on the settings page, the user can either accept or decline pending friend requests.
