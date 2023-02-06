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
    return user
}

export const findUserId = async(id: string) => {
  const user = await User.findById(id)
    .populate('friends', { username: 1})
    .populate('boats', {name: 1})
    .populate('crewMember', {name: 1})
    .populate('boatsFollowing', {name: 1})
    .populate('friendRequests', {username: 1})
  return user
}

export const deleteUser = async (id: string) => {
    await User.deleteOne({ _id: id })
}

export const deleteFriend = async (user: string, friend: string) => {
  await User.findByIdAndUpdate(user, {$pull: {friends: friend}})
  await User.findByIdAndUpdate(friend, {$pull: {friends: user}})
}

export const updateUser = async (id:mongoose.Types.ObjectId, user: UpdateUser) => {
    const oldUser = await User.findById(id).populate('boatsFollowing', {name: 1})
    if (oldUser){
        if (user.email){
            oldUser.email = user.email
        }
        if (user.boatsFollowing){
          await User.findByIdAndUpdate(id, {$addToSet: {boatsFollowing: user.boatsFollowing}})
        }
        if (user.friend){
            const friend = await User.findById(user.friend)
            if (friend && user.friend !== id){
                await User.findByIdAndUpdate(id, {$pull: {friendRequests: user.friend}})
                //oldUser.friends.push(user.friend)
                await oldUser.updateOne({$addToSet: {friends: user.friend}})
                await friend.updateOne({$addToSet: {friends: id}})
                //friend.friends.push(id)
                await friend.save()
            }    
        }
        if (user.friendRequest){
          await User.findByIdAndUpdate(id, {$addToSet: {friendRequests: user.friendRequest}})
        } 
        await oldUser.save()
    }
    
    return oldUser
  }