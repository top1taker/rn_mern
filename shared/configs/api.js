import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {API_BACKEND} from '@env'
import {AUTH_STORAGE} from '../constants/common'

const defaultOptions = {}

export const generateToken = () =>
  (async () => {
    const auth = JSON.parse(await AsyncStorage.getItem(AUTH_STORAGE))
    return {
      Authorization: `Bearer ${auth?.token}`,
    }
  })()

function getNotAuthApi(path, options, apiURL) {
  return axios.get(`${apiURL || API_BACKEND}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
    },
  })
}

function getApi(path, options, apiURL) {
  return axios.get(`${apiURL || API_BACKEND}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function postApi(path, data, options = {}) {
  return axios.post(`${API_BACKEND}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function putApi(path, data, options = {}) {
  return axios.put(`${API_BACKEND}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function patchApi(path, data, options = {}) {
  return axios.patch(`${API_BACKEND}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options?.headers,
      ...generateToken(),
    },
  })
}

function deleteApi(path, options = {}) {
  return axios.delete(`${API_BACKEND}/${path.replace(/^\//, '')}`, {
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
