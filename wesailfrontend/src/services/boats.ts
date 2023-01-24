import axios from 'axios'
import { Boat } from '../types'
const baseUrl = '/api/boats'

interface NewBoat {
  name: string
}

export const newBoat = async (boat: NewBoat) => {
  await axios.post(baseUrl, boat)
}

export const getBoat = async (id: (string | undefined)): Promise<Boat> => {
  const boat = await axios.get(`${baseUrl}/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return boat.data
}