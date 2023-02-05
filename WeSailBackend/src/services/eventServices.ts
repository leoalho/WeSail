import Event from '../models/event'
import User from '../models/user'
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

export const getUpcoming = async (id: string) => {
    const user = await User.findById(id)
    if (!user) {return} 
    const events = await Event
        .find(
            {$and: [
                {date: {$gte: new Date()}},
                {$or: [
                    {boat: {$in: user.boats}},
                    {boat: {$in: user.crewMember}},
                    {boat: {$in: user.boatsFollowing}},
                    {creator: {$in: user.friends}}
                ]}
            ]}
        )
        .sort({date: 1})
        .populate('boat', {name: 1})
    return events
}