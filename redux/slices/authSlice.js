import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    auth: null,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, {payload}) => {
      state.loading = false
      state.auth = payload
    },
    loginFailed: (state, {payload}) => {
      state.loading = false
      state.error = payload || 'Failed to login'
    },
    registerRequest: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, {payload}) => {
      state.loading = false
      state.auth = payload
    },
    registerFailed: (state, {payload}) => {
      state.loading = false
      state.error = payload || 'Failed to register'
    },
    logoutRequest: (state) => {
      state.auth = null
    },
    uploadImageRequest: (state) => {
      state.loading = true
      state.error = null
    },
    uploadImageSuccess: (state, {payload}) => {
      state.loading = false
    },
    uploadImageFailed: (state, {payload}) => {
      state.loading = false
      state.error = payload || 'Failed to uploadImage'
    },
  },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions
export const authSelectors = {
  selectAll: (state) => state.auth,
}

export default authSlice.reducer
