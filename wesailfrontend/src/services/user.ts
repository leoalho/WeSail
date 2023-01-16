import axios from 'axios'
const baseUrl = '/api/login'

const getUser = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default getUser