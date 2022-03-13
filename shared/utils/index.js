import AsyncStorage from '@react-native-async-storage/async-storage'
import {AUTH_STORAGE} from '../constants/common'

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e.message)
  }
}

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log(e.message)
  }
}

export const generateHeaderToken = async () => {
  const auth = await getData(AUTH_STORAGE)
  return {headers: {Authorization: `Bearer ${auth?.token}`}}
}
