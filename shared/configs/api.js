import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {AUTH_STORAGE} from '../constants/common'
import {API_URL} from '@env'

console.log({API_URL})

const defaultOptions = {}

export const generateToken = () =>
  (async () => {
    const auth = JSON.parse(await AsyncStorage.getItem(AUTH_STORAGE))
    return {
      Authorization: `Bearer ${auth?.token}`,
    }
  })()

function getNotAuthApi(path, options, apiURL) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
    },
  })
}

function getApi(path, options, apiURL) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function postApi(path, data, options = {}) {
  return axios.post(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function putApi(path, data, options = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function patchApi(path, data, options = {}) {
  return axios.patch(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function deleteApi(path, options = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  patch: patchApi,
  getNotAuth: getNotAuthApi,
}

export default Api
