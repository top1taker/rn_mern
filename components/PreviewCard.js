import {TouchableOpacity, View, Text, Image} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'

const PreviewCard = ({
  ogTitle = 'Untitled',
  ogDescription = 'No description ...',
  ogImage = {url: 'https://via.placeholder.com/500x500?text=Image'},
}) => {
  const tw = useTailwind()
  return (
    <View
      style={[
        tw('rounded-xl bg-gray-200 m-3'),
        {
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 6,
        },
      ]}
    >
      <Image
        source={{uri: ogImage?.url}}
        style={tw('h-36 w-full rounded-xl')}
        resizeMode='cover'
      />
      <TouchableOpacity style={tw('m-2')}>
        <Text style={tw('text-xl')}>{ogTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw('mx-2')}>
        <Text style={tw('text-gray-500')}>{ogDescription}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PreviewCard
