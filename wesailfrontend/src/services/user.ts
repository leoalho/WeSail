import axios from 'axios'
const baseUrl = '/api/login'

const getLoggedInUser = async () => {
  const response = await axios.get(baseUrl)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data
}

export default getLoggedInUser