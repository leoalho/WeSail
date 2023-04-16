/* eslint-disable @typescript-eslint/no-misused-promises */

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { deleteEvent, getPastBoatEvents } from "../../services/events";
import { Event, RootState } from "../../types";
import { Participants } from "../Home/Card";

interface Props {
  event: Event;
  boatId: string;
  setPastEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const PastEventCard = ({ event, boatId, setPastEvents }: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const date = new Date(event.date);

  const tryDelete = async () => {
    if (confirm("Are you sure you want to delete the event?")) {
      await deleteEvent(event.id);
      const newEvents = await getPastBoatEvents(boatId);
      setPastEvents(newEvents);
      toast.success("Deleted event");
    }
  };

  const createLog = async () => {
    await deleteEvent(event.id);
    navigate("/newLog", {
      state: {
        boat: boatId,
        participants: event.participants.map((participant) => {
          return { value: participant.id, label: participant.username };
        }),
        description: event.description,
        type: event.eventType,
        location: event.location,
      },
    });
  };

  return (
    <div className="eventCard">
      <div>
        @{event.location} with{" "}
        <Participants participants={event.participants} />
      </div>
      {date.toLocaleDateString()}{" "}
      {(date.getHours() < 10 ? "0" : "") + date.getHours()}:
      {(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}
      <br />
      <div>{event.description}</div>
      {user.id === event.creator && (
        <div>
          <button onClick={createLog} style={{ marginRight: "5px" }}>
            Create log from event
          </button>
          <button onClick={tryDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PastEventCard;
