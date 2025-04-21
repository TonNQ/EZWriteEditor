import axios from 'axios'
import qs from 'qs'
import { QueryClient } from '@tanstack/react-query'
import { QueryFetchOptions, ApiError, MutationFetchOptions } from 'src/types/client.type'
import { CONFIG } from '../constants/config'
import { ERROR_MESSAGE } from '../constants/message'

export const client = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: 45000,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'id'
  }
})

export function setupToken(token?: string): void {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete client.defaults.headers.common['Authorization']
  }
}

export async function queryFetch<T>({ url, inputParams, client: queryClient }: QueryFetchOptions): Promise<T> {
  let params = ''
  queryClient = queryClient ?? client
  if (inputParams) {
    params = qs.stringify(inputParams)
  }

  return new Promise(async (resolve, reject) => {
    try {
      let fetchUrl = url

      if (params) {
        fetchUrl += '?' + params
      }

      const res = await queryClient.get(fetchUrl)
      console.log('res', res)
      const json = res.data.result

      resolve(json)
    } catch (error: any) {
      reject({
        status: error.response?.data.status,
        message:
          ERROR_MESSAGE[error.response?.data.message as keyof typeof ERROR_MESSAGE] || ERROR_MESSAGE.UNEXPECTED_ERROR
      } as ApiError)
    }
  })
}

export async function mutationFetch<T>({ url, method, body, baseURL }: MutationFetchOptions): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await client.request({
        ...(!!baseURL && { baseURL }),
        url,
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        data: body
      })

      const json = await res.data

      resolve(json)
    } catch (error: any) {
      reject({
        status: error.response?.status,
        message:
          ERROR_MESSAGE[error.response?.data.status as keyof typeof ERROR_MESSAGE] || ERROR_MESSAGE.UNEXPECTED_ERROR
      } as ApiError)
    }
  })
}

export async function mutationFormData<T>({ url, body, method }: MutationFetchOptions): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData()
      console.log('body', body)
      const keys = Object.keys(body)
      const bodyValue = Object.values(body)

    //   const alwaysAppendKeys = ['keepCoverPhotoUrls']

      bodyValue.map((value: any, index) => {
        const key = keys[index]
        if (Array.isArray(value)) {
          if (value.length === 0) {
            // if (alwaysAppendKeys.includes(key)) {
              form.append(key, '[]')
            // }
          } else {
            value.forEach((item, idx) => {
              form.append(`${key}[${idx}]`, item)
            })
          }
        } else if (value) {
          form.append(key, value)
        }
      })

      const res = await client.request({
        url,
        method,
        data: form,
        headers: {
          'Content-Type':
            method === 'POST' || method === 'PUT' || method === 'PATCH' ? 'multipart/form-data' : 'application/json'
        }
      })

      const json = await res.data

      resolve(json)
    } catch (error: any) {
      reject({
        status: error.response?.data.status,
        message:
          ERROR_MESSAGE[error.response?.data.status as keyof typeof ERROR_MESSAGE] || ERROR_MESSAGE.UNEXPECTED_ERROR
      } as ApiError)
    }
  })
}

export async function queryFetchServer<T>({ url, inputParams, token }: QueryFetchOptions) {
  let data!: T
  let isError: boolean = false
  let error: null | ApiError = null
  let endpoint = url
  let params = ''

  if (inputParams) {
    params = qs.stringify(inputParams)
  }

  if (params) {
    endpoint += '?' + params
  }

  try {
    const response = await client.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const json = response.data as T
    data = json
  } catch (err: any) {
    console.log(err)

    isError = true
    error = err.response?.data ?? null
  }

  return { data, isError, error }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})