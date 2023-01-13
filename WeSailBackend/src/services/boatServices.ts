import Boat from '../models/boat'

export const getBoats = async () => {
    const boats = await Boat.find({}).populate('owners', {username: 1}).populate('crew', {username: 1})
    return boats
}