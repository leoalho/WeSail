import User from '../models/user'
import {NewUserEntry, UpdateUser} from '../types';
import { hashPassword } from '../utils/utils';
import mongoose from 'mongoose';

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

export const deleteFriend = async (user: string, friend: string) => {
  await User.findByIdAndUpdate(user, {$pull: {friends: friend}})
  await User.findByIdAndUpdate(friend, {$pull: {friends: user}})
}

export const deleteFriendRequest = async (user: string, friend: string) => {
    await User.findByIdAndUpdate(user, {$pull: {friendRequests: friend}})
    await User.findByIdAndUpdate(friend, {$pull: {friendRequestsPending: user}})
}

const userReplacables = ["email", "passwordHash"] as const
export type UserReplacable = typeof userReplacables[number]

const userArrays = ["friends", "friendRequests", "friendRequestsPending", "boats", "crewRequestsPending", "crewMember", "boatsFollowing", "events"] as const
export type UserArray = typeof userArrays[number]

type Op = 'add' | 'remove' | 'replace'

export interface Patch {op: Op, path: string, value: string}

export interface UserSideEffect {field: UserArray, field2: UserArray}

export const isUserReplacable = (path: any): path is UserReplacable => {
	return (userReplacables as readonly string[]).indexOf(path) >= 0
}

export const isUserArray = (path: any): path is UserArray => {
  return (userArrays as readonly string[]).indexOf(path) >= 0
}

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

type UpdateUserArray = {
  $addToSet: UserArrayField
}

const addToArray = async (id: string, field:UserArray, value:string) => {
  const user = await User.findById(id)
  if (user){
    var update: UpdateUserArray = {$addToSet: {}}
    const valueId = new mongoose.Types.ObjectId(value)
    update.$addToSet[field]=valueId
    await user.updateOne(update)
    await user.save()    
  }
}

const removeFromArray = async (id: string, field:UserArray, value:string) => {
  const user = await User.findById(id)
  if (user){
    var update: UpdateUserArray = {$addToSet: {}}
    const valueId = new mongoose.Types.ObjectId(value)
    update.$addToSet[field]=valueId
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
	{field: "friendRequestsPending", field2: "friendRequests"}
]

export const UserJsonPatch = async (id: string, patch: Patch) => {
	const parsedPath =  patch.path.split("/")
  if (parsedPath.length === 0){
    return
  }
  const path = parsedPath[1]
	switch (patch.op){
		case "add":
			if (isUserArray(path)){
        await addToArray(id, path, patch.value)
				userSideEffects.forEach(async (sideEffect) => {
					if (path===sideEffect.field){
            await addToArray(patch.value, sideEffect.field2, id)
					}	
				})
      }
			break
		case "remove":
      if (isUserArray(path)){
        await removeFromArray(id, path, patch.value)
				userSideEffects.forEach(async (sideEffect) => {
					if (path===sideEffect.field){
            await removeFromArray(patch.value, sideEffect.field2, id)
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

export const updateUser = async (id:mongoose.Types.ObjectId, user: UpdateUser) => {
    const oldUser = await User.findById(id).populate('boatsFollowing', {name: 1})
    if (oldUser){
        if (user.email){
            oldUser.email = user.email
        }
        if (user.boatsFollowing){
          await oldUser.updateOne({$addToSet: {boatsFollowing: user.boatsFollowing}})
        }
        if (user.friend && user.friend !== id){
          await oldUser.updateOne({$addToSet: {friends: user.friend}, $pull: {friendRequests: user.friend}})
          await User.findByIdAndUpdate(user.friend, {$addToSet: {friends: id}, $pull: {friendRequestsPending: id}})    
        }
        if (user.friendRequest){
          await oldUser.updateOne({$addToSet: {friendRequests: user.friendRequest}})
          await User.findByIdAndUpdate(user.friendRequest, {$addToSet: {friendRequestsPending: id}})
        }
        if (user.event){
          await oldUser.updateOne({$addToSet: {events: user.event}})
        } 
        await oldUser.save()
    }
    
    return oldUser
  }