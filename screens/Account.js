import {SafeAreaView, Image, View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useTailwind} from 'tailwind-rn'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker'
import {Avatar} from 'react-native-elements'

import InputControl from '../components/InputControl'
import {authActions, authSelectors} from '../redux/slices/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import CustomButton from '../components/CustomButton'
import FooterTabs from '../components/FooterTabs'

const Account = ({navigation}) => {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const {
    loading,
    error,
    auth: {user},
  } = useSelector(authSelectors.selectAll)

  const schema = yup.object().shape({
    password: yup.string().min(6).max(32).required(),
  })

  const {handleSubmit, control} = useForm({
    defaultValues: {password: ''},
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    alert(data)
  }

  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    })

    if (!result.cancelled) {
      const imgURL = `data:image/jpg;base64,${result.base64}`
      dispatch(authActions.uploadImageRequest({image: imgURL}))
    }
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <SafeAreaView style={tw('flex-1')}>
      <KeyboardAwareScrollView
        contentContainerStyle={tw('flex-1 justify-center')}
      >
        <TouchableOpacity
          style={tw(
            'w-36 h-36 rounded-full bg-white mx-auto items-center justify-center'
          )}
          onPress={handleUpload}
        >
          <Avatar
            size={130}
            rounded
            source={{uri: user?.image?.url}}
            containerStyle={{backgroundColor: 'grey'}}
          >
            <Avatar.Accessory size={23} />
          </Avatar>
        </TouchableOpacity>

        <Text style={tw('font-bold text-center mt-3 text-[36px]')}>
          {user?.name}
        </Text>
        <Text style={tw('font-semibold text-center my-2 text-xl text-black')}>
          {user?.email}
        </Text>
        <Text style={tw(' text-center my-2 text-gray-400')}>{user?.role}</Text>

        <InputControl name='password' secureTextEntry control={control} />

        <CustomButton
          title='Submit'
          onPress={handleSubmit(onSubmit)}
          btnStyle={tw('bg-orange-400')}
          textStyle={tw('text-white uppercase')}
          loading={loading}
        />
      </KeyboardAwareScrollView>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Account
