import mongoose from 'mongoose'
import Event from '../models/event'
import User from '../models/user'
import { EventArray, EventReplacable, isEventReplacable, NewEventEntry, Patch } from '../types'
import { parseString } from '../utils/utils'

export const newEvent = async (eventEntry: NewEventEntry) => {
  const event = new Event(eventEntry)
  await event.save()  
  return event
}

export const checkOwner = async (eventId: string, userId: (string | undefined)) => {
  const event = await Event.findById(eventId)
  if (event && userId){
    return event.creator.equals(userId)
  }
    return false
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
        .populate('participants', {username: 1})
    return events
}

export const getPastBoatEvents = async (id: string) => {
    const events = await Event
        .find(
            {$and: [
                {boat: id},
                {date: {$lte: new Date()}}
            ]}
        )
        .sort({date: 1})
        .populate('boat', {name: 1})
        .populate('participants', {username: 1})
    return events
}

export const getBoatEvents = async (id: string) => {
    const events = await Event
        .find(
            {$and: [
                {boat: id},
                {date: {$gte: new Date()}}
            ]}
        )
        .sort({date: 1})
        .populate('boat', {name: 1})
        .populate('participants', {username: 1})
    return events
}

type EventArrayField = {
    participants?: mongoose.Types.ObjectId
}

type AppendEventArray = {
    $addToSet: EventArrayField
}

type DeleteEventArray = {
    $pull: EventArrayField
}

export const addToEventArray = async (id: string, field:EventArray, value:string) => {
    const event = await Event.findById(id)
    if (event){
      const update: AppendEventArray = {$addToSet: {}}
      const valueId = new mongoose.Types.ObjectId(value)
      update.$addToSet[field]=valueId
      await event.updateOne(update)
      await event.save()    
    }
  }
  
export const removeFromEventArray = async (id: string, field:EventArray, value:string) => {
    const event = await Event.findById(id)
    if (event){
      const update: DeleteEventArray = {$pull: {}}
      const valueId = new mongoose.Types.ObjectId(value)
      update.$pull[field]=valueId
      await event.updateOne(update)
      await event.save()
    }
  }

export const updateEvent = async (userId: (string|undefined), id: string, patches: Patch[]) => {
  const isOwner = await checkOwner(id, userId)
  if (!isOwner) {throw new Error('Not authorized')}
  console.log(patches)
  for (const patch of patches){
    const parsedPath =  patch.path.split("/")
    if (parsedPath.length === 0){
      throw new Error('Incorrect patch path')
    }
    const path = parsedPath[1]
    switch (patch.op){
      case "replace":
        if (isEventReplacable(path)){
          await updateField(id, path, parseString(patch.value))
        }
    }
  }
}

const updateField = async (id: string, field:EventReplacable, value:string) => {
  const event = await Event.findById(id)
  if (event){
    if (field==="date"){
      event["date"]= new Date(value)
    }else{
    event[field]= value
    }
    await event.save()
  }
} 

export const getEvent = async (id: string) => {
  const event = await Event.findById(id)
  return event
}

export const deleteEvent = async (id: string) => {
    await Event.deleteOne({_id: id })
}