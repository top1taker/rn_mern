import {View, Text, TextInput} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'
import {useController} from 'react-hook-form'

const InputControl = ({name, control, title, handleChange, ...props}) => {
  const tw = useTailwind()

  const {
    field: {onChange, onBlur, value, ref},
    formState: {errors},
  } = useController({
    name,
    control,
  })

  return (
    <View style={tw('m-4')}>
      <Text style={tw('font-bold text-gray-400')}>
        {title?.toUpperCase() || name?.toUpperCase()}
      </Text>
      <TextInput
        style={tw('border-b-2 border-gray-400 h-12')}
        onChangeText={(text) => {
          handleChange?.(text)
          onChange(text)
        }}
        onBlur={onBlur}
        value={value}
        ref={ref}
        {...props}
      />
      {errors?.[name] && (
        <Text style={{fontStyle: 'italic', color: 'red'}}>
          {errors[name].message}
        </Text>
      )}
    </View>
  )
}

export default InputControl
