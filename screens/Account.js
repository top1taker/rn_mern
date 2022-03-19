import {SafeAreaView, Image, View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useTailwind} from 'tailwind-rn'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import {Avatar} from 'react-native-elements'

import InputControl from '../components/InputControl'
import {
  authActions,
  authSelectors,
  CHANGE_PASSWORD_STATUS,
} from '../redux/slices/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import CustomButton from '../components/CustomButton'
import FooterTabs from '../components/FooterTabs'
import {ACCOUNT_ROUTE, GENERATE_STATUS} from '../shared/constants/common'
import {generateCallback} from '../shared/utils'

const STATUS = CHANGE_PASSWORD_STATUS

const Account = ({navigation}) => {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const {
    status,
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

  const onSubmit = (form) => {
    dispatch(
      authActions.changePasswordRequest({
        form,
        ...generateCallback('Change password'),
      })
    )
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

  return (
    <SafeAreaView style={tw('flex-1')}>
      <KeyboardAwareScrollView
        contentContainerStyle={tw('flex-1 justify-center')}
      >
        <View
          style={tw(
            'rounded-full bg-white mx-auto items-center justify-center'
          )}
        >
          <Avatar
            size={150}
            rounded
            source={{uri: user?.image?.url}}
            containerStyle={tw('bg-white')}
          >
            <Avatar.Accessory size={40} onPress={handleUpload} />
          </Avatar>
        </View>

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
          loading={status === STATUS.LOADING}
        />
      </KeyboardAwareScrollView>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Account
