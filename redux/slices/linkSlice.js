import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'
import {LINKS_ROUTE, GENERATE_STATUS} from '../../shared/constants/common'

export const CREATE_LINK_STATUS = GENERATE_STATUS(LINKS_ROUTE)
export const LIST_LINK_STATUS = GENERATE_STATUS('ListLink')
export const VIEW_COUNT_STATUS = GENERATE_STATUS('ViewCount')
export const LIKE_LINK_STATUS = GENERATE_STATUS('LikeLink')
export const UNLIKE_LINK_STATUS = GENERATE_STATUS('UnlikeLink')

const linksAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt) * -1,
  selectId: (link) => link._id,
})

const initialState = linksAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    createRequest: (state) => {
      state.status = CREATE_LINK_STATUS.LOADING
      state.error = null
    },
    createSuccess: (state, {payload}) => {
      state.status = CREATE_LINK_STATUS.SUCCEEDED
      linksAdapter.upsertOne(state, payload)
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
      linksAdapter.setAll(state, payload)
    },
    listFailed: (state, {payload}) => {
      state.status = LIST_LINK_STATUS.FAILED
      state.error = payload || 'Failed to list'
    },
    viewCountRequest: (state) => {
      state.status = VIEW_COUNT_STATUS.LOADING
      state.error = null
    },
    viewCountSuccess: (state, {payload}) => {
      state.status = VIEW_COUNT_STATUS.SUCCEEDED
      linksAdapter.upsertOne(state, payload)
    },
    viewCountFailed: (state, {payload}) => {
      state.status = VIEW_COUNT_STATUS.FAILED
      state.error = payload || 'Failed to viewCount'
    },
    likeRequest: (state) => {
      state.status = LIKE_LINK_STATUS.LOADING
      state.error = null
    },
    likeSuccess: (state, {payload}) => {
      state.status = LIKE_LINK_STATUS.SUCCEEDED
      linksAdapter.upsertOne(state, payload)
    },
    likeFailed: (state, {payload}) => {
      state.status = LIKE_LINK_STATUS.FAILED
      state.error = payload || 'Failed to like'
    },
    unlikeRequest: (state) => {
      state.status = UNLIKE_LINK_STATUS.LOADING
      state.error = null
    },
    unlikeSuccess: (state, {payload}) => {
      state.status = UNLIKE_LINK_STATUS.SUCCEEDED
      linksAdapter.upsertOne(state, payload)
    },
    unlikeFailed: (state, {payload}) => {
      state.status = UNLIKE_LINK_STATUS.FAILED
      state.error = payload || 'Failed to unlike'
    },
    resetStatus: (state) => {
      state.status = 'idle'
    },
  },
})

// Action creators are generated for each case reducer function
export const linkActions = linkSlice.actions

export const linkSelectors = {
  ...linksAdapter.getSelectors((state) => state.link),
}

export default linkSlice.reducer
