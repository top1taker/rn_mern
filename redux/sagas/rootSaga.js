import {all} from 'redux-saga/effects'

import authSaga from './authSaga'
import linkSaga from './linkSaga'
import userSaga from './userSaga'

export default function* rootSaga() {
  yield all([authSaga(), linkSaga(), userSaga()])
}
