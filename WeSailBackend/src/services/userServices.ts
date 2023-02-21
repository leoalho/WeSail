/* eslint-disable @typescript-eslint/no-misused-promises */
import User from '../models/user'
import { NewUserEntry } from '../types';

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
      .populate('crewRequestsPending', {name: 1})
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
    .populate('crewRequestsPending', {name: 1})
    .populate('boatsFollowing', {name: 1})
    .populate('friendRequests', {username: 1})
    .populate('friendRequestsPending', {username: 1})
  console.log(user)
  return user
}

export const deleteUser = async (id: string) => {
    await User.deleteOne({ _id: id })
}