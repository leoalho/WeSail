import { UserFields, NewUserEntry,
        BoatFields, NewBoatEntry,
        EventFields, NewEventEntry,
        LogFields, NewLogEntry } from "../types"
import mongoose, { isValidObjectId} from "mongoose"
import bcrypt from 'bcrypt'

import config from './config'

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(config.SALTROUNDS)
  const passwordHash = bcrypt.hashSync(password, salt)
  return passwordHash
}

export const toNewUser = (entry: UserFields) => {
    const password = parseString(entry.password)
    const passwordHash = hashPassword(password)
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
    date: parseDateTime(entry.date, entry.time),
    creator: parseObjectId(creator),
    location: parseString(entry.location),
    description: parseString(entry.description)
  }
  return newEntry
}

export const toNewLog = (entry: LogFields, creator: (string | undefined)) => {
    const newLog: NewLogEntry = {
        boat: parseObjectId(entry.boat),
        creator: parseObjectId(creator),
        description: parseString(entry.description),
        startTime: parseDate(entry.startTime),
        endTime: parseDate(entry.endTime),
        start: parseString(entry.start),
        end: parseString(entry.end),
        distance: parseNumber(entry.distance),
        distanceSailed: parseNumber(entry.distanceSailed),
        participants: [parseObjectId(creator)]
    }
    if (entry.weather){
        newLog.weather = parseString(entry.weather)
    }
    return newLog
}

export const parseDateTime = (date: unknown, time:unknown): Date => {
  if (!date || !isString(date)){
    throw new Error('missing or incorrect date value')
  }
  if (!time || !isString(time)){
    throw new Error('missing or incorrect time value')
  }
  try {
    const newDate = new Date(`${date}T${time}`)
    return newDate
  } catch {
    throw new Error('Incorrect date value');
  }
}

export const parseNumber = (name: unknown): number => {
    if (!name || !isString(name)){
        throw new Error('missing or incorrect date value')
    }
    return parseInt(name)
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