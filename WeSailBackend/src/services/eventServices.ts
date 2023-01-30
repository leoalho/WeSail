import Event from '../models/Event'
import { NewEventEntry } from '../types'

export const newEvent = async (eventEntry: NewEventEntry) => {
  const event = new Event(eventEntry)
  await event.save()  
  return event
}

export const getEvents = async () => {
  const events = await Event.find({}).populate('boat', {name: 1})
  return events
}