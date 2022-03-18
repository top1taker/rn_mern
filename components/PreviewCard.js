import {TouchableOpacity, View, Text, Image} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const PreviewCard = ({
  ogTitle = 'Untitled',
  ogDescription = 'No description ...',
  ogImage = {url: 'https://via.placeholder.com/500x500?text=Image'},
  handleClick = () => {},
  showIcons = false,
  views = 0,
  likes = [],
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
        source={{uri: ogImage?.url || ogImage?.[0]?.url}}
        style={tw('h-36 w-full rounded-xl')}
        resizeMode='cover'
      />
      {showIcons && (
        <View style={tw('flex-row absolute top-2 right-2')}>
          <View style={tw('items-center')}>
            <FontAwesome5 name='eye' size={20} color='#ff9900' />
            <Text style={tw('text-orange-500')}>{views}</Text>
          </View>

          <TouchableOpacity style={tw('items-center mx-3')}>
            <FontAwesome5 name='heart' size={20} color='#ff9900' />
            <Text style={tw('text-orange-500')}>{likes.length}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={tw('m-2')} onPress={handleClick}>
        <Text style={tw('text-xl')}>{ogTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw('mx-2')} onPress={handleClick}>
        <Text style={tw('text-gray-500')}>{ogDescription}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PreviewCard
