import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'

const initialState = null as (null | User)

type Payload = User | null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newUser(_state, action: PayloadAction<Payload>) {
      const content: Payload = action.payload
      return content
    }
  }
})

export const {newUser} = userSlice.actions
export default userSlice.reducer