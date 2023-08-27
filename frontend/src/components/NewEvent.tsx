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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user.boats.length > 0) {
      setBoat(user.boats[0].id);
    }
  }, []);

  const style = {
    backgroundColor: "white",
    padding: "15px",
    flex: "0 0",
  };

  const inputStyle = {
    fontSize: "15px",
    marginBottom: "10px",
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
        <div style={{ width: width > 650 ? "600px" : "100%", ...style }}>
          <h2>New event: </h2>
          Event type and boat:
          <br />
          <select
            style={inputStyle}
            value={eventType}
            onChange={({ target }) => setEventType(target.value)}
          >
            <option value="sail">Sail</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select
            value={boat}
            style={inputStyle}
            onChange={({ target }) => setBoat(target.value)}
          >
            {user.boats.map((boat) => (
              <option key={boat.id as React.Key} value={boat.id}>
                {boat.name}
              </option>
            ))}
          </select>
          <br />
          Start time and date:
          <br />
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type="date"
            id="start"
            name="trip-start"
            style={inputStyle}
          ></input>
          <input
            style={inputStyle}
            value={time}
            onChange={({ target }) => setTime(target.value)}
            type="time"
            id="start-time"
            name="start-time"
          ></input>
          <br />
          Location: <br />
          <input
            style={{ width: "300px", ...inputStyle }}
            value={location}
            onChange={({ target }) => setLocation(target.value)}
          ></input>
          <br />
          Description: <br />
          <textarea
            style={{ margin: "3px", width: "300px", ...inputStyle }}
            value={description}
            rows={4}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
          <br />
          <button onClick={createEvent} style={{ margin: "3px" }}>
            Create event
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
