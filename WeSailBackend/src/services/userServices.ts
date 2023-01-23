import User from '../models/user'
import {NewUserEntry, UpdateUser} from '../types';
import mongoose from 'mongoose';

export const getUsers = async () => {
    const users = await User.find({}).populate('friends', { username: 1 })
    return users
}

export const newUser = async (userEntry: NewUserEntry) => {
    const user = new User(userEntry)
    await user.save()
    return user
}

export const findUser = async(username: string) => {
    const user = await User.findOne({username: username}).populate('friends', { username: 1 }).populate('boats', {name: 1})
    return user
}

export const findUserId = async(id: string) => {
  const user = await User.findById(id).populate('friends', { username: 1}).populate('boats', {name: 1})
  return user
}

export const deleteUser = async (id: string) => {
    await User.deleteOne({ _id: id })
}

export const updateUser = async (id:mongoose.Types.ObjectId, user: UpdateUser) => {
    const oldUser = await User.findById(id)
    if (oldUser){
        if (user.email){
            oldUser.email = user.email
        }
        if (user.friend){
            const friend = await User.findById(user.friend)
            if (friend && user.friend !== id){
                oldUser.friends.push(user.friend)
                friend.friends.push(id)
                await friend.save()
            }
            

        }
        await oldUser.save()
    }
    
    return oldUser
  }