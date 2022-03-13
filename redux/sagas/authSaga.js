import {all, put, takeEvery, call, delay} from 'redux-saga/effects'

import {authActions} from '../slices/authSlice'
import Api from '../../shared/configs/api'
import {
  URL_CHANGE_PASSWORD,
  URL_LOGIN,
  URL_REGISTER,
  URL_UPLOAD_IMAGE,
} from '../../shared/constants/endpoints'
import {AUTH_STORAGE} from '../../shared/constants/common'
import {removeData, storeData, mergeData} from '../../shared/utils/'

function* loginWorker({payload: {form, onSuccess, onError}}) {
  try {
    const {data} = yield call(() => Api.post(URL_LOGIN, form))
    yield call(() => storeData(AUTH_STORAGE, data))
    yield put(authActions.loginSuccess(data))
    onSuccess?.()
  } catch (error) {
    yield put(authActions.loginFailed(error.response?.data?.error))
    onError?.()
  }
}

function* logoutWorker({payload}) {
  try {
    yield call(() => removeData(AUTH_STORAGE))
    yield put(authActions.logoutSuccess())
    payload?.callback()
  } catch (error) {
    yield put(authActions.logoutFailed(error.response?.data?.error))
  }
}

function* registerWorker({payload: {form, onSuccess, onError}}) {
  try {
    const {data} = yield call(() => Api.post(URL_REGISTER, form))
    yield call(() => storeData(AUTH_STORAGE, data))
    yield put(authActions.registerSuccess(data))
    onSuccess?.()
  } catch (error) {
    yield put(authActions.registerFailed(error.response?.data?.error))
    onError?.(error.response?.data?.error)
  }
}

function* uploadImageWorker({payload}) {
  try {
    const {data} = yield call(() => Api.post(URL_UPLOAD_IMAGE, payload))
    yield call(() => mergeData(AUTH_STORAGE, data))
    yield put(authActions.uploadImageSuccess(data))
  } catch (error) {
    yield put(authActions.uploadImageFailed(error.response?.data?.error))
  }
}

function* changePasswordWorker({payload: {form, onError, onSuccess}}) {
  try {
    const {data} = yield call(() => Api.post(URL_CHANGE_PASSWORD, form))
    yield put(authActions.changePasswordSuccess(data))
    onSuccess?.()
  } catch (error) {
    yield put(authActions.changePasswordFailed(error.response?.data?.error))
    onError?.()
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(authActions.loginRequest.type, loginWorker),
    yield takeEvery(authActions.logoutRequest.type, logoutWorker),
    yield takeEvery(authActions.registerRequest.type, registerWorker),
    yield takeEvery(authActions.uploadImageRequest.type, uploadImageWorker),
    yield takeEvery(
      authActions.changePasswordRequest.type,
      changePasswordWorker
    ),
  ])
}
