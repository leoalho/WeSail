import Log from "../models/log";
import User from "../models/user";
import { NewLogEntry } from "../types";
import { getZoomLevel } from "../utils/utils";
import StaticMaps from "staticmaps";
import path from "path";

export const getLogs = async () => {
  const logs = await Log.find({})
    .populate("boat", { name: 1, profilePicture: 1 })
    .populate("creator", { username: 1 })
    .populate("participants", { username: 1 });
  return logs;
};

export const getSingleLog = async (id: string) => {
  const log = await Log.findById(id)
    .populate("boat", { name: 1, profilePicture: 1 })
    .populate("creator", { username: 1 })
    .populate("participants", { username: 1 });
  return log;
};

export const getMainLogs = async (id: string | undefined) => {
  const user = await User.findById(id);
  if (!user) {
    return;
  }
  const logs = await Log.find({
    $or: [
      { boat: { $in: user.boats } },
      { boat: { $in: user.crewMember } },
      { boat: { $in: user.boatsFollowing } },
      { creator: { $in: user.friends } },
      { creator: { $in: user.friends } },
    ],
  })
    .sort({ endTime: -1 })
    .populate("boat", { name: 1, profilePicture: 1 })
    .populate("creator", { username: 1 })
    .populate("participants", { username: 1 });
  return logs;
};

export const getBoatLogs = async (id: string | undefined) => {
  const logs = await Log.find({ boat: id })
    .sort({ endTime: -1 })
    .populate("boat", { name: 1, profilePicture: 1 })
    .populate("creator", { username: 1 })
    .populate("participants", { username: 1 });
  return logs;
};

export const getUserLogs = async (id: string | undefined) => {
  const logs = await Log.find({ participants: id })
    .sort({ endTime: -1 })
    .populate("boat", { name: 1, profilePicture: 1 })
    .populate("creator", { username: 1 })
    .populate("participants", { username: 1 });
  return logs;
};

type Line = {
  coords: [number, number][];
  color: string;
  width: number;
};

const renderMap = async (fileName: string, coordinates: number[][]) => {
  let maxLat = -91;
  let minLat = 91;
  let maxLon = -181;
  let minLon = 181;

  const line: Line = {
    coords: [],
    color: "#0000FFBB",
    width: 3,
  };
  if (coordinates.length > 0) {
    coordinates.forEach((coordinate) => {
      if (coordinate.length < 3) return;
      if (coordinate[0] > maxLat) maxLat = coordinate[0];
      if (coordinate[0] < minLat) minLat = coordinate[0];
      if (coordinate[1] > maxLon) maxLon = coordinate[1];
      if (coordinate[1] < minLon) minLon = coordinate[1];
      line.coords.push([coordinate[1], coordinate[0]]);
    });
  }

  const deltaLat = Math.abs(maxLat - minLat);
  const deltaLon = Math.abs(maxLon - minLon);
  const meanLat = minLat + 0.5 * deltaLat;
  const meanLon = minLon + 0.5 * deltaLon;

  const options = {
    width: 700,
    height: 350,
  };
  const map = new StaticMaps(options);
  const zoom = getZoomLevel(
    options.width,
    options.height,
    deltaLat,
    deltaLon,
    256
  );

  const center = [meanLon, meanLat];
  map.addLine(line);
  await map.render(center, zoom);
  await map.image.save(
    path.join(__dirname, "..", "..", "images", "log_maps", `${fileName}.png`)
  );
};

export const newLog = async (logEntry: NewLogEntry) => {
  const newLog = new Log(logEntry);
  console.log(newLog);
  await newLog.save();
  if (newLog.route.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await renderMap(newLog.id, newLog.route);
  }
  return newLog;
};
