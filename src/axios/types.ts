import type { AxiosRequestConfig as _AxiosRequestConfig } from 'axios'

// axios default request params config
export type AxiosRequestConfig = {
  // tiemstamp
  ts?: number 
} & _AxiosRequestConfig

export type HttpMethodName = 'get' | 'post' | 'put' | 'delete'

export type HttpMethod <T = any> = (data: object, url: string, baseURL?: string) => Promise<T>

// http will have 4 methods, get post put delete
export type Http = Record<HttpMethodName, HttpMethod>
