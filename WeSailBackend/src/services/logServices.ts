import Log from '../models/log'
import User from '../models/user'
import { NewLogEntry } from '../types'

export const getLogs = async () => {
    const logs = await Log.find({})
        .populate('boat', {name: 1})
        .populate('creator', {username: 1})
        .populate('participants', {username: 1})
    return logs
}

export const getMainLogs = async (id: (string | undefined)) => {
    const user = await User.findById(id)
    if (!user) {return} 
    const logs = await Log
        .find(
            {$or: [
                {boat: {$in: user.boats}},
                {boat: {$in: user.crewMember}},
                {boat: {$in: user.boatsFollowing}},
                {creator: {$in: user.friends}},
                {creator: {$in: user.friends}}
            ]}
        )
        .sort({date: 1})
        .populate('boat', {name: 1})
        .populate('creator', {username: 1})
        .populate('participants', {username: 1})
    return logs   
} 

export const getBoatLogs = async (id: (string | undefined)) => {
    const logs = await Log
        .find({boat: id})
        .sort({date: 1})
        .populate('boat', {name: 1})
        .populate('creator', {username: 1})
        .populate('participants', {username: 1})
    return logs
}

export const getUserLogs = async (id: (string | undefined)) => {
    const logs = await Log
        .find({creator: id})
        .sort({date: 1})
        .populate('boat', {name: 1})
        .populate('creator', {username: 1})
        .populate('participants', {username: 1})
    return logs
}

export const newLog = async (logEntry: NewLogEntry) => {
    const log = new Log(logEntry)
    await log.save()
    return log
}