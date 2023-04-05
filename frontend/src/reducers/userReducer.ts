import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, Boat, Friend, BoatUser } from '../types'

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
    },
    updateFriends(state, action: PayloadAction<Friend[]>) {
      if (state){
        state.friends = action.payload
      }
    },
    updateFriendRequests(state, action: PayloadAction<Friend[]>) {
      if (state){
        state.friendRequests = action.payload
      }
    },
    updatePendingFriends(state, action: PayloadAction<Friend[]>) {
      if (state){
        state.friendRequestsPending = action.payload
      }
    },
    updateEvents(state, action: PayloadAction<string[]>) {
      if (state){
        state.events = action.payload
      }
    },
    updatePendingCrew(state, action: PayloadAction<BoatUser[]>) {
      if (state){
        state.crewRequestsPending = action.payload
      }
    },
    updateEmail(state, action: PayloadAction<string>) {
      if (state){
        state.email = action.payload
      }
    } 
  }
})

export const {newUser,
              addBoat,
              updateFollowing,
              updatePendingFriends,
              updateFriends,
              updateFriendRequests,
              updateEvents,
              updatePendingCrew,
              updateEmail
            } = userSlice.actions
export default userSlice.reducer