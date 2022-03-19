import {all, put, takeEvery, call, delay} from 'redux-saga/effects'

import Api from '../../shared/configs/api'
import {URL_GET_USER_PROFILE} from '../../shared/constants/endpoints'
import {userActions} from '../slices/userSlice'

function* getProfileWorker({
  payload: {userId, onError, onSuccess, onSideEffect},
}) {
  try {
    const {data} = yield call(() => Api.get(URL_GET_USER_PROFILE(userId)))
    yield put(userActions.getProfileSuccess(data))
    onSuccess?.()
    onSideEffect?.()
  } catch (error) {
    yield put(userActions.getProfileFailed(error.response?.data?.error))
    onError?.(error.response?.data?.error)
  }
}

export default function* userSaga() {
  yield all([
    yield takeEvery(userActions.getProfileRequest.type, getProfileWorker),
  ])
}
