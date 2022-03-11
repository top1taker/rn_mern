import {View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'
import {useTailwind} from 'tailwind-rn'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import InputControl from '../components/InputControl'
import {useDispatch, useSelector} from 'react-redux'
import {authActions, authSelectors} from '../redux/slices/authSlice'
import CustomButton from '../components/CustomButton'

const Signup = ({navigation}) => {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const {error, loading} = useSelector(authSelectors.selectAll)

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(32).required(),
  })

  const {handleSubmit, control} = useForm({
    defaultValues: {name: '', email: '', password: ''},
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    dispatch(authActions.registerRequest(data))
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
      <Text style={tw('font-bold text-[30px] text-center')}>Sign Up</Text>

      <InputControl name='name' control={control} autoCapitalize='words' />
      <InputControl name='email' control={control} />
      <InputControl name='password' secureTextEntry control={control} />

      <CustomButton
        title='Submit'
        onPress={handleSubmit(onSubmit)}
        btnStyle={tw('bg-orange-400')}
        textStyle={tw('uppercase text-white')}
        loading={loading}
      />

      <View style={tw('flex-row items-center justify-center')}>
        <Text>Already joined? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={tw('text-blue-400 font-semibold')}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signup
