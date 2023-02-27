## FRONTEND: 
- Add notifications
- Empty form fields when creating a new log
- Refactor single boat page into several components, right now it is quite bloated
- Make a edit page for boatowners for editing privacy settings
- Add event's startTime to new log when creating a new log

## BACKEND: 
- Add Error middleware
- Combine date and time as one object for events
- At this moment any user can edit any other user's data
- Check if a user is boat owner or crewmember for adding todos
- It is possible to create events that are upcoming in the past

## BOTH
- Start using UTC time, at the moment at least some date objects are in useräs local time