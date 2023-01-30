import mongoose from "mongoose"

export type UserFields = {username: unknown, password: unknown, email: unknown}

export type NewUserEntry = {username: string, passwordHash: string, email: string}

export type UpdateUser = {
    username?: string | undefined,
    passwordHash?: string | undefined,
    email?: string | undefined,
    friend?: mongoose.Types.ObjectId | undefined,
    friendRequest?: mongoose.Types.ObjectId | undefined,
    status?: string | undefined,
    boatsFollowing?: mongoose.Types.ObjectId | undefined
}

export type UpdateBoat = {
  name?: string | undefined,
  crewRequest?: mongoose.Types.ObjectId | undefined,
  crew?: mongoose.Types.ObjectId | undefined,
  follower?: mongoose.Types.ObjectId | undefined
}

export type BoatFields = {
    name: unknown,
    registrationNumber?:  unknown,
    LYS?: unknown,
    homePort?: unknown,
    draught?: unknown,
    owners: unknown,
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

export type SessionFields = {
    name: unknown,
    description: unknown,
    boats: unknown,
    date: unknown
}

export type NewSessionEntry = {
    name: string,
    description: string,
    boats: mongoose.Schema.Types.ObjectId[],
    date: mongoose.Schema.Types.Date
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
  date: unknown,
  time: unknown,
  location: unknown,
  description: unknown,
  creator: mongoose.Types.ObjectId
}