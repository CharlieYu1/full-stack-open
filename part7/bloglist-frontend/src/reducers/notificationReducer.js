import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { successMessage: '', errorMessage: '' },
  reducers: {
    setSuccessMessage(state, action) {
      return ({ ...state, successMessage: action.payload })
    },
    setErrorMessage(state, action) {
      return ({ ...state, errorMessage: action.payload })
    }
  }
})

export const { setSuccessMessage, setErrorMessage } = notificationSlice.actions

export default notificationSlice.reducer
