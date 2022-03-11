import {all, put, takeEvery, call, delay} from 'redux-saga/effects'

import {authActions} from '../slices/authSlice'
import Api from '../../shared/configs/api'
import {URL_LOGIN, URL_REGISTER} from '../../shared/constants/endpoints'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {AUTH_STORAGE} from '../../shared/constants/common'

function* loginWorker({payload}) {
  try {
    const {data} = yield call(() => Api.post(URL_LOGIN, payload))
    yield call(() => AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify(data)))
    yield put(authActions.loginSuccess(data))
  } catch (error) {
    yield put(authActions.loginFailed(error.response?.data?.error))
  }
}

function* registerWorker({payload}) {
  try {
    const {data} = yield call(() => Api.post(URL_REGISTER, payload))
    yield call(() => AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify(data)))
    yield put(authActions.registerSuccess(data))
  } catch (error) {
    yield put(authActions.registerFailed(error.response?.data?.error))
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(authActions.loginRequest.type, loginWorker),
    yield takeEvery(authActions.registerRequest.type, registerWorker),
  ])
}
