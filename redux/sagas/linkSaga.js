import {all, put, takeEvery, call, delay} from 'redux-saga/effects'

import {linkActions} from '../slices/linkSlice'
import Api from '../../shared/configs/api'
import {URL_LINK} from '../../shared/constants/endpoints'

function* createWorker({payload: {form, onSuccess, onError, onSideEffect}}) {
  try {
    const {data} = yield call(() => Api.post(URL_LINK, form))
    yield put(linkActions.createSuccess(data))
    onSuccess?.()
    onSideEffect?.()
  } catch (error) {
    yield put(linkActions.createFailed(error.response?.data?.error))
    onError?.(error.response?.data?.error)
  }
}

function* listWorker() {
  try {
    const {data} = yield call(() => Api.get(URL_LINK))
    yield put(linkActions.listSuccess(data))
  } catch (error) {
    yield put(linkActions.listFailed(error.response?.data?.error))
  }
}

export default function* linkSaga() {
  yield all([
    yield takeEvery(linkActions.createRequest.type, createWorker),
    yield takeEvery(linkActions.listRequest.type, listWorker),
  ])
}
