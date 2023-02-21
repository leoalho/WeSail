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

const userReplacables = ["email", "passwordHash"] as const
export type UserReplacable = typeof userReplacables[number]

const userArrays = ["friendRequests", "friendRequestsPending", "boats", "crewRequestsPending", "crewMember", "boatsFollowing", "events"] as const
export type UserArray = typeof userArrays[number]

const eventArrays = ["participants"] as const
export type EventArray = typeof eventArrays[number]

const boatArrays = ["crew", "crewRequests", "followers"] as const
export type BoatArray = typeof boatArrays[number]

type Op = 'add' | 'remove' | 'replace'

export interface Patch {op: Op, path: string, value: string}

export const isUserReplacable = (path: string): path is UserReplacable => {
	return (userReplacables as readonly string[]).indexOf(path) >= 0
}

export const isUserArray = (path: string): path is UserArray => {
  return (userArrays as readonly string[]).indexOf(path) >= 0
}

export const isBoatArray = (path: string): path is BoatArray => {
    return (boatArrays as readonly string[]).indexOf(path) >= 0
}
