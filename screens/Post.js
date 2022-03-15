import {SafeAreaView, View, Text, ScrollView} from 'react-native'
import React, {useState, useRef} from 'react'
import {useTailwind} from 'tailwind-rn'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import ogs from '@uehreka/open-graph-scraper-react-native'

import InputControl from '../components/InputControl'
import FooterTabs from '../components/FooterTabs'
import {useDispatch} from 'react-redux'
import CustomButton from '../components/CustomButton'
import PreviewCard from '../components/PreviewCard'

const Post = () => {
  const tw = useTailwind()
  const refTimeout = useRef()
  const dispatch = useDispatch()
  const [urlPreview, setUrlPreview] = useState('')

  const schema = yup.object().shape({
    url: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
      )
      .required('Please enter website'),
    title: yup.string().min(6).max(32).required(),
  })

  const {handleSubmit, control} = useForm({
    defaultValues: {url: '', title: ''},
    resolver: yupResolver(schema),
  })

  const handleChange = (text) => {
    if (refTimeout.current) clearTimeout(refTimeout.current)
    refTimeout.current = setTimeout(() => {
      schema
        .isValid({url: text, title: '123456'})
        .then(() => {
          ogs({url: text}, (error, results, response) => {
            if (results.success) {
              setUrlPreview(results)
            }
          })
        })
        .catch((err) => console.log(err))
    }, 1500)
  }

  const onSubmit = (form) => {
    console.log({form})
  }
  return (
    <SafeAreaView style={tw('flex-1')}>
      <View style={tw('flex-1')}>
        <ScrollView>
          <InputControl
            control={control}
            name='url'
            handleChange={handleChange}
            placeholder='Paste your url'
          />
          <InputControl
            control={control}
            name='title'
            autoCapitalize='sentences'
            placeholder='Enter your title'
          />
          <CustomButton onPress={handleSubmit(onSubmit)} title='Submit' />
          {urlPreview?.success && <PreviewCard {...urlPreview} />}
        </ScrollView>
      </View>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Post
