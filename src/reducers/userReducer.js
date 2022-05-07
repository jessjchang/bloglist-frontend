import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = {
  username: '',
  password: '',
  user: null
}

const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    },
    setUser(state, action) {
      return { ...state, user: action.payload }
    }
  }
})

export const { setUsername, setPassword, setUser } = userSlice.actions

export const loginUser = () => {
  return async (dispatch, getState) => {
    const loggingUser = await loginService.login({
      username: getState().userDetails.username,
      password: getState().userDetails.password
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(loggingUser)
    )
    dispatch(setUser(loggingUser))
    dispatch(setUsername(''))
    dispatch(setPassword(''))
    return loggingUser
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer