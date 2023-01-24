import mongoose from "mongoose"

export type UserFields = {username: unknown, password: unknown, email: unknown}

export type NewUserEntry = {username: string, passwordHash: string, email: string}

export type UpdateUser = {
    username: string | undefined,
    passwordHash: string | undefined,
    email: string | undefined,
    friend: mongoose.Types.ObjectId | undefined,
    status: string | undefined
}

export type BoatFields = {
    name: unknown,
    registrationNumber?:  unknown,
    LYS?: unknown,
    homePort?: unknown,
    draught?: unknown,
    owners: unknown,
    crew?: unknown,
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