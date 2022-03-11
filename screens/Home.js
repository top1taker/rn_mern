import {SafeAreaView, View, Text, Button} from 'react-native'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTailwind} from 'tailwind-rn'

import {authActions, authSelectors} from '../redux/slices/authSlice'
import FooterTabs from '../components/FooterTabs'

const Home = ({navigation}) => {
  const {auth} = useSelector(authSelectors.selectAll)
  const tw = useTailwind()

  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <Text>Home</Text>
        <Text>{JSON.stringify(auth, null, 4)}</Text>
      </View>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Home
