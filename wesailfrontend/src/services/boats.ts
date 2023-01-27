import axios from 'axios'
import { Boat } from '../types'
const baseUrl = '/api/boats'

interface NewBoat {
  name: string
}

export const newBoat = async (boat: NewBoat): Promise<Boat> => {
  const newboat = await axios.post(baseUrl, boat)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newboat.data
}

export const getBoat = async (id: (string | undefined)): Promise<Boat> => {
  const boat = await axios.get(`${baseUrl}/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return boat.data
}

export const getBoats = async (): Promise<Boat[]> => {
  const boats = await axios.get(baseUrl)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return boats.data
}