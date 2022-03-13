import {View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'
import {useTailwind} from 'tailwind-rn'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useAsyncStorage} from '@react-native-async-storage/async-storage'

import InputControl from '../components/InputControl'
import {authActions, authSelectors} from '../redux/slices/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import CustomButton from '../components/CustomButton'
import {
  AUTH_STORAGE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  LOADING_STATUS,
} from '../shared/constants/common'

const ForgotPassword = ({navigation}) => {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const {loading, status} = useSelector(authSelectors.selectAll)

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  })

  const {handleSubmit, control} = useForm({
    defaultValues: {email: ''},
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    dispatch(authActions.loginRequest(data))
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tw('flex-1 justify-center')}
    >
      <Text style={tw('font-bold text-[30px] text-center my-2')}>
        Forgot Password
      </Text>

      <InputControl name='email' control={control} />

      <CustomButton
        title='Submit'
        onPress={handleSubmit(onSubmit)}
        btnStyle={tw('bg-orange-400')}
        textStyle={tw('text-white uppercase')}
        loading={status === LOADING_STATUS}
      />

      <View style={tw('flex-row items-center justify-center')}>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={tw('text-blue-400 font-semibold')}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default ForgotPassword
