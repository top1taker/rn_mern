import {SafeAreaView, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useDispatch} from 'react-redux'
import {useNavigation} from '@react-navigation/native'

import {LOGIN_ROUTE} from '../shared/constants/common'
import {authActions} from '../redux/slices/authSlice'

const HeaderTabs = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const tw = useTailwind()

  const logout = () => {
    dispatch(
      authActions.logoutRequest({
        callback: () => {
          navigation.navigate(LOGIN_ROUTE)
        },
      })
    )
  }

  return (
    <SafeAreaView style={tw('p-4 flex-row justify-end')}>
      <TouchableOpacity onPress={logout}>
        <FontAwesome5 name='sign-out-alt' size={24} color={'#ff9900'} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HeaderTabs
