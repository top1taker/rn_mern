import {combineReducers} from '@reduxjs/toolkit'

import auth from './authSlice'
import link from './linkSlice'
import user from './userSlice'

export default rootReducer = combineReducers({auth, link, user})
