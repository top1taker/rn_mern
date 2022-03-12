import {SafeAreaView, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useNavigation, useRoute} from '@react-navigation/native'
import {
  ACCOUNT_ROUTE,
  HOME_ROUTE,
  LINKS_ROUTE,
  POST_ROUTE,
} from '../shared/constants/common'
import {Divider} from 'react-native-elements'

const FooterTabs = () => {
  const tw = useTailwind()
  const navigation = useNavigation()
  const route = useRoute()

  const tabs = [
    {
      label: HOME_ROUTE,
      iconName: 'home',
      onPress: () => navigation.navigate(HOME_ROUTE),
    },
    {
      label: POST_ROUTE,
      iconName: 'plus-square',
      onPress: () => navigation.navigate(POST_ROUTE),
    },
    {
      label: LINKS_ROUTE,
      iconName: 'list-ol',
      onPress: () => navigation.navigate(LINKS_ROUTE),
    },
    {
      label: ACCOUNT_ROUTE,
      iconName: 'user',
      onPress: () => navigation.navigate(ACCOUNT_ROUTE),
    },
  ]

  return (
    <>
      <Divider width={2} />
      <SafeAreaView
        style={tw('flex-row mx-3 justify-between py-2 items-center')}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={tw('items-center justify-center')}
            onPress={tab.onPress}
          >
            <FontAwesome5
              style={tw('mb-1')}
              name={tab.iconName}
              size={24}
              color={route.name === tab.label && 'orange'}
            />
            <Text>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </>
  )
}

export default FooterTabs
