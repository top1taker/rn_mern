import React, {useState, useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import {useAsyncStorage} from '@react-native-async-storage/async-storage'

import {
  AUTH_STORAGE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  REGISTER_ROUTE,
  ACCOUNT_ROUTE,
  LINKS_ROUTE,
  POST_ROUTE,
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

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
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
  }, [])

  return (
    <NavigationContainer>
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
          </>
        ) : (
          <>
            <Stack.Screen name={LOGIN_ROUTE} component={Signin} />
            <Stack.Screen name={REGISTER_ROUTE} component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation
