import axios from 'axios'
import type { HttpMethodName, AxiosRequestConfig, CreateHttp, Http } from './types'

// for loop create httpMethod
const methodName: HttpMethodName[] = [ 'get', 'post', 'put', 'delete' ]

// interceptors err handle
const errorHandler = (err: any) => Promise.reject(err)

/**
 * a method which can create a object,
 * with four properties (get, post, put, delete)
 */
export const createHttp: CreateHttp = (props = {}) => {
  const {
    baseURL: URL = '/',
    clearGetCache = false,
    defaultConfig = {
      timeout: 15 * 1000
    },
    requset = config => config,
    response = resp => resp
  } = props
  const http = {} 
  methodName.forEach(method => {
    (http as Http)[method] = (url, data = {}, baseURL = URL) => {
      // 1. create axios instance
      const instance = axios.create(defaultConfig)
  
      // 2. add interceptors
      instance.interceptors.request.use(requset, errorHandler) 
      instance.interceptors.response.use(response,errorHandler)

      // 3. create request data
      const requestData: AxiosRequestConfig = { method, url, baseURL }
      // handle "data"(property)
      if (method === 'get') {
        requestData.params = clearGetCache ? { ...data, ts: Date.now() } : data
      } else if (method === 'post') {
        requestData.data = data
      }

      // 4. send request
      return instance
        .request(requestData)
        .then(resp => Promise.resolve(resp))
        .catch(errorHandler)
    }
  });
  return http as Http
}
