/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Event, Patch, RootState } from "../../types";
import { updateEvents } from "../../reducers/userReducer";
import { updateUser } from "../../services/users";
import { deleteEvent, getEvents, updateEvent } from "../../services/events";
import { Participants } from "../Home/Card";

interface Props {
  event: Event;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const Card = ({ event, setEvents }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [joining, setJoining] = useState(false);
  const [edit, setEdit] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const date = new Date(event.date);

  useEffect(() => {
    setJoining(false);
    user.events.forEach((userEvent) => {
      if (userEvent === event.id) {
        setJoining(true);
      }
    });
  }, [user]);

  const joinEvent = async () => {
    const newUser = await updateUser(user.id, {
      op: "add",
      path: "/events",
      value: event.id,
    });
    dispatch(updateEvents(newUser.events));
  };

  const unjoinEvent = async () => {
    const newUser = await updateUser(user.id, {
      op: "remove",
      path: "/events",
      value: event.id,
    });
    dispatch(updateEvents(newUser.events));
  };

  const getDate = () => {
    const days = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
    const months = `${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}`;
    return `${date.getFullYear()}-${months}-${days}`;
  };

  const getTime = () => {
    return `${date.getHours()}:${date.getMinutes()}${
      date.getMinutes() < 10 ? "0" : ""
    }`;
  };

  const updatedEvent = async () => {
    const patches: Patch[] = [];
    if (startTime && startDate) {
      patches.push({
        op: "replace",
        path: "/date",
        value: `${startDate}T${startTime}`,
      });
    }
    if (startTime && !startDate) {
      patches.push({
        op: "replace",
        path: "/date",
        value: `${getDate()}T${startTime}`,
      });
    }
    if (!startTime && startDate) {
      patches.push({
        op: "replace",
        path: "/date",
        value: `${startDate}T${getTime()}`,
      });
    }
    if (description) {
      patches.push({ op: "replace", path: "/description", value: description });
    }
    if (location) {
      patches.push({ op: "replace", path: "/location", value: location });
    }
    await updateEvent(event.id, patches);
    const events = await getEvents();
    setEvents(events);
    setEdit(false);
    setStartTime("");
    setStartDate("");
    setDescription("");
    setLocation("");
    toast.success("Updated event");
  };

  const deleteEventLocal = async () => {
    await deleteEvent(event.id);
    const events = await getEvents();
    setEvents(events);
    toast.success("Deleted event");
  };

  return (
    <div className="eventCard">
      {edit ? (
        <>
          <div>
            <b>
              <Link to={`/boats/${event.boat.id}`}>{event.boat.name}</Link>
            </b>
            <br />
            Location:{" "}
            <input
              defaultValue={event.location}
              onChange={({ target }) => setLocation(target.value)}
            ></input>
          </div>
          Start time:{" "}
          <input
            type="date"
            defaultValue={getDate()}
            onChange={({ target }) => setStartDate(target.value)}
          />
          <input
            type="time"
            defaultValue={getTime()}
            onChange={({ target }) => setStartTime(target.value)}
          />
          <br />
          <div>
            Description:{" "}
            <input
              defaultValue={event.description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <button
              className="button"
              style={{ marginRight: "5px" }}
              onClick={deleteEventLocal}
            >
              Delete event
            </button>
            <button
              className="button"
              style={{ marginRight: "5px" }}
              onClick={updatedEvent}
            >
              Save
            </button>
            <button className="button" onClick={() => setEdit(!edit)}>
              cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <b>
              <Link to={`/boats/${event.boat.id}`}>{event.boat.name}</Link>
            </b>{" "}
            @{event.location} <Participants participants={event.participants} />
          </div>
          {date.toLocaleDateString()}{" "}
          {(date.getHours() < 10 ? "0" : "") + date.getHours()}:
          {(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}
          <br />
          <div>{event.description}</div>
          <div style={{ display: "flex", justifyContent: "right" }}>
            {joining ? (
              <button
                className="button"
                style={{ borderRadius: "5px", marginRight: "5px" }}
                onClick={() => unjoinEvent()}
              >
                Unjoin
              </button>
            ) : (
              <button
                className="button"
                style={{ borderRadius: "5px", marginRight: "5px" }}
                onClick={() => joinEvent()}
              >
                Join
              </button>
            )}
            {user.id === event.creator && (
              <button className="button" onClick={() => setEdit(!edit)}>
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
