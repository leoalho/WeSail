/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import toast from "react-hot-toast";

import { Log, RootState } from "../../types";
import { deleteSingleLog, getSingleLog } from "../../services/logs";
import SpeedSvg from "./speedSvg";
import { getMaxSpeed, createPointstring, getCenterPoint } from "./utils";

const SingleLog = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [log, setLog] = useState<Log | null>(null); //log.route == [lat,lon,ele,time]
  const [lineString, setLineString] = useState<[number, number][]>([]);
  const [centerLongitude, setCenterLongitude] = useState(0);
  const [centerLatitude, setCenterLatitude] = useState(0);
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLon, setMarkerLon] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [points, setPoints] = useState("");
  const [zoom, setZoom] = useState(11);

  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (log) {
      setPoints(createPointstring(log.route, width));
    }
  }, [width]);

  useEffect(() => {
    if (id) {
      getSingleLog(id)
        .then((log) => {
          setLog(log);
          const newLineString: [number, number][] = [];
          log.route.forEach((point) =>
            newLineString.push([point[0], point[1]])
          );
          const centerCoord = getCenterPoint(log.route, 400, 600);
          setCenterLatitude(centerCoord.lat);
          setCenterLongitude(centerCoord.lon);
          setZoom(centerCoord.zoom);
          setLineString(newLineString);
          setMaxSpeed(getMaxSpeed(log.route));
          setPoints(createPointstring(log.route, width));
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  if (!id) {
    return <>Wrong path</>;
  }

  if (!log) {
    return <>Loading...</>;
  }

  const tryDelete = async () => {
    if (confirm("Are you sure you want to delete the log entry?")) {
      await deleteSingleLog(log.id);
      toast.success("Deleted log entry");
      navigate("/");
    }
  };

  return (
    <div className="main">
      <div className="logger">
        {log.logType === "sail" && log.route.length > 0 && (
          <>
            <MapContainer
              center={[centerLatitude, centerLongitude]}
              zoom={zoom}
              scrollWheelZoom={false}
              style={{ width: "600px", height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={lineString} />
              <Marker position={[markerLat, markerLon]} />
            </MapContainer>
            <div style={{ background: "white", padding: "10px", width: "40%" }}>
              {log.boat.name}
              <br />
              {log.description}
              <br />
              <button onClick={() => navigate(-1)}>Back</button>
              {user.id === log.creator.id && (
                <button style={{ marginLeft: "10px" }} onClick={tryDelete}>
                  Delete log
                </button>
              )}
            </div>
            <div style={{ background: "white" }}>
              <SpeedSvg
                width={width * 0.7}
                route={log.route}
                maxSpeed={maxSpeed}
                points={points}
                setMarkerLat={setMarkerLat}
                setMarkerLon={setMarkerLon}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleLog;
