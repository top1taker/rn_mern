import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTailwind} from 'tailwind-rn'

import {authActions, authSelectors} from '../redux/slices/authSlice'
import FooterTabs from '../components/FooterTabs'
import {
  linkActions,
  linkSelectors,
  LIST_LINK_STATUS,
} from '../redux/slices/linkSlice'
import PreviewCard from '../components/PreviewCard'
import {LINK_VIEW_ROUTE, PROFILE_ROUTE} from '../shared/constants/common'

const STATUS = LIST_LINK_STATUS

const Home = ({navigation}) => {
  const dispatch = useDispatch()
  const list = useSelector(linkSelectors.selectAll)
  const status = useSelector(linkSelectors.selectStatus)
  const {auth} = useSelector(authSelectors.selectAll)
  const tw = useTailwind()

  useEffect(() => {
    dispatch(linkActions.listRequest())
  }, [])

  const checkIsLiked = (userId) => userId === auth.user._id

  const handlePress = (link) => {
    navigation.navigate(LINK_VIEW_ROUTE, {
      link: link?.urlPreview?.ogUrl,
    })
    dispatch(linkActions.viewCountRequest({linkId: link._id}))
  }

  const toggleLike = (link) => {
    if (link.likes.some(checkIsLiked)) {
      dispatch(linkActions.unlikeRequest({linkId: link._id}))
    } else {
      dispatch(linkActions.likeRequest({linkId: link._id}))
    }
  }

  const handleClickUser = (link) => {
    navigation.navigate(PROFILE_ROUTE, {user: link.postedBy})
  }

  if (status === STATUS.LOADING)
    return (
      <View style={tw('flex-1 items-center justify-center')}>
        <ActivityIndicator color='red' />
      </View>
    )

  return (
    <SafeAreaView style={tw('flex-1')}>
      <ScrollView style={tw('flex-1')}>
        {list.map((link) => (
          <PreviewCard
            key={link._id}
            {...link.urlPreview}
            views={link.views}
            likes={link.likes}
            createdAt={link.createdAt}
            user={link.postedBy}
            isLiked={link.likes.some(checkIsLiked)}
            handleClick={() => handlePress(link)}
            toggleLike={() => toggleLike(link)}
            handleClickUser={() => handleClickUser(link)}
            showIcons
          />
        ))}
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Home
