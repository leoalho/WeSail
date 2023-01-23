import axios from 'axios'
const baseUrl = '/api/boats'

interface NewBoat {
  name: string
}

export const newBoat = async (boat: NewBoat) => {
  await axios.post(baseUrl, boat)
}