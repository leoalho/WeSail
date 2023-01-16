import axios from 'axios'
const baseUrl = '/api/login'

interface Userinfo {
  username: string
  password: string
}

const login = async (credentials: Userinfo) => {
  const response = await axios.post(baseUrl, credentials)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data
}

export default login