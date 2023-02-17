/* eslint-disable @typescript-eslint/no-misused-promises */
import User from '../models/user'
import {EventArray, Patch, isUserArray, isUserReplacable, NewUserEntry, UserArray, UserReplacable} from '../types';
import { hashPassword } from '../utils/utils';
import mongoose from 'mongoose';
import { addToEventArray, removeFromEventArray } from './eventServices';

export const getUsers = async () => {
    const users = await User.find({})
        .populate('friends', { username: 1 })
        .populate('boats', {name: 1})
    return users
}

export const newUser = async (userEntry: NewUserEntry) => {
    const user = new User(userEntry)
    await user.save()
    return user
}

export const findUser = async(username: string) => {
    const user = await User.findOne({username: username})
      .populate('friends', { username: 1 })
      .populate('boats', {name: 1})
      .populate('crewMember', {name: 1})
      .populate('boatsFollowing', {name: 1})
      .populate('friendRequests', {username: 1})
      .populate('friendRequestsPending', {username: 1})
    return user
}

export const findUserId = async(id: string) => {
  const user = await User.findById(id)
    .populate('friends', { username: 1})
    .populate('boats', {name: 1})
    .populate('crewMember', {name: 1})
    .populate('boatsFollowing', {name: 1})
    .populate('friendRequests', {username: 1})
    .populate('friendRequestsPending', {username: 1})
  console.log(user)
  return user
}

export const deleteUser = async (id: string) => {
    await User.deleteOne({ _id: id })
}

export interface UserSideEffect {field: UserArray, field2: UserArray}

export interface EventSideEffect {field: UserArray, field2: EventArray}

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

const addToUserArray = async (id: string, field:UserArray, value:string) => {
  const user = await User.findById(id)
  if (user){
    const update: AppendUserArray = {$addToSet: {}}
    const valueId = new mongoose.Types.ObjectId(value)
    update.$addToSet[field]=valueId
    await user.updateOne(update)
    await user.save()    
  }
}

const removeFromUserArray = async (id: string, field:UserArray, value:string) => {
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
	{field: "friends", field2: "friends"},
    {field: "friendRequestsPending", field2: "friendRequests"},
	{field: "friendRequests", field2: "friendRequestsPending"},
]

const eventSideEffects: EventSideEffect[] = [
	{field: "events", field2: "participants"}, 
]

export const userJsonPatch = async (id: string, patch: Patch) => {
	const parsedPath =  patch.path.split("/")
  if (parsedPath.length === 0){
    return
  }
  const path = parsedPath[1]
	switch (patch.op){
		case "add":
			if (isUserArray(path)){
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