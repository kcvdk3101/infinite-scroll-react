import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

import { API_URL } from '../constants/common'
// import { errorHandler } from './exception'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json'
  },
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

export async function getAPI<TReturn>(url: string, config?: InternalAxiosRequestConfig): Promise<TReturn> {
  return await axiosInstance.get(url, config)
}

export async function postAPI<TReturn, TBody = undefined>(
  url: string,
  data: TBody,
  config?: InternalAxiosRequestConfig
): Promise<TReturn> {
  return await axiosInstance.post(url, data, config)
}
export async function putAPI<TReturn, TBody = undefined>(
  url: string,
  data: TBody,
  config?: InternalAxiosRequestConfig
): Promise<TReturn> {
  return await axiosInstance.put(url, data, config)
}
export async function patchAPI<TReturn, TBody = undefined>(
  url: string,
  data: TBody,
  config?: InternalAxiosRequestConfig
): Promise<TReturn> {
  return await axiosInstance.patch(url, data, config)
}
export async function deleteAPI<TReturn>(
  url: string,
  config?: InternalAxiosRequestConfig
): Promise<TReturn> {
  return await axiosInstance.delete(url, config)
}
