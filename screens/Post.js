import {SafeAreaView, View, Text} from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn'
import FooterTabs from '../components/FooterTabs'

const Post = () => {
  const tw = useTailwind()
  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Text>Post Screen</Text>
      </View>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Post
