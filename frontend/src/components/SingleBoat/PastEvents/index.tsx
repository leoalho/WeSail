import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPastBoatEvents } from "../../../services/events";
import { Event } from "../../../types";
import PastEventCard from "./Card";

interface Props {
  boatId: string;
}

const PastEvents = ({ boatId }: Props) => {
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPastBoatEvents(id)
        .then((newEvents) => setPastEvents(newEvents))
        .catch((e) => console.log(e));
    }
  }, [id]);

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <b>Past events:</b>
      </div>
      {pastEvents.map((card) => (
        <PastEventCard
          key={card.id}
          boatId={boatId}
          setPastEvents={setPastEvents}
          event={card}
        />
      ))}
    </>
  );
};

export default PastEvents;
