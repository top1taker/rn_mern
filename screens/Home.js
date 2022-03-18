import {SafeAreaView, ScrollView, Text, Button} from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTailwind} from 'tailwind-rn'

import {authActions, authSelectors} from '../redux/slices/authSlice'
import FooterTabs from '../components/FooterTabs'
import {linkActions, linkSelectors} from '../redux/slices/linkSlice'
import PreviewCard from '../components/PreviewCard'
import {LINK_VIEW_ROUTE} from '../shared/constants/common'

const Home = ({navigation}) => {
  const dispatch = useDispatch()
  const list = useSelector(linkSelectors.selectAll)
  const tw = useTailwind()

  useEffect(() => {
    dispatch(linkActions.listRequest())
  }, [])

  console.log({list})

  const handlePress = (link) => {
    navigation.navigate(LINK_VIEW_ROUTE, {
      link: link?.urlPreview?.ogUrl,
    })
    dispatch(linkActions.viewCountRequest({linkId: link.id}))
  }

  return (
    <SafeAreaView style={tw('flex-1')}>
      <ScrollView style={tw('flex-1')}>
        {list.map((link) => (
          <PreviewCard
            key={link.id}
            {...link.urlPreview}
            views={link.views}
            likes={link.likes}
            handleClick={() => handlePress(link)}
            showIcons
          />
        ))}
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Home
