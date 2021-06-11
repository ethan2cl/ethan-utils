
import axios from 'axios'
import type { HttpMethodName, AxiosRequestConfig, Http } from './types'

// axios 默认配置
const DEFAULT_CONFIG: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 15 * 1000
}

// 定义方法名称
const methodName: HttpMethodName[] = [ 'get', 'post', 'put', 'delete' ]

const http = {}

methodName.forEach(method => {
  (http as Http)[method] = (data, url, baseURL = '/') => {
    // 1. create axios instance
    const instance = axios.create(DEFAULT_CONFIG)

    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      }
    ) 

    instance.interceptors.response.use(
      (responce) => {
        return responce
      },
      err => Promise.reject(err)
    )
    // 3. organise request data
    const requestData: AxiosRequestConfig = { method, url, baseURL }
    // handle "data"(property)
    if (method === 'get') {
      requestData.params = data
    } else if (data instanceof FormData) {
      requestData.data = data
    } else {
      // transform data({ a: 1, b: 2 }) => ?a=1&b=2 
      requestData.data = serialize(data)
    }
    
    return instance
      .request(requestData)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }
});

/**
 * request data serialize
 * @param params { object } 
 */
export const serialize = <T extends object> (params: T): string => {
  let head = ''
  for (let key in params) {
    head += head === '' ? '?' : '&'
    head += `${key}=${params[key]}`
  }
  return head
}

export default http as Http
