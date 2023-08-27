/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEvents } from "../../services/events";
import { Event, RootState } from "../../types";
import Card from "./Card";

const SideNav = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const currentUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getEvents()
      .then((newEvents) => {
        setEvents(newEvents);
      })
      .catch((e) => console.log(e));
  }, [currentUser]);

  return (
    <div id="sideNav">
      <div className="100%">Upcoming events:</div>
      {events.length === 0 && (
        <center style={{ marginTop: "10px", width: "300px" }}>
          No upcoming events
        </center>
      )}
      {events.map((card) => (
        <Card key={card.id} event={card} setEvents={setEvents} />
      ))}
    </div>
  );
};

export default SideNav;
