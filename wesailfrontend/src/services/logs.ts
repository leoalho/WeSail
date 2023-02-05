/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from 'axios'
import { Log } from '../types'

const baseUrl = '/api/logs'

export const getLogs = async (): Promise<Log[]> => {
    const logs = await axios.get(`${baseUrl}/main`)
    return logs.data
}

interface NewLog {
    boat: string,
    participants?: string[],
    description: string,
    weather?: string,
    distance?: string,
    distanceSailed?: string,  
    startTime: string,
    endTime: string,
    start: string,
    end: string
}

export const newLog = async (log: NewLog) => {
    const newLog = await axios.post(baseUrl, log)
    return newLog
}