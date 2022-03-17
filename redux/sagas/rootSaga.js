import {all} from 'redux-saga/effects'

import authSaga from './authSaga'
import linkSaga from './linkSaga'

export default function* rootSaga() {
  yield all([authSaga(), linkSaga()])
}
