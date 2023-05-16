/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from "axios";
import { Boat, Patch } from "../types";
const baseUrl = "/api/boats";

interface NewBoat {
  name: string;
}

export const newBoat = async (boat: NewBoat): Promise<Boat> => {
  const newboat = await axios.post(baseUrl, boat);
  return newboat.data;
};

export const getBoat = async (id: string | undefined): Promise<Boat> => {
  const boat = await axios.get(`${baseUrl}/${id}`);
  return boat.data;
};

export const getBoats = async (): Promise<Boat[]> => {
  const boats = await axios.get(baseUrl);
  return boats.data;
};

export const updateBoat = async (id: string, patch: Patch[]): Promise<Boat> => {
  const boat = await axios.patch(`${baseUrl}/${id}`, { patch: patch });
  return boat.data;
};

export const deleteFollower = async (id: string, follower: string) => {
  await axios.delete(`${baseUrl}/${id}/followers/${follower}`);
};

export const deleteBoat = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export const updateProfilePicture = async (form: FormData, id: string) => {
  await axios.post(`${baseUrl}/${id}/profile`, form, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
