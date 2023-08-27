import { useEffect, useRef, useState } from "react";
import { getClosestPoint, create_svg_lines, findNearest } from "./utils";

interface Props {
  width: number;
  route: [number, number, number, number][];
  maxSpeed: number;
  points: string;
  setMarkerLat: React.Dispatch<React.SetStateAction<number>>;
  setMarkerLon: React.Dispatch<React.SetStateAction<number>>;
}

const SpeedSvg = ({
  width,
  route,
  maxSpeed,
  points,
  setMarkerLat,
  setMarkerLon,
}: Props) => {
  const myRef = useRef<SVGSVGElement>(null);

  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(240);
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    myRef.current &&
      myRef.current.addEventListener("mousemove", (e) => svgMouseEvent(e));
  }, [points]);

  useEffect(() => {
    myRef.current &&
      setPathD(create_svg_lines(maxSpeed, 240, width, myRef.current));
  }, [width]);

  const svgMouseEvent = (event: MouseEvent) => {
    const wholeTime = route[route.length - 1][3] - route[0][3];
    const startTime = route[0][3];

    if (myRef.current) {
      const mouseX = event.clientX - myRef.current.getBoundingClientRect().left;
      const closestPoint = getClosestPoint(points, mouseX);
      const coordinates = closestPoint.split(",");
      const x = coordinates[0];
      const y = coordinates[1];

      const closestTime = Math.round(
        ((parseInt(x) - 20) * wholeTime) / width + startTime
      );
      const closestCoord = findNearest(route, closestTime);

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

  return (
    <svg ref={myRef} width={width} height="240" style={{ background: "white" }}>
      <path d={pathD} style={{ stroke: "#000", strokeWidth: "1" }}></path>
      <polyline
        points={points}
        style={{ fill: "none", stroke: "#3388ff", strokeWidth: "2" }}
      />
      <circle cx={cx} cy={cy} r={10} fill="red" />
    </svg>
  );
};

export default SpeedSvg;
