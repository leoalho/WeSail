import { UserFields, NewUserEntry, BoatFields, NewBoatEntry, NewEventEntry, EventFields } from "../types"
import mongoose, { isValidObjectId} from "mongoose"
import bcrypt from 'bcrypt'

import config from './config'

export const toNewUser = (entry: UserFields) => {
    const password = parseString(entry.password)
    const salt = bcrypt.genSaltSync(config.SALTROUNDS);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newEntry: NewUserEntry = {
        username: parseString(entry.username),
        passwordHash: passwordHash,
        email: parseString(entry.email)
    }
    return newEntry
}

export const toNewBoat = (entry: BoatFields, owner: (string | undefined)) => {

  const newEntry: NewBoatEntry = {
    name: parseString(entry.name),
    owners: [parseObjectId(owner)]
    //owners: parseArrayOfObjectIds(entry.owners)
  }
  return newEntry
}

export const toNewEvent = (entry: EventFields, creator: (string | undefined)) => {
  const newEntry: NewEventEntry = {
    boat: parseObjectId(entry.boat),
    date: parseDate(entry.date),
    creator: parseObjectId(creator),
    time: parseString(entry.time),
    location: parseString(entry.location),
    description: parseString(entry.description)
  }
  return newEntry
}

export const parseDate = (date: unknown): Date => {
  if (!date || !isString(date)){
    throw new Error('missing or incorrect date value')
  }
  try {
    const newDate = new Date(date)
    return newDate
  } catch {
    throw new Error('Incorrect date value');
  }
}

export const parseString = (name: unknown): string => {
    if (!name || !isString(name)){
        throw new Error('Incorrect or missing value');
    }
    return name;
};

export const parseObjectId = (name: unknown): mongoose.Types.ObjectId => {
    if (!name || !isObjectId(name)){
        throw new Error('Incorrect or missing value');
    }

    return name;
}

/*
export const parseArrayOfObjectIds = (name: unknown): mongoose.Types.ObjectId[] => {
  if (!name || !isArrayOfObjectIds(name)){
      throw new Error('Incorrect or missing value');
  }

  return name;
}
*/

const isObjectId = (id: unknown): id is mongoose.Types.ObjectId => {
    return isValidObjectId(id)
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

/*
function isArrayOfObjectIds(v: unknown): v is mongoose.Types.ObjectId[] {
  return Array.isArray(v) && v.every((e) => isValidObjectId(e));
}
*/