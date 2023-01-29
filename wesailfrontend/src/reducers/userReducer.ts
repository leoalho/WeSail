import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, Boat } from '../types'

interface UserBoat {
  name: string,
  id: string
}

const initialState = null as (null | User)

type Payload = User | null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newUser(_state, action: PayloadAction<Payload>) {
      const content: Payload = action.payload
      return content
    },
    addBoat(state, action: PayloadAction<Boat>) {
      const newBoat = action.payload
      if (state){
        state.boats.push({name: newBoat.name, id: newBoat.id})
      }
    },
    updateFollowing(state, action: PayloadAction<UserBoat[]>) {
      if (state){
        state.boatsFollowing = action.payload
      }
    }
  }
})

export const {newUser,addBoat,updateFollowing} = userSlice.actions
export default userSlice.reducer