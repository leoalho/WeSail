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
    username?: string | undefined,
    passwordHash?: string | undefined,
    email?: string | undefined,
    friend?: mongoose.Types.ObjectId | undefined,
    friendRequest?: mongoose.Types.ObjectId | undefined,
    friendRequestsPending?: mongoose.Types.ObjectId | undefined,
    status?: string | undefined,
    boatsFollowing?: mongoose.Types.ObjectId | undefined
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
    name?: string | undefined,
    crewRequest?: mongoose.Types.ObjectId | undefined,
    crew?: mongoose.Types.ObjectId | undefined,
    follower?: mongoose.Types.ObjectId | undefined
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