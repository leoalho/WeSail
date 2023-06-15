import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { Log } from "../types";
import { getSingleLog } from "../services/logs";

const SingleLog = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [log, setLog] = useState<Log | null>(null);
  const [lineString, setLineString] = useState<[number, number][]>([]);
  const [centerLongitude, setCenterLongitude] = useState(0);
  const [centerLatitude, setCenterLatitude] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      console.log(width);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      getSingleLog(id)
        .then((log) => {
          setLog(log);
          let maxLat = -91;
          let minLat = 91;
          let maxLon = -181;
          let minLon = 181;
          const newLineString: [number, number][] = [];
          log.route.forEach((point) => {
            newLineString.push([point[0], point[1]]);
            if (point[0] > maxLat) maxLat = point[0];
            if (point[0] < minLat) minLat = point[0];
            if (point[1] > maxLon) maxLon = point[1];
            if (point[1] < minLon) minLon = point[1];
          });
          const deltaLat = Math.abs(maxLat - minLat);
          const deltaLon = Math.abs(maxLon - minLon);
          setCenterLatitude(minLat + 0.5 * deltaLat);
          setCenterLongitude(minLon + 0.5 * deltaLon);
          setLineString(newLineString);
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

  return (
    <div className="main">
      <div className="logger">
        {log.logType === "sail" && log.route.length > 0 && (
          <MapContainer
            center={[centerLatitude, centerLongitude]}
            zoom={12}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={lineString} />
          </MapContainer>
        )}
        {log.boat.name}
        <br />
        {log.description}
        <br />
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default SingleLog;
