import {View, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useTailwind} from 'tailwind-rn'

const Profile = ({route}) => {
  const tw = useTailwind()
  const [profile, setProfile] = useState({})

  const {
    params: {user},
  } = route
  console.log({user})

  useEffect(() => {}, [user._id])

  return (
    <View>
      <Text>Profile</Text>
      <Text>{JSON.stringify(profile, null, 4)}</Text>
    </View>
  )
}

export default Profile
