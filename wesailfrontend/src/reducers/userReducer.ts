import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types'

const initialState = null as (null | User)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newUser(_state, action) {
      const content: User = action.payload
      return content
    }
  }
})

export const {newUser} = userSlice.actions
export default userSlice.reducer