import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: 'invalid',
  isAuthenticated: false,
  user: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token
      state.isAuthenticated = action.payload.isAuthenticated
    },
    logout: () => {
      return initialState
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
})

export const { setAuth, logout, setUser } = authSlice.actions
export { initialState }
export default authSlice.reducer