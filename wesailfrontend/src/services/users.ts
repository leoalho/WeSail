import axios from 'axios'
const baseUrl = '/api/users'

interface newUser {
    username: string,
    password: string,
    email: string
}

export const signUp = async (user: newUser) => {
  await axios.post(baseUrl, user)
}
