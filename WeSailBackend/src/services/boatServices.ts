import mongoose from 'mongoose'
import Boat from '../models/boat'
import User from '../models/user'
import { NewBoatEntry, UpdateBoat }from '../types'

export const getBoats = async () => {
    const boats = await Boat.find({}).populate('owners', {username: 1}).populate('crew', {username: 1})
    return boats
}

export const getBoat = async (id: string) => {
  const boat = await Boat.findById(id).populate('owners', {username: 1}).populate('crew', {username: 1}).populate('crewRequests', {username: 1}).populate('followers', {username: 1})
  return boat
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

export const updateBoat = async (id: mongoose.Types.ObjectId, boat: UpdateBoat) => {
  const oldBoat = await Boat.findById(id).populate('followers', {username: 1})
  console.log(oldBoat)
  console.log(boat)
  if (oldBoat){
    if (boat.follower){
      oldBoat.followers.push(boat.follower)}
    await oldBoat.save()
  }
  return oldBoat
}

export const deleteFollower = async (id: string, follower: string) => {
  await User.findByIdAndUpdate(follower, {$pull: {boatsFollowing: id}})
  await Boat.findByIdAndUpdate(id, {$pull: {followers: follower}})
}