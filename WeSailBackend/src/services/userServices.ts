import User from '../models/user'
import {NewUserEntry, UpdateUser} from '../types';
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