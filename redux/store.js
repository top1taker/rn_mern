import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './slices/rootSlice'
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }),
    sagaMiddleware,
  ],
})

sagaMiddleware.run(rootSaga)
