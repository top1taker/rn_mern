import {createSlice} from '@reduxjs/toolkit'
import {
  GENERATE_STATUS,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from '../../shared/constants/common'

export const LOGIN_STATUS = GENERATE_STATUS(LOGIN_ROUTE)
export const REGISTER_STATUS = GENERATE_STATUS(REGISTER_ROUTE)
export const LOGOUT_STATUS = GENERATE_STATUS('Logout')
export const UPLOAD_IMAGE_STATUS = GENERATE_STATUS('UploadImage')
export const CHANGE_PASSWORD_STATUS = GENERATE_STATUS('ChangePassword')

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    loginRequest: (state) => {
      state.status = LOGIN_STATUS.LOADING
      state.error = null
    },
    loginSuccess: (state, {payload}) => {
      state.status = LOGIN_STATUS.SUCCEEDED
      state.auth = payload
    },
    loginFailed: (state, {payload}) => {
      state.status = LOGIN_STATUS.FAILED
      state.error = payload || 'Failed to login'
    },
    registerRequest: (state) => {
      state.status = REGISTER_STATUS.LOADING
      state.error = null
    },
    registerSuccess: (state, {payload}) => {
      state.status = REGISTER_STATUS.SUCCEEDED
      state.auth = payload
    },
    registerFailed: (state, {payload}) => {
      state.status = REGISTER_STATUS.FAILED
      state.error = payload || 'Failed to register'
    },
    logoutRequest: (state) => {
      state.status = LOGOUT_STATUS.LOADING
      state.error = null
    },
    logoutSuccess: (state) => {
      state.status = LOGOUT_STATUS.SUCCEEDED
      state.auth = null
    },
    logoutFailed: (state, {payload}) => {
      state.status = LOGOUT_STATUS.FAILED
      state.error = payload || 'Failed to logout'
    },
    uploadImageRequest: (state) => {
      state.status = UPLOAD_IMAGE_STATUS.LOADING
      state.error = null
    },
    uploadImageSuccess: (state, {payload}) => {
      state.status = UPLOAD_IMAGE_STATUS.SUCCEEDED
      const auth = state.auth
      state.auth = {...auth, ...payload}
    },
    uploadImageFailed: (state, {payload}) => {
      state.status = UPLOAD_IMAGE_STATUS.FAILED
      state.error = payload || 'Failed to uploadImage'
    },
    changePasswordRequest: (state) => {
      state.status = CHANGE_PASSWORD_STATUS.LOADING
      state.error = null
    },
    changePasswordSuccess: (state) => {
      state.status = CHANGE_PASSWORD_STATUS.SUCCEEDED
    },
    changePasswordFailed: (state, {payload}) => {
      state.status = CHANGE_PASSWORD_STATUS.FAILED
      state.error = payload || 'Failed to changePassword'
    },
    resetStatus: (state) => {
      state.status = 'idle'
    },
  },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions
export const authSelectors = {
  selectAll: (state) => state.auth,
}

export default authSlice.reducer
