import AsyncStorage from '@react-native-async-storage/async-storage'

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

export const mergeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.mergeItem(key, jsonValue)
  } catch (e) {
    console.log(e.message)
  }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log(e.message)
  }
}

export const generateCallback = (message) => ({
  onError: (another) => alert(another || `${message} failed`),
  onSuccess: (another) => alert(another || `${message} successfully`),
})
