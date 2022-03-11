import {Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'

const CustomButton = ({
  title,
  loading,
  disabled,
  btnStyle,
  textStyle,
  ...props
}) => {
  const tw = useTailwind()
  return (
    <TouchableOpacity
      style={[
        tw(
          'w-auto flex-row items-center justify-center mx-auto bg-blue-200 m-3 p-3 rounded-full'
        ),
        btnStyle,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ActivityIndicator color={'#fff'} style={tw('mr-2')} />}
      <Text style={[tw('font-bold text-blue-600'), textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
