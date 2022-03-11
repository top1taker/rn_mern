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
import {AUTH_STORAGE, HOME_ROUTE} from '../shared/constants/common'

const Signin = ({navigation}) => {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const {loading, error} = useSelector(authSelectors.selectAll)

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(32).required(),
  })

  const {handleSubmit, control} = useForm({
    defaultValues: {email: '', password: ''},
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    dispatch(authActions.loginRequest(data))
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tw('flex-1 justify-center')}
    >
      <Text style={tw('font-bold text-[30px] text-center')}>Sign In</Text>

      <InputControl name='email' control={control} />
      <InputControl name='password' secureTextEntry control={control} />

      <CustomButton
        title='Submit'
        onPress={handleSubmit(onSubmit)}
        btnStyle={tw('bg-orange-400')}
        textStyle={tw('text-white uppercase')}
        loading={loading}
      />

      <View style={tw('flex-row items-center justify-center')}>
        <Text>Not yet registered? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={tw('text-red-400 font-bold')}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={tw('flex-row items-center justify-center mt-2')}>
        <TouchableOpacity>
          <Text style={tw('text-orange-400 font-bold')}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signin
