import { getDistance } from "geolib";

export const findNearest = (lineString: number[][], time: number): number[] => {
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

export const create_svg_lines = (
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
  return svg_path_string.trim();
};

export const getClosestPoint = (points: string, x: number) => {
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

export const create_intervals = (trackpoints: number[][]) => {
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

export const luo_aikakeskiarvot = (lineString: number[][], n: number) => {
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

export const getMaxSpeed = (
  log: [number, number, number, number][]
): number => {
  const aikaKa = luo_aikakeskiarvot(create_intervals(log), 15);
  const max = Math.max(...aikaKa.map((keskiarvo) => keskiarvo[2]));
  return max;
};

export const createPointstring = (
  log: [number, number, number, number][],
  width: number
): string => {
  const aikaKa = luo_aikakeskiarvot(create_intervals(log), 15);
  const max = Math.max(...aikaKa.map((keskiarvo) => keskiarvo[2]));
  let pointsString = "";
  const kokoAika = aikaKa[aikaKa.length - 1][3] - aikaKa[0][3];
  if (kokoAika > 0) {
    aikaKa.forEach((point) => {
      const coordx = 20 + (width * 0.7 * (point[3] - aikaKa[0][3])) / kokoAika;
      const coordy = 20 + (200 * (max - point[2])) / max;
      pointsString += coordx + "," + coordy + " ";
    });
  }

  return pointsString.trim();
};

export const getCenterPoint = (
  route: [number, number, number, number][],
  height: number,
  width: number,
  tileSize = 256
) => {
  let maxLat = -91;
  let minLat = 91;
  let maxLon = -181;
  let minLon = 181;
  const newLineString: [number, number][] = [];
  route.forEach((point) => {
    newLineString.push([point[0], point[1]]);
    if (point[0] > maxLat) maxLat = point[0];
    if (point[0] < minLat) minLat = point[0];
    if (point[1] > maxLon) maxLon = point[1];
    if (point[1] < minLon) minLon = point[1];
  });
  const deltaLat = Math.abs(maxLat - minLat);
  const deltaLon = Math.abs(maxLon - minLon);

  const latTile = Math.log2((height * 180) / (tileSize * deltaLat));
  const lonTile = Math.log2((width * 360) / (tileSize * deltaLon));
  const zoom = Math.floor(Math.min(latTile, lonTile));
  return {
    lat: minLat + 0.5 * deltaLat,
    lon: minLon + 0.5 * deltaLon,
    zoom: zoom,
  };
};
