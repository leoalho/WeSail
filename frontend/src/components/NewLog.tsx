/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import gpxParser from "gpxparser";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { LocalDateTime } from "@js-joda/core";
import { getBoat, updateBoat } from "../services/boats";
import { newLog } from "../services/logs";
import { RootState, Option, Patch } from "../types";

const NewLog = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const [logType, setLogType] = useState("sail");
  const [boat, setBoat] = useState("");
  const [participants, setParticipants] = useState<Option[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceSailed, setDistanceSailed] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [description, setDescription] = useState("");
  const [weather, setWeather] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [todoOptions, setTodoOptions] = useState<Option[]>([]);
  const [todos, setTodos] = useState<Option[]>([]);
  const [lineString, setLineString] = useState<[number, number][]>([]);
  const [route, setRoute] = useState<[number, number, number, number][]>([]);
  const [preview, setPreview] = useState(false);
  const [meanLat, setMeanLat] = useState(60.19);
  const [meanLon, setMeanLon] = useState(24.9);
  const [deltaLat, setDeltaLat] = useState(1);
  const [deltaLon, setDeltaLon] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setParticipants([{ value: user.id, label: user.username }]);
    if (location.state && location.state.route) {
      getDeltaMeanCoord(location.state.route.slice(1));
      setRoute(location.state.route.slice(1));
      setLineString(location.state.lineString.slice(1));
    } else if (location.state) {
      setBoat(location.state.boat);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setParticipants([...location.state.participants]);
      setLogType(location.state.type);
      if (location.state.description) {
        setDescription(location.state.description);
      }
      if (location.state.location) {
        setStartLocation(location.state.location);
      }
    }
    if (boat) {
      const newOptions: Option[] = [];
      const newTodoOptions: Option[] = [];
      getBoat(boat)
        .then((newBoat) => {
          newBoat.owners.forEach((owner) => {
            newOptions.push({ value: owner.id, label: owner.username });
          });
          newBoat.crew.forEach((crew) => {
            newOptions.push({ value: crew.id, label: crew.username });
          });
          newBoat.todos.forEach((todo) => {
            newTodoOptions.push({ value: todo._id, label: todo.value });
          });
          setOptions(newOptions);
          setTodoOptions(newTodoOptions);
        })
        .catch((e) => console.log(e));
    }
  }, [boat]);

  useEffect(() => {
    if (user.boats.length > 0) {
      setBoat(user.boats[0].id);
    }
  }, []);

  const doneTodos = async () => {
    const todoPatches: Patch[] = [];
    todos.forEach((todo) => {
      todoPatches.push({ op: "remove", path: "/todos", value: todo.value });
    });
    await updateBoat(boat, todoPatches);
  };

  const getDeltaMeanCoord = (route: [number, number][]) => {
    let maxLat = -91;
    let minLat = 91;
    let maxLon = -181;
    let minLon = 181;
    route.forEach((point) => {
      if (point[0] > maxLat) maxLat = point[0];
      if (point[0] < minLat) minLat = point[0];
      if (point[1] > maxLon) maxLon = point[1];
      if (point[1] < minLon) minLon = point[1];
    });
    const deltaLat = Math.abs(maxLat - minLat);
    const deltaLon = Math.abs(maxLon - minLon);
    setDeltaLat(deltaLat);
    setDeltaLon(deltaLon);
    setMeanLat(minLat + 0.5 * deltaLat);
    setMeanLon(minLon + 0.5 * deltaLon);
  };

  const getTileNumber = (
    width: number,
    height: number,
    deltaLat: number,
    deltaLon: number,
    tileSize: number
  ) => {
    if (deltaLat === 0 || deltaLon === 0) {
      return 17;
    }
    const latTile = Math.log2((height * 180) / (tileSize * deltaLat));
    const lonTile = Math.log2((width * 360) / (tileSize * deltaLon));
    return Math.floor(Math.min(latTile, lonTile));
  };

  const gpxToLinestring = (data: string) => {
    let maxLat = -91;
    let minLat = 91;
    let maxLon = -181;
    let minLon = 181;
    const linestring: [number, number][] = [];
    const newRoute: [number, number, number, number][] = [];
    const gpx = new gpxParser();
    gpx.parse(data);
    const gpxStartTime = LocalDateTime.parse(
      gpx.tracks[0].points[0].time.toISOString().slice(0, 16)
    );
    setStartTime(gpxStartTime.toString());
    const gpxEndTime = LocalDateTime.parse(
      gpx.tracks[0].points.slice(-1)[0].time.toISOString().slice(0, 16)
    );
    setEndTime(gpxEndTime.toString());
    const nauticalDistance = (gpx.tracks[0].distance.total / 1852).toFixed(2);
    setDistance(nauticalDistance);
    gpx.tracks[0].points.forEach((point) => {
      newRoute.push([
        point.lat,
        point.lon,
        point.ele ? point.ele : 0,
        new Date(point.time).getTime(),
      ]);
      linestring.push([point.lat, point.lon]);
      if (point.lat > maxLat) maxLat = point.lat;
      if (point.lat < minLat) minLat = point.lat;
      if (point.lon > maxLon) maxLon = point.lon;
      if (point.lon < minLon) minLon = point.lon;
    });
    const deltaLat = Math.abs(maxLat - minLat);
    const deltaLon = Math.abs(maxLon - minLon);
    setDeltaLat(deltaLat);
    setDeltaLon(deltaLon);
    setMeanLat(minLat + 0.5 * deltaLat);
    setMeanLon(minLon + 0.5 * deltaLon);
    setRoute(newRoute);
    return linestring;
  };

  const onChangeGPX = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target && evt.target.result) {
          try {
            const newLineString = gpxToLinestring(evt.target.result as string);
            setLineString(newLineString);
          } catch (error) {
            toast.error("Incorrect file");
          }
        }
      };
      reader.readAsText(files[0]);
    }
  };

  interface myComponent {
    preview: boolean;
  }

  function MyComponent({ preview }: myComponent) {
    const map = useMap();
    if (preview) {
      map.flyTo(
        [meanLat, meanLon],
        getTileNumber(445, 300, deltaLat, deltaLon, 256)
      );
    }
    return null;
  }

  const createEvent = async () => {
    try {
      await newLog({
        boat: boat,
        participants: participants.map((participant) => participant.value),
        description: description,
        weather: weather,
        distance: distance,
        distanceSailed: distanceSailed,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        start: startLocation,
        end: endLocation,
        logType: logType,
        route: route,
      });
      await doneTodos();
      toast.success("Created new log entry");
      navigate("/");
    } catch (e) {
      toast.error("Error creating new log");
    }
  };

  const style = {
    backgroundColor: "white",
    padding: "10px",
  };

  return (
    <div className="main" style={{ overflowY: "scroll" }}>
      <div>
        <div style={{ width: width > 650 ? "600px" : "100%", ...style }}>
          <h2>Create a new log entry</h2>
          Logtype and vessel: <br />
          <select
            value={logType}
            onChange={({ target }) => setLogType(target.value)}
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
          <br />
          With:{" "}
          <Select
            isMulti
            name="participants"
            options={options}
            value={participants}
            onChange={(option) => setParticipants([...option])}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <br />
          Start location and time:
          <br />
          <input
            style={{ marginBottom: "10px" }}
            onChange={({ target }) => setStartLocation(target.value)}
          ></input>
          <input
            style={{ marginBottom: "10px" }}
            value={startTime.substring(0, 16)}
            onChange={({ target }) => setStartTime(target.value)}
            type="datetime-local"
            id="start-time"
            name="start-time"
          ></input>
          <br />
          {logType === "sail" ? (
            <>
              End location and time:
              <br />
              <input
                style={{ marginBottom: "10px" }}
                onChange={({ target }) => setEndLocation(target.value)}
              ></input>
            </>
          ) : (
            <>
              End time: <br />
            </>
          )}
          <input
            style={{ marginBottom: "10px" }}
            value={endTime.substring(0, 16)}
            onChange={({ target }) => setEndTime(target.value)}
            type="datetime-local"
            id="end-time"
            name="end-time"
          ></input>
          <br />
          {logType === "sail" && (
            <>
              <input
                placeholder="Distance (nm)"
                value={distance}
                type="number"
                onChange={({ target }) => setDistance(target.value.toString())}
              ></input>
              <input
                placeholder="Distance sailed"
                type="number"
                onChange={({ target }) => setDistanceSailed(target.value)}
              ></input>
              <br />
              Weather: <br />
              <input
                onChange={({ target }) => setWeather(target.value)}
                style={{ width: "200px", marginBottom: "10px" }}
              ></input>
              <br />
            </>
          )}
          Description: <br />
          <textarea
            style={{ width: "200px", marginBottom: "10px" }}
            rows={4}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
          <br />
          <br />
          Todos Done:{" "}
          <Select
            isMulti
            name="todos"
            options={todoOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(option) => setTodos([...option])}
          />
          {logType === "sail" && (
            <>
              <br />
              Select .gpx file:
              <br />
              <input
                type="file"
                name="avatar"
                onChange={(e) => onChangeGPX(e)}
              />
              {route.length > 0 && (
                <button
                  style={{ marginTop: "5px" }}
                  onClick={() => {
                    setPreview(!preview);
                  }}
                >
                  {preview ? <>Close preview</> : <>Preview</>}
                </button>
              )}
              <br />
              {preview && (
                <div style={{ height: "300px" }}>
                  <MapContainer
                    center={[meanLat, meanLon]}
                    zoom={15}
                    scrollWheelZoom={true}
                  >
                    <MyComponent preview={preview} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline positions={lineString} />
                  </MapContainer>
                </div>
              )}
            </>
          )}
          <button style={{ marginTop: "5px" }} onClick={createEvent}>
            Create log entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewLog;
