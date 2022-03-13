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
      state.loading = true
      state.error = null
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.auth = null
    },
    logoutFailed: (state, {payload}) => {
      state.loading = false
      state.error = payload || 'Failed to logout'
    },
    uploadImageRequest: (state) => {
      state.loading = true
      state.error = null
    },
    uploadImageSuccess: (state, {payload}) => {
      state.loading = false
      const auth = state.auth
      state.auth = {...auth, ...payload}
    },
    uploadImageFailed: (state, {payload}) => {
      state.loading = false
      state.error = payload || 'Failed to uploadImage'
    },
    changePasswordRequest: (state) => {
      state.loading = true
      state.error = null
    },
    changePasswordSuccess: (state) => {
      state.loading = false
    },
    changePasswordFailed: (state, {payload}) => {
      state.loading = false
      state.error = payload || 'Failed to changePassword'
    },
  },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions
export const authSelectors = {
  selectAll: (state) => state.auth,
}

export default authSlice.reducer
