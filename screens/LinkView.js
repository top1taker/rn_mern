import React, {useEffect, useState} from 'react'
import WebView from 'react-native-webview'
import {useTailwind} from 'tailwind-rn'

const LinkView = ({route}) => {
  const [link, setLink] = useState('')

  useEffect(() => {
    setLink(route?.params?.link)
  }, [route?.params?.link])

  return <WebView startInLoadingState source={{uri: link}} />
}

export default LinkView
