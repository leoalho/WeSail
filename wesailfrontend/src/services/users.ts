import axios from 'axios'
import { User, UpdateUser } from '../types'
const baseUrl = '/api/users'

interface newUser {
    username: string,
    password: string,
    email: string
}

export const signUp = async (user: newUser) => {
  await axios.post(baseUrl, user)
}

export const getUsers = async (): Promise<User[]> => {
  const users = await axios.get(baseUrl)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return users.data
}

export const getUser = async (id: (string | undefined)): Promise<User> => {
  const user = await axios.get(`${baseUrl}/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user.data
}

export const updateUser = async (id: string, user: UpdateUser): Promise<User> => {
  const UpdatedUser = await axios.patch(`${baseUrl}/${id}`, user)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return UpdatedUser.data
}

export const removeFriend = async (id: string, friend: string) => {
  await axios.delete(`${baseUrl}/${id}/friends/${friend}`)
}