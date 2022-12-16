import { createSlice } from '@reduxjs/toolkit'
// Start Manual Code
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {},
  },
  reducers: {
    increment: (state,value) => {
      state.value = value
    },
  },
})

export const { increment } = userSlice.actions

export const selectCount = (state) => state.user.value

export default userSlice.reducer
//End Manual Code