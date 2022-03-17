import {createSlice} from '@reduxjs/toolkit'
import {LINKS_ROUTE, GENERATE_STATUS} from '../../shared/constants/common'

export const CREATE_LINK_STATUS = GENERATE_STATUS(LINKS_ROUTE)
export const LIST_LINK_STATUS = GENERATE_STATUS('ListLink')

export const linkSlice = createSlice({
  name: 'link',
  initialState: {
    list: [],
    error: null,
    status: 'idle',
  },
  reducers: {
    createRequest: (state) => {
      state.status = CREATE_LINK_STATUS.LOADING
      state.error = null
    },
    createSuccess: (state, {payload}) => {
      state.status = CREATE_LINK_STATUS.SUCCEEDED
      state.list.push(payload.link)
    },
    createFailed: (state, {payload}) => {
      state.status = CREATE_LINK_STATUS.FAILED
      state.error = payload || 'Failed to create'
    },
    listRequest: (state) => {
      state.status = LIST_LINK_STATUS.LOADING
      state.error = null
    },
    listSuccess: (state, {payload}) => {
      state.status = LIST_LINK_STATUS.SUCCEEDED
      state.list = payload
    },
    listFailed: (state, {payload}) => {
      state.status = LIST_LINK_STATUS.FAILED
      state.error = payload || 'Failed to list'
    },
    resetStatus: (state) => {
      state.status = 'idle'
    },
  },
})

// Action creators are generated for each case reducer function
export const linkActions = linkSlice.actions
export const linkSelectors = {
  selectAll: (state) => state.link,
}

export default linkSlice.reducer
