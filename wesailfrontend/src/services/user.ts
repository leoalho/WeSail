import axios from 'axios'
const baseUrl = '/api/login'

const getUser = async () => {
  const response = await axios.get(baseUrl)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data
}

export default getUser