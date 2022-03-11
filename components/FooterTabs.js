import {SafeAreaView, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const FooterTabs = () => {
  const tw = useTailwind()
  const tabs = [
    {label: 'Home', iconName: 'home'},
    {label: 'Post', iconName: 'plus-square'},
    {label: 'Links', iconName: 'list-ol'},
    {label: 'Account', iconName: 'user'},
  ]

  return (
    <SafeAreaView
      style={tw('flex-row justify-around py-2 items-center bg-gray-200')}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={tw('items-center justify-center')}
        >
          <FontAwesome5 style={tw('mb-1')} name={tab.iconName} size={24} />
          <Text>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}

export default FooterTabs
