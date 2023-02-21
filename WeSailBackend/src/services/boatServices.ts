/* eslint-disable @typescript-eslint/no-misused-promises */
import mongoose from 'mongoose'
import Boat from '../models/boat'
import User from '../models/user'
import { BoatArray, isBoatArray, NewBoatEntry, Patch, UserArray }from '../types'
import { removeFromUserArray } from './userPatch'

export const getBoats = async () => {
    const boats = await Boat.find({}).populate('owners', {username: 1}).populate('crew', {username: 1})
    return boats
}

export const getBoat = async (id: string) => {
  const boat = await Boat.findById(id)
    .populate('owners', {username: 1})
    .populate('crew', {username: 1})
    .populate('crewRequests', {username: 1})
    .populate('followers', {username: 1})
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

const addCrew = async (ownerId: (string | undefined), boatId: string, userId: string) => {
    const boatObjectId = new mongoose.Types.ObjectId(boatId)
    const userObjectId = new mongoose.Types.ObjectId(userId)
    const boat = await Boat.findById(boatId)
    const user = await User.findById(userId)

    if (boat && user && !boat.crew.includes(userObjectId) && await checkOWner(boatId, ownerId)){
        await boat.updateOne({$addToSet: {crew: userObjectId}, $pull: {crewRequests: userObjectId}})
        await user.updateOne({$addToSet: {crewMember: boatObjectId}, $pull: {crewRequestsPending: boatObjectId}})
        await boat.save()
        await user.save()
    }
}

export const checkOWner = async (boatId: string, userId: (string | undefined)) => {
    const boatObjectId = new mongoose.Types.ObjectId(boatId)
    const user = await User.findById(userId)
    if (user){
        return user.boats.includes(boatObjectId)
    }
    return false
}

type BoatArrayField = {
    followers?: mongoose.Types.ObjectId,
    crew?: mongoose.Types.ObjectId,
    crewRequests?: mongoose.Types.ObjectId
}

type AppendBoatArray = {
    $addToSet: BoatArrayField
  }
  
  type DeleteBoatArray = {
    $pull: BoatArrayField
  }

export const removeFromBoatArray = async (id: string, field:BoatArray, value:string) => {
    const boat = await Boat.findById(id)
    if (boat){
      const update: DeleteBoatArray = {$pull: {}}
      const valueId = new mongoose.Types.ObjectId(value)
      update.$pull[field]=valueId
      await boat.updateOne(update)
      await boat.save()
    }
}

export const addToBoatArray = async (id: string, field:BoatArray, value:string) => {
    const boat = await Boat.findById(id)
    if (boat){
      const update: AppendBoatArray = {$addToSet: {}}
      const valueId = new mongoose.Types.ObjectId(value)
      update.$addToSet[field]=valueId
      await boat.updateOne(update)
      await boat.save()
    }
}

interface UserSideEffect {field: BoatArray, field2: UserArray}

const userSideEffects: UserSideEffect[] = [
	{field: "crewRequests", field2: "crewRequestsPending"},
]

export const boatJsonPatch = async (adderId: (string | undefined), boatId: string, patch: Patch) => {
	const parsedPath =  patch.path.split("/")
  if (parsedPath.length === 0){
    return
  }
  const path = parsedPath[1]
	switch (patch.op){
		case "add":
            if (path==="crew"){
                await addCrew(adderId, boatId, patch.value)
            }
			break
		case "remove":
            if (isBoatArray(path)){
                await removeFromBoatArray(boatId, path, patch.value)
            }
            userSideEffects.forEach(async (sideEffect) => {
                if (path===sideEffect.field){
                    await removeFromUserArray(patch.value, sideEffect.field2, boatId)
                }
            })
			break
		case "replace":
			break
	}
}