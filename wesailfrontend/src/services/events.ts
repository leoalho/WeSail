/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from 'axios'
import { Event } from '../types'
const baseUrl = '/api/events'

export const getEvents = async(): Promise<Event[]> => {
  const events = await axios.get(`${baseUrl}/upcoming`)
  return events.data
}

export const getBoatEvents = async(id: string): Promise<Event[]> => {
    const events = await axios.get(`${baseUrl}/boats/${id}`)
    return events.data
}

interface NewEvent {
  boat: string,
  date: string,
  time: string,
  location: string,
  description: string
}

export const newEvent = async (event: NewEvent): Promise<Event> => {
  const newevent = await axios.post(baseUrl, event)
  return newevent.data
}