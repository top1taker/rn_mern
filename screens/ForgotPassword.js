import {View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
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
import {generateCallback} from '../shared/utils'
import {
  FORGOT_PASSWORD_STATUS,
  RESET_PASSWORD_STATUS,
} from '../redux/slices/authSlice'
import {LOGIN_ROUTE} from '../shared/constants/common'

const ForgotPassword = ({navigation}) => {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const {status} = useSelector(authSelectors.selectAll)

  const STATUS = visible ? RESET_PASSWORD_STATUS : FORGOT_PASSWORD_STATUS

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    ...(visible && {
      password: yup.string().min(6).max(32).required(),
      resetCode: yup.string().min(5).max(5).required(),
    }),
  })

  const {handleSubmit, control} = useForm({
    defaultValues: {email: '', ...(visible && {password: '', resetCode: ''})},
    resolver: yupResolver(schema),
  })

  const onSubmit = (form) => {
    if (!visible) {
      dispatch(
        authActions.forgotPasswordRequest({
          form,
          ...generateCallback('Send reset password link'),
          onSideEffect: () => setVisible(true),
        })
      )
    } else {
      dispatch(
        authActions.resetPasswordRequest({
          form,
          ...generateCallback('Reset password'),

          onSideEffect: () => navigation.navigate(LOGIN_ROUTE),
        })
      )
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tw('flex-1 justify-center')}
    >
      <Text style={tw('font-bold text-[30px] text-center my-2')}>
        Forgot Password
      </Text>

      <InputControl name='email' control={control} />
      {visible && (
        <>
          <InputControl
            name='password'
            title='new password'
            control={control}
            secureTextEntry
          />
          <InputControl name='resetCode' title='reset code' control={control} />
        </>
      )}

      <CustomButton
        title='Submit'
        onPress={handleSubmit(onSubmit)}
        btnStyle={tw('bg-orange-400')}
        textStyle={tw('text-white uppercase')}
        loading={status === STATUS.LOADING}
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
