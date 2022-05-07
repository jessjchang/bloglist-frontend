import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const initialState = {
  message: '',
  messageType: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      if (state!== '') {
        clearTimeout(timeoutId)
      }

      return {
        message: action.payload.message,
        messageType: action.payload.messageType
      }
    },
    clearMessage() {
      return initialState
    }
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (messageDetails, seconds) => {
  return async dispatch => {
    dispatch(setMessage(messageDetails))
    timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
