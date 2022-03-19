import {createSlice} from '@reduxjs/toolkit'
import {GENERATE_STATUS} from '../../shared/constants/common'

export const USER_PROFILE_STATUS = GENERATE_STATUS('user-profile')

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    links: [],
    error: null,
    status: 'idle',
  },
  reducers: {
    getProfileRequest: (state) => {
      state.status = USER_PROFILE_STATUS.LOADING
      state.error = null
    },
    getProfileSuccess: (state, {payload}) => {
      state.status = USER_PROFILE_STATUS.SUCCEEDED
      state.profile = payload.profile || {}
      state.links = payload.links || []
    },
    getProfileFailed: (state, {payload}) => {
      state.status = USER_PROFILE_STATUS.FAILED
      state.error = payload || 'Failed to getProfile'
    },
  },
})

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions
export const userSelectors = {
  selectAll: (state) => state.user,
}

export default userSlice.reducer
