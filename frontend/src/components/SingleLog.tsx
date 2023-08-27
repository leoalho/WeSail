/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import toast from "react-hot-toast";
import { Log, RootState } from "../types";
import { deleteSingleLog, getSingleLog } from "../services/logs";
import { getDistance } from "geolib";

const create_intervals = (trackpoints: number[][]) => {
  const linestring = [];
  linestring.push([
    0,
    0,
    0,
    trackpoints[0][3] ? new Date(trackpoints[0][3]).getTime() : 0,
    trackpoints[0][0],
    trackpoints[0][1],
  ]);
  for (let i = 1; i < trackpoints.length; i++) {
    const deltaDistance = getDistance(
      { latitude: trackpoints[i][0], longitude: trackpoints[i][1] },
      { latitude: trackpoints[i - 1][0], longitude: trackpoints[i - 1][1] },
      0.01
    );
    const deltaTime =
      (new Date(trackpoints[i][3]).getTime() -
        new Date(trackpoints[i - 1][3]).getTime()) /
      1000;
    linestring.push([
      deltaDistance,
      deltaTime,
      (1.94384 * deltaDistance) / deltaTime,
      trackpoints[i][3] ? new Date(trackpoints[i][3]).getTime() : 0,
      trackpoints[i][0],
      trackpoints[i][1],
    ]);
  }
  return linestring;
};

const luo_aikakeskiarvot = (lineString: number[][], n: number) => {
  const keskiarvot = [];
  let i = 0;
  while (i < lineString.length - 1) {
    //let nopeussumma = lineString[i][2];
    let matkasumma = lineString[i][0];
    let aikasumma1 = lineString[i][1];
    let aikasumma2 = lineString[i][3];
    let j = 1;
    while (aikasumma1 < n && j < lineString.length) {
      matkasumma += lineString[i + j][0];
      aikasumma1 += lineString[i + j][1];
      //nopeussumma += lineString[i + j][2];
      aikasumma2 += lineString[i + j][3];
      j++;
      //console.log(aikasumma1);
    }
    keskiarvot.push([
      matkasumma,
      aikasumma1,
      aikasumma1 > 0 ? (1.94384 * matkasumma) / aikasumma1 : 0,
      Math.round(aikasumma2 / j),
      j,
    ]);
    i += j;
  }
  return keskiarvot;
};

const create_svg_lines = (
  maxInt: number,
  height: number,
  width: number,
  svgContainer: SVGSVGElement
) => {
  let svg_path_string = "";

  for (let i = 0; i < maxInt + 1; i++) {
    const liney = 220 - i * Math.round(height / maxInt);
    svg_path_string += `M20 ${liney} L${width} ${liney} `;
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    text.textContent = `${i}`;
    text.setAttribute("x", "4");
    text.setAttribute("y", `${liney}`);

    text.setAttribute("fill", "black");
    text.setAttribute("font-size", "16px");
    svgContainer.appendChild(text);
  }
  /*
  const lines = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lines.setAttribute("stroke-width", "1");
  lines.setAttribute("stroke", "#000");
  lines.setAttribute("d", svg_path_string.trim());
  svgContainer.appendChild(lines);
  */
  return svg_path_string.trim();
};

const findNearest = (lineString: number[][], time: number): number[] => {
  let lat;
  let lon;
  for (let i = 1; i < lineString.length; i++) {
    if (lineString[i][3] > time) {
      lat = lineString[i][0];
      lon = lineString[i][1];
      if (
        Math.abs(time - lineString[i][3]) <
        Math.abs(time - lineString[i - 1][3])
      ) {
        lat = lineString[i - 1][0];
        lon = lineString[i - 1][1];
      }
      const coord = [lat, lon];
      return coord;
    }
  }
  return [];
};

const SingleLog = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [log, setLog] = useState<Log | null>(null); //log.route == [lat,lon,ele,time]
  const [lineString, setLineString] = useState<[number, number][]>([]);
  const [centerLongitude, setCenterLongitude] = useState(0);
  const [centerLatitude, setCenterLatitude] = useState(0);
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(240);
  const [pathD, setPathD] = useState("");
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLon, setMarkerLon] = useState(0);
  const myRef = useRef<SVGSVGElement>(null);
  const [points, setPoints] = useState("");
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
      const aikaKa = luo_aikakeskiarvot(create_intervals(log.route), 15);
      let pointsString = "";
      const kokoAika = aikaKa[aikaKa.length - 1][3] - aikaKa[0][3];
      const max = Math.max(...aikaKa.map((keskiarvo) => keskiarvo[2]));
      if (kokoAika > 0) {
        aikaKa.forEach((point) => {
          const coordx =
            20 + (width * 0.7 * (point[3] - aikaKa[0][3])) / kokoAika;
          const coordy = 20 + (200 * (max - point[2])) / max;
          pointsString += coordx + "," + coordy + " ";
        });
      }
      setPoints(pointsString.trim());
    }
  }, [width]);

  useEffect(() => {
    myRef.current &&
      myRef.current.addEventListener("mousemove", (e) => svgMouseEvent(e));
  }, [points]);

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
          const aikaKa = luo_aikakeskiarvot(create_intervals(log.route), 15);
          let pointsString = "";
          const kokoAika = aikaKa[aikaKa.length - 1][3] - aikaKa[0][3];
          const max = Math.max(...aikaKa.map((keskiarvo) => keskiarvo[2]));
          if (kokoAika > 0) {
            aikaKa.forEach((point) => {
              const coordx =
                20 + (width * 0.7 * (point[3] - aikaKa[0][3])) / kokoAika;
              const coordy = 20 + (200 * (max - point[2])) / max;
              pointsString += coordx + "," + coordy + " ";
            });
          }
          setPoints(pointsString.trim());
          myRef.current &&
            setPathD(create_svg_lines(max, 240, width, myRef.current));
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  const getClosestPoint = (x: number) => {
    const newPoints = points.split(" ");
    let closestDistance = Infinity;
    let closestPoint = "";

    for (let i = 0; i < newPoints.length; i++) {
      const coordinates = newPoints[i].split(",");
      const pointX = parseInt(coordinates[0]);
      const distance = Math.abs(pointX - x);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPoint = newPoints[i];
      }
    }
    return closestPoint;
  };

  const svgMouseEvent = (event: MouseEvent) => {
    if (!log) {
      return;
    }

    const wholeTime = log.route[log.route.length - 1][3] - log.route[0][3];
    const startTime = log.route[0][3];

    if (myRef.current) {
      const mouseX = event.clientX - myRef.current.getBoundingClientRect().left;
      const closestPoint = getClosestPoint(mouseX);
      const coordinates = closestPoint.split(",");
      const x = coordinates[0];
      const y = coordinates[1];

      const closestTime = Math.round(
        ((parseInt(x) - 20) * wholeTime) / (width * 0.7) + startTime
      );
      const closestCoord = findNearest(log.route, closestTime);
      console.log(closestCoord);
      setMarkerLat(closestCoord[0]);
      setMarkerLon(closestCoord[1]);

      try {
        setCx(parseInt(x));
        setCy(parseInt(y));
      } catch (e) {
        console.log(e);
      }
    }
  };

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
              zoom={11}
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
              <svg
                ref={myRef}
                width={width * 0.7}
                height="240"
                style={{ background: "white" }}
              >
                <path
                  d={pathD}
                  style={{ stroke: "#000", strokeWidth: "1" }}
                ></path>
                <polyline
                  points={points}
                  style={{ fill: "none", stroke: "#3388ff", strokeWidth: "2" }}
                />
                <circle cx={cx} cy={cy} r={10} fill="red" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleLog;
