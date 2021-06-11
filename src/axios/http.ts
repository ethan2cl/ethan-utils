import axios from 'axios'
import { serialize } from '../utils/serialize'
import type { HttpMethodName, AxiosRequestConfig, CreateHttp, Http } from './types'

// const DEFAULT_CONFIG: AxiosRequestConfig = {
//   timeout: 15 * 1000
// }

// for loop create httpMethod
const methodName: HttpMethodName[] = [ 'get', 'post', 'put', 'delete' ]

// interceptors err handle
const errorHandler = (err: any) => Promise.reject(err)

/**
 * a method which can create a object,
 * its has four properties (get, post, put, delete)
 */
export const createHttp: CreateHttp = (props = {
  baseURL: '/',
  clearGetCache: false,
  defaultConfig: {
    timeout: 15 * 1000
  },
  requset: config => config,
  response: response => response,
}) => {
  const { baseURL: baseurl, clearGetCache, defaultConfig, requset, response } = props
  const http = {} 
  methodName.forEach(method => {
    (http as Http)[method] = (data, url, baseURL = baseurl) => {
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
      } else if (data instanceof FormData) {
        requestData.data = data
      } else {
        // transform data({ a: 1, b: 2 }) => ?a=1&b=2 
        requestData.data = serialize(data)
      }

      // 4. send request
      return instance
        .request(requestData)
        .then(response => Promise.resolve(response))
        .catch(errorHandler)
    }
  });
  return http as Http
}