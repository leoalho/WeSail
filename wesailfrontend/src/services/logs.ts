/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from 'axios'
import { Log } from '../types'

const baseUrl = '/api/logs'

export const getLogs = async (): Promise<Log[]> => {
    const logs = await axios.get(`${baseUrl}/main`)
    return logs.data
}

export const newLog = () => {
    return
}