/* eslint-disable @typescript-eslint/no-misused-promises */
import {EventArray, Patch, isUserArray, isUserReplacable, UserArray, UserReplacable, BoatArray} from '../types';
import { hashPassword } from '../utils/utils';
import mongoose from 'mongoose';
import { addToEventArray, removeFromEventArray } from './eventServices';
import Boat from '../models/boat';
import User from '../models/user';
import { addToBoatArray, removeFromBoatArray } from './boatServices';

export interface UserSideEffect {field: UserArray, field2: UserArray}

export interface EventSideEffect {field: UserArray, field2: EventArray}

export interface BoatSideEffect {field: UserArray, field2: BoatArray}

type UserArrayField = {
  friends?: mongoose.Types.ObjectId,
  boats?: mongoose.Types.ObjectId,
  friendRequests?: mongoose.Types.ObjectId,
  friendRequestsPending?: mongoose.Types.ObjectId,
  boatsFollowing?: mongoose.Types.ObjectId,
  events?: mongoose.Types.ObjectId,
  crewRequestsPending?: mongoose.Types.ObjectId,
  crewMember?: mongoose.Types.ObjectId
}

type AppendUserArray = {
  $addToSet: UserArrayField
}

type DeleteUserArray = {
  $pull: UserArrayField
}

export const addToUserArray = async (id: string, field:UserArray, value:string) => {
  const user = await User.findById(id)
  if (user){
    const update: AppendUserArray = {$addToSet: {}}
    const valueId = new mongoose.Types.ObjectId(value)
    update.$addToSet[field]=valueId
    await user.updateOne(update)
    await user.save()    
  }
}

export const removeFromUserArray = async (id: string, field:UserArray, value:string) => {
  const user = await User.findById(id)
  if (user){
    const update: DeleteUserArray = {$pull: {}}
    const valueId = new mongoose.Types.ObjectId(value)
    update.$pull[field]=valueId
    await user.updateOne(update)
    await user.save()
  }
}

const updateField = async (id: string, field:UserReplacable, value:string) => {
  const user = await User.findById(id)
  if (user){
    user[field]= value
    await user.save()
  }
} 

const userSideEffects: UserSideEffect[] = [
    {field: "friendRequestsPending", field2: "friendRequests"},
	{field: "friendRequests", field2: "friendRequestsPending"},
]

const eventSideEffects: EventSideEffect[] = [
	{field: "events", field2: "participants"}, 
]

const boatSideEffects: BoatSideEffect[] = [
    {field: "boatsFollowing", field2: "followers"},
]

const addFriend = async (userId: string, friendId: string) => {
    const UserObjectId = new mongoose.Types.ObjectId(userId)
    const friendObjectId = new mongoose.Types.ObjectId(friendId)
    const user = await User.findById(userId)
    const friend = await User.findById(friendId)
    if (user && friend && user.friendRequests.includes(friendObjectId)){
        await user.updateOne({$addToSet: {friends: friendObjectId}, $pull: {friendRequests: friendObjectId}})
        await friend.updateOne({$addToSet: {friends: UserObjectId}, $pull: {friendRequestsPending: UserObjectId}})
        await user.save()
        await friend.save()
    }
}

const addFriendRequest = async (userId: string, friendId: string) => {
    const UserObjectId = new mongoose.Types.ObjectId(userId)
    const friendObjectId = new mongoose.Types.ObjectId(friendId)
    const user = await User.findById(userId)
    const friend = await User.findById(friendId)
    if (user && friend && !user.friends.includes(friendObjectId)){
        await user.updateOne({$addToSet: {friendRequestsPending: friendObjectId}})
        await friend.updateOne({$addToSet: {friendRequests: UserObjectId}})
        await user.save()
        await friend.save()
    }
}

const addCrewRequest = async (userId: string, boatId: string) => {
    const boatObjectId = new mongoose.Types.ObjectId(boatId)
    const userObjectId = new mongoose.Types.ObjectId(userId)
    const boat = await Boat.findById(boatId)
    const user = await User.findById(userId)
    if (boat && user && !user.crewMember.includes(boatObjectId) && !user.boats.includes(boatObjectId)){
        await user.updateOne({$addToSet: {crewRequestsPending: boatObjectId}})
        await boat.updateOne({$addToSet: {crewRequests: userObjectId}})
        await user.save()
        await boat.save()
    }
}

export const userJsonPatch = async (id: string, patch: Patch) => {
	const parsedPath =  patch.path.split("/")
  if (parsedPath.length === 0){
    return
  }
  const path = parsedPath[1]
	switch (patch.op){
		case "add":
            if (path==="friends"){
                await addFriend(id, patch.value)
            }
            else if (path==="friendRequestsPending"){
                await addFriendRequest(id, patch.value)
            }
            else if (path==="crewRequestsPending"){
                await addCrewRequest(id, patch.value)
            }
			else if (isUserArray(path)){
                await addToUserArray(id, path, patch.value)
                userSideEffects.forEach(async (sideEffect) => {
                    if (path===sideEffect.field){
                        await addToUserArray(patch.value, sideEffect.field2, id)
                    }	
                })
                eventSideEffects.forEach(async (sideEffect) => {
                    if (path===sideEffect.field){
                        await addToEventArray(patch.value, sideEffect.field2, id)
                    }	
                })
                boatSideEffects.forEach(async (sideEffect) => {
                    if (path===sideEffect.field){
                        await addToBoatArray(patch.value, sideEffect.field2, id)
                    }	
                })
      }
			break
		case "remove":
      if (isUserArray(path)){
        await removeFromUserArray(id, path, patch.value)
				userSideEffects.forEach(async (sideEffect) => {
					if (path===sideEffect.field){
                        await removeFromUserArray(patch.value, sideEffect.field2, id)
					}	
				})
                eventSideEffects.forEach(async (sideEffect) => {
					if (path===sideEffect.field){
                        await removeFromEventArray(patch.value, sideEffect.field2, id)
					}	
				})
                boatSideEffects.forEach(async (sideEffect) => {
					if (path===sideEffect.field){
                        await removeFromBoatArray(patch.value, sideEffect.field2, id)
					}                    
                })
      }
			break
		case "replace":
			if (path==="password"){
                const password = hashPassword(patch.value)
                await updateField(id, "passwordHash", password)
			}
			if (isUserReplacable(path)){
				await updateField(id, path, patch.value)
			}	
			break
	}
}