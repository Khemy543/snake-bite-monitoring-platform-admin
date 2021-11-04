import axios from 'axios'
import router from '../router'
import VueCookies from 'vue3-cookies'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const API = axios.create({
  baseURL: 'https://snake-platform.herokuapp.com/api/',
  headers: defaultHeaders
})

API.interceptors.request.use(
  config => {
    const token = VueCookies.VueCookies.get('authToken')
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      Promise.reject(response)
    }
  },
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          return ''
        case 403:
          router.replace({
            path: '/auth/login',
            query: { redirectUrl: router.currentRoute.fullPath }
          })
          break
        case 500:
          break
      }
    }
    return Promise.reject(error.response)
  }
)
export default API
