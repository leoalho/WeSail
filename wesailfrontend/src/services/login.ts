import axios from 'axios'
const baseUrl = '/api/login'

interface Userinfo {
  username: string
  password: string
}

const login = async (credentials: Userinfo) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default login