/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from 'axios'
import { User, Patch } from '../types'
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
  return users.data
}

export const getUser = async (id: (string | undefined)): Promise<User> => {
  const user = await axios.get(`${baseUrl}/${id}`)
  return user.data
}

export const updateUser = async (id: string, patch: Patch): Promise<User> => {
  const UpdatedUser = await axios.patch(`${baseUrl}/${id}`, {patch: patch})
  return UpdatedUser.data
}