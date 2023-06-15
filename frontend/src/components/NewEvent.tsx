/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { newEvent } from "../services/events";
import { RootState } from "../types";

const NewEvent = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [boat, setBoat] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("sail");

  useEffect(() => {
    if (user.boats.length > 0) {
      setBoat(user.boats[0].id);
    }
  }, []);

  const style = {
    backgroundColor: "white",
    padding: "5px",
    flex: "0 0",
  };

  const createEvent = async () => {
    try {
      await newEvent({
        boat: boat,
        date: new Date(`${date}T${time}`).toISOString(),
        location: location,
        description: description,
        eventType: eventType,
      });
      navigate("/");
      toast.success("created new event");
    } catch {
      toast.error("error creating new event");
    }
  };

  return (
    <div className="main">
      <div>
        <div style={style}>
          <select
            value={eventType}
            onChange={({ target }) => setEventType(target.value)}
          >
            <option value="sail">Sail</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select value={boat} onChange={({ target }) => setBoat(target.value)}>
            {user.boats.map((boat) => (
              <option key={boat.id as React.Key} value={boat.id}>
                {boat.name}
              </option>
            ))}
          </select>
          <br />
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type="date"
            id="start"
            name="trip-start"
          ></input>
          <input
            value={time}
            onChange={({ target }) => setTime(target.value)}
            type="time"
            id="start-time"
            name="start-time"
          ></input>
          <br />
          Location:{" "}
          <input
            value={location}
            onChange={({ target }) => setLocation(target.value)}
          ></input>
          <br />
          Description:{" "}
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></input>
          <br />
          <button onClick={createEvent}>Create event</button>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
