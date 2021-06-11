import type { AxiosRequestConfig as _AxiosRequestConfig, AxiosResponse } from 'axios'

// axios default request params config, add ts to clear get's cache
export type AxiosRequestConfig = {
  ts?: number // tiemstamp
} & _AxiosRequestConfig

export type HttpMethodName = 'get' | 'post' | 'put' | 'delete'
/**
 * every method have three properties
 * data: will in request body or request head
 * baseURL & url: to be final requset url
 * why should i push baseURL in the last, because sometimes maybe u should change baseURL
 * in vuejs, we always instead it with proxy, and default value like '/' 
 * 
 * in this type, use P determines the return value of Promise
 * when we use this method, T can determines the type of data  
 */
export type HttpMethod <P = any> = <T extends object> (data: T, url: string, baseURL?: string) => Promise<P>

// http will have 4 methods, get post put delete
export type Http <P = any> = Record<HttpMethodName, HttpMethod<P>>

/**
 * pick baseURL and interceptors for personal setting
 * i will also set default value
 * 
 * baseURL was brought up seprately,because it will be statement as a global variable,
 * also it can be modify in every httpMethod
 * 
 * clearGetCache decide if add timestamp property to clear  get's cache
 * 
 * requset & response are interceptor of axios requset
 */
export type CreateHttpProps = {
  baseURL?: string
  clearGetCache?: boolean
  defaultConfig?: Omit<AxiosRequestConfig, 'baseURL'>
  requset?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  response?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
}
// type of createHttp
export type CreateHttp = <P = any> (props?: CreateHttpProps) => Http <P>
