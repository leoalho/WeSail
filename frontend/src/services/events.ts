/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from "axios";
import { Event, Patch } from "../types";
const baseUrl = "/api/events";

export const getEvents = async (): Promise<Event[]> => {
  const events = await axios.get(`${baseUrl}/upcoming`);
  return events.data;
};

export const getBoatEvents = async (id: string): Promise<Event[]> => {
  const events = await axios.get(`${baseUrl}/boats/${id}`);
  return events.data;
};

export const getPastBoatEvents = async (id: string): Promise<Event[]> => {
  const events = await axios.get(`${baseUrl}/boats/${id}/past`);
  return events.data;
};

interface NewEvent {
  boat: string;
  date: string;
  time: string;
  location: string;
  description: string;
  eventType: string;
}

export const newEvent = async (event: NewEvent): Promise<Event> => {
  const newevent = await axios.post(baseUrl, event);
  return newevent.data;
};

export const updateEvent = async (
  id: string,
  patch: Patch[]
): Promise<Event> => {
  const updateEvent = await axios.patch(`${baseUrl}/${id}`, { patch: patch });
  return updateEvent.data;
};

export const deleteEvent = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`);
};
