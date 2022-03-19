import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useTailwind} from 'tailwind-rn'
import {useDispatch, useSelector} from 'react-redux'
import {Avatar, Divider} from 'react-native-elements'

import PreviewCard from '../components/PreviewCard'
import {
  userActions,
  userSelectors,
  USER_PROFILE_STATUS,
} from '../redux/slices/userSlice'

const STATUS = USER_PROFILE_STATUS

const Profile = ({route}) => {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const {profile, status, links} = useSelector(userSelectors.selectAll)

  const {
    params: {user},
  } = route

  useEffect(() => {
    if (user._id) dispatch(userActions.getProfileRequest({userId: user._id}))
  }, [user._id])

  if (status === STATUS.LOADING)
    return (
      <View style={tw('flex-1 items-center justify-center')}>
        <ActivityIndicator color='red' />
      </View>
    )

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={tw(
            'rounded-full bg-white mx-auto items-center justify-center my-4'
          )}
        >
          <Avatar
            size={150}
            rounded
            containerStyle={{backgroundColor: 'coral'}}
            {...{
              ...(profile?.image?.url
                ? {
                    source: {
                      uri: profile?.image?.url,
                    },
                  }
                : {
                    title: profile?.name?.[0].toUpperCase(),
                  }),
            }}
          />
        </View>

        <Text style={tw('font-bold text-center mt-3 text-[36px]')}>
          {profile?.name}
        </Text>
        <Text style={tw('font-semibold text-center my-2 text-xl text-black')}>
          {profile?.email}
        </Text>
        <Text style={tw(' text-center my-2 text-gray-400')}>
          {profile?.role}
        </Text>

        <Divider width={2} />

        {links.map((link) => (
          <PreviewCard
            key={link._id}
            {...link.urlPreview}
            views={link.views}
            likes={link.likes}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
