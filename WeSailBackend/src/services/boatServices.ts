import Boat from '../models/boat'
import User from '../models/user'
import { NewBoatEntry } from '../types'

export const getBoats = async () => {
    const boats = await Boat.find({}).populate('owners', {username: 1}).populate('crew', {username: 1})
    return boats
}

export const newBoat = async (boatEntry: NewBoatEntry) => {
  const boat = new Boat(boatEntry)
  await boat.save()
  const creator = await User.findById(boat.owners[0]._id)
  if (creator){
    creator.boats.push(boat._id)
    await creator.save()
  }
  
  return boat
}