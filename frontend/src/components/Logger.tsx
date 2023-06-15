import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";

const errorMessage = (e: GeolocationPositionError) => {
  console.log(e);
};

const Logger = () => {
  const [position, setPosition] = useState({
    longitude: 24.9,
    latitude: 60.19,
  });
  const [updated, setUpdated] = useState(0);
  const [speed, setSpeed] = useState<number | null>(0);
  const [heading, setHeading] = useState<number | null>(0);
  const [logging, setLogging] = useState(false);
  const [logActive, setLogActive] = useState(false);
  const [route, setRoute] = useState<[number, number, number, number][]>([]);
  const [lineString, setLineString] = useState<[number, number][]>([]);
  const [geoId, setGeoId] = useState(0);

  const initSuccess = (pos: GeolocationPosition) => {
    setPosition({
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(initSuccess, errorMessage);
  }, []);

  useEffect(() => {
    setRoute([...route, [position.latitude, position.longitude, 0, updated]]);
    setLineString([...lineString, [position.latitude, position.longitude]]);
  }, [position]);

  interface myComponent {
    logging: boolean;
    setLogging: React.Dispatch<React.SetStateAction<boolean>>;
  }

  function MyComponent({ logging }: myComponent) {
    const [first, setFirst] = useState(true);
    const map = useMap();
    if (position.latitude != 60.19 && position.longitude != 24.9 && first) {
      map.flyTo([position.latitude, position.longitude]);
      setFirst(false);
    }
    if (logging) {
      map.flyTo([position.latitude, position.longitude]);
    }
    return null;
  }

  const success = (pos: GeolocationPosition) => {
    setUpdated(pos.timestamp);
    setSpeed(pos.coords.speed);
    setHeading(pos.coords.heading);
    setPosition({
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude,
    });
  };

  const startLogging = () => {
    setLogActive(true);
    setLogging(true);
    setGeoId(navigator.geolocation.watchPosition(success, errorMessage));
  };

  const pauseLogging = () => {
    setLogging(false);
    navigator.geolocation.clearWatch(geoId);
  };

  const continueLogging = () => {
    setLogging(true);
    setGeoId(navigator.geolocation.watchPosition(success, errorMessage));
  };

  return (
    <div className="main">
      <div className="logger">
        <MapContainer
          center={[position.latitude, position.longitude]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <MyComponent logging={logging} setLogging={setLogging} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[position.latitude, position.longitude]}>
            <Popup>This is you.</Popup>
          </Marker>
          <Polyline positions={lineString.slice(1)} />
        </MapContainer>
        <div>
          {logActive ? (
            <>
              <button
                onClick={() => (logging ? pauseLogging() : continueLogging())}
              >
                {logging ? <>Pause</> : <>Continue</>}
              </button>
              <br />
              latitude: {position.latitude}, longitude: {position.longitude}{" "}
              {speed && <>, speed {speed}</>} {heading && <>, {heading}</>}{" "}
              <br />
              last updated:
              {`${new Date(updated).getHours()}:${new Date(
                updated
              ).getMinutes()}:${new Date(updated).getSeconds()}`}
              <br />
              {logActive && (
                <Link
                  to="/newLog"
                  state={{
                    route: route,
                    lineString: lineString,
                  }}
                >
                  Submit
                </Link>
              )}
            </>
          ) : (
            <>
              <button onClick={startLogging}>Start</button> or{" "}
              <Link to="/newLog">Create log entry without location</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logger;
