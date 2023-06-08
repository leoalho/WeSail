/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from "axios";
import { Log } from "../types";

const baseUrl = "/api/logs";

export const getLogs = async (): Promise<Log[]> => {
  const logs = await axios.get(`${baseUrl}/main`);
  return logs.data;
};

export const getBoatLogs = async (id: string): Promise<Log[]> => {
  const logs = await axios.get(`${baseUrl}/boats/${id}`);
  return logs.data;
};

export const getUserLogs = async (id: string): Promise<Log[]> => {
  const logs = await axios.get(`${baseUrl}/users/${id}`);
  return logs.data;
};

interface NewLog {
  boat: string;
  participants?: string[];
  description: string;
  weather?: string;
  distance?: string;
  distanceSailed?: string;
  startTime: string;
  endTime: string;
  start: string;
  end?: string;
  logType: string;
  route?: number[][];
}

export const newLog = async (log: NewLog) => {
  console.log(log);
  const newLog = await axios.post(baseUrl, log);
  return newLog;
};
