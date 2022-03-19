import {createSlice} from '@reduxjs/toolkit'
import {
  GENERATE_STATUS,
  LOGIN_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  REGISTER_ROUTE,
} from '../../shared/constants/common'

export const LOGIN_STATUS = GENERATE_STATUS('login')
export const REGISTER_STATUS = GENERATE_STATUS('register')
export const LOGOUT_STATUS = GENERATE_STATUS('logout')
export const UPLOAD_IMAGE_STATUS = GENERATE_STATUS('upload-image')
export const CHANGE_PASSWORD_STATUS = GENERATE_STATUS('change-password')
export const FORGOT_PASSWORD_STATUS = GENERATE_STATUS('forgot-password')
export const RESET_PASSWORD_STATUS = GENERATE_STATUS('reset-password')

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
    forgotPasswordRequest: (state) => {
      state.status = FORGOT_PASSWORD_STATUS.LOADING
      state.error = null
    },
    forgotPasswordSuccess: (state) => {
      state.status = FORGOT_PASSWORD_STATUS.SUCCEEDED
    },
    forgotPasswordFailed: (state, {payload}) => {
      state.status = FORGOT_PASSWORD_STATUS.FAILED
      state.error = payload || 'Failed to forgotPassword'
    },
    resetPasswordRequest: (state) => {
      state.status = RESET_PASSWORD_STATUS.LOADING
      state.error = null
    },
    resetPasswordSuccess: (state) => {
      state.status = RESET_PASSWORD_STATUS.SUCCEEDED
    },
    resetPasswordFailed: (state, {payload}) => {
      state.status = RESET_PASSWORD_STATUS.FAILED
      state.error = payload || 'Failed to resetPassword'
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
