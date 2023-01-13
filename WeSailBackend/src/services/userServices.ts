import User from '../models/user'
import {NewUserEntry} from '../types';

export const getUsers = async () => {
    const users = await User.find({})
    return users
}

export const newUser = async (userEntry: NewUserEntry) => {
    const user = new User(userEntry)
    await user.save()
    return user
}

export const findUser = async(username: string) => {
    const user = await User.findOne({username: username})
    return user
}

export const deleteUser = async (id: string) => {
    await User.deleteOne({ _id: id })
}