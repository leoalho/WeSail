import mongoose from "mongoose"

export type UserFields = {
    username: unknown,
    password: unknown,
    email: unknown
}

export type NewUserEntry = {
    username: string,
    passwordHash: string,
    email: string
}

export type UpdateUser = {
    username?: string,
    passwordHash?: string,
    email?: string,
    friend?: mongoose.Types.ObjectId,
    friendRequest?: mongoose.Types.ObjectId,
    friendRequestsPending?: mongoose.Types.ObjectId,
    status?: string,
    boatsFollowing?: mongoose.Types.ObjectId,
    event?: mongoose.Types.ObjectId
}

export type BoatFields = {
    name: unknown,
    registrationNumber?:  unknown,
    LYS?: unknown,
    homePort?: unknown,
    draught?: unknown,
    owners?: unknown,
    crew?: unknown,
    crewRequests?: unknown,
    followers?: unknown
}

export type NewBoatEntry = {
    name: string,
    registrationNumber?:  string,
    LYS?: number,
    homePort?: string,
    draught?: number,
    owners: mongoose.Types.ObjectId[],
    crew?: mongoose.Types.ObjectId[],
    crewRequests?: mongoose.Types.ObjectId[],
    followers?: mongoose.Types.ObjectId[]
}

export type UpdateBoat = {
    name?: string,
    crewRequest?: mongoose.Types.ObjectId,
    crew?: mongoose.Types.ObjectId,
    follower?: mongoose.Types.ObjectId
}

export type EventFields = {
  boat: unknown,
  date: unknown,
  time: unknown,
  location: unknown,
  description: unknown
}

export type NewEventEntry = {
  boat: mongoose.Types.ObjectId,
  date: Date,
  location: string,
  description: string,
  creator: mongoose.Types.ObjectId
}

export type UpdateEvent = {
  participant?: mongoose.Types.ObjectId
}

export type LogFields = {
    boat: unknown,
    creator?: unknown,
    participants?: unknown,
    description: unknown,
    weather?: unknown,
    distance?: unknown,
    distanceSailed?: unknown,
    startTime: unknown,
    endTime: unknown,
    start: unknown,
    end: unknown
}

export type NewLogEntry = {
    boat: mongoose.Types.ObjectId,
    creator: mongoose.Types.ObjectId,
    participants?: mongoose.Types.ObjectId[],
    description: string,
    weather?: string,
    distance: number,
    distanceSailed: number,
    startTime: Date,
    endTime: Date,
    start: string,
    end: string
}