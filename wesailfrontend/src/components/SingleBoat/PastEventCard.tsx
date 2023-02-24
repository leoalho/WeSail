/* eslint-disable @typescript-eslint/no-misused-promises */
import { deleteEvent } from "../../services/events"
import { Event } from "../../types"
import { Participants } from "../Home/Card"

interface Props {
    event: Event
  }

const PastEventCard = ({event}: Props) => {
    const date = new Date(event.date)

    return (
        <div className="eventCard">
            <div>@{event.location} with <Participants participants={event.participants}/></div>
            {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br/>
            <div>{event.description}</div>
            <div><button className="button">Create log from event</button><button className="button" onClick={() => deleteEvent(event.id)}>Delete</button></div>
        </div>
    )
}

export default PastEventCard