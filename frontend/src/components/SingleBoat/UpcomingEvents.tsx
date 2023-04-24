import { useEffect, useState } from "react";
import EventCard from "../Sidenav/Card";
import { useParams } from "react-router-dom";
import { getBoatEvents } from "../../services/events";
import { Event } from "../../types";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBoatEvents(id)
        .then((newEvents) => setEvents(newEvents))
        .catch((e) => console.log(e));
    }
  }, [id]);

  return (
    <>
      <div>
        <b>Upcoming events:</b>
      </div>
      {events.length === 0 && (
        <div className="eventCard">No upcoming events</div>
      )}
      {events.map((card) => (
        <EventCard key={card.id} event={card} setEvents={setEvents} />
      ))}
    </>
  );
};

export default UpcomingEvents;
