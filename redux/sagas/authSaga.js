import {all, put, takeEvery, call, delay} from 'redux-saga/effects'

import {authActions} from '../slices/authSlice'
import Api from '../../shared/configs/api'
import {
  URL_LOGIN,
  URL_REGISTER,
  URL_UPLOAD_IMAGE,
} from '../../shared/constants/endpoints'
import {AUTH_STORAGE} from '../../shared/constants/common'
import {storeData, generateHeaderToken} from '../../shared/utils/'

function* loginWorker({payload}) {
  try {
    const {data} = yield call(() => Api.post(URL_LOGIN, payload))
    yield call(() => storeData(AUTH_STORAGE, data))
    yield put(authActions.loginSuccess(data))
  } catch (error) {
    yield put(authActions.loginFailed(error.response?.data?.error))
  }
}

function* registerWorker({payload}) {
  try {
    const {data} = yield call(() => Api.post(URL_REGISTER, payload))
    yield call(() => storeData(AUTH_STORAGE, data))
    yield put(authActions.registerSuccess(data))
  } catch (error) {
    yield put(authActions.registerFailed(error.response?.data?.error))
  }
}

function* uploadImageWorker({payload}) {
  try {
    const headerToken = yield call(() => generateHeaderToken())
    const {data} = yield call(() =>
      Api.post(URL_UPLOAD_IMAGE, payload, headerToken)
    )
    yield put(authActions.uploadImageSuccess(data))
  } catch (error) {
    yield put(authActions.uploadImageFailed(error.response?.data?.error))
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(authActions.loginRequest.type, loginWorker),
    yield takeEvery(authActions.registerRequest.type, registerWorker),
    yield takeEvery(authActions.uploadImageRequest.type, uploadImageWorker),
  ])
}
