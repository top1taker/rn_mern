import React, {useState, useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useAsyncStorage} from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'

import {
  AUTH_STORAGE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  REGISTER_ROUTE,
  ACCOUNT_ROUTE,
  LINKS_ROUTE,
  POST_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LINK_VIEW_ROUTE,
  PROFILE_ROUTE,
} from './shared/constants/common'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import Home from './screens/Home'
import {useDispatch, useSelector} from 'react-redux'
import {authSelectors, authActions} from './redux/slices/authSlice'
import HeaderTabs from './components/HeaderTabs'
import Account from './screens/Account'
import Links from './screens/Links'
import Post from './screens/Post'
import ForgotPassword from './screens/ForgotPassword'
import LinkView from './screens/LinkView'
import Profile from './screens/Profile'

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {getItem} = useAsyncStorage(AUTH_STORAGE)
  const {auth} = useSelector(authSelectors.selectAll)
  const authenticated = auth?.token && auth?.user

  useEffect(() => {
    ;(async () => {
      const storedAuth = JSON.parse(await getItem())
      if (storedAuth?.token && storedAuth?.user) {
        dispatch(authActions.loginSuccess(storedAuth))
      }
    })()

    axios.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        const res = error.response.data
        if (res.status === 401 && res.message === 'jwt expired') {
          console.log('need to logout')
          dispatch(
            authActions.logoutRequest({
              callback: () => navigation.navigate(LOGIN_ROUTE),
            })
          )
        }
        return Promise.reject(error)
      }
    )
  }, [])

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`
    }
  }, [auth])

  return (
    <Stack.Navigator
      initialRouteName={LOGIN_ROUTE}
      screenOptions={{headerShown: false}}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name={HOME_ROUTE}
            component={Home}
            options={{headerShown: true, header: () => <HeaderTabs />}}
          />
          <Stack.Screen
            name={LINK_VIEW_ROUTE}
            component={LinkView}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name={ACCOUNT_ROUTE}
            component={Account}
            options={{headerShown: true, headerBackTitle: '', title: ''}}
          />
          <Stack.Screen
            name={LINKS_ROUTE}
            component={Links}
            options={{headerShown: true, headerBackTitle: '', title: ''}}
          />
          <Stack.Screen
            name={POST_ROUTE}
            component={Post}
            options={{headerShown: true, headerBackTitle: '', title: ''}}
          />
          <Stack.Screen
            name={PROFILE_ROUTE}
            component={Profile}
            options={{headerShown: true, headerBackTitle: '', title: ''}}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={LOGIN_ROUTE} component={Signin} />
          <Stack.Screen name={REGISTER_ROUTE} component={Signup} />
          <Stack.Screen
            name={FORGOT_PASSWORD_ROUTE}
            component={ForgotPassword}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigation
