import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { ERROR_MESSAGE } from '../constants/message'
import { ApiResponse, AuthTokens, RefreshTokenResponse } from '../types/common.type'

// Constants
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const handleApiError = (error: unknown): ApiResponse<any> => {
  if (error instanceof Error && error.name === 'AbortError') {
    return {
      data: [],
      errors: { request: 'Request aborted' },
      status: 499
    }
  }

  const axiosError = error as AxiosError<ApiResponse<any>>
  if (axiosError.response?.data?.errors) {
    return {
      data: [],
      errors: axiosError.response.data.errors,
      status: axiosError.response.status || 500
    }
  }

  return {
    data: [],
    errors: { request: error instanceof Error ? error.message : 'Unknown error' },
    status: 500
  }
}

interface GetConfig extends AxiosRequestConfig {
  standardResponse?: boolean
  baseURL?: string
  skipNgrokWarning?: boolean
}

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private isRefreshing: boolean
  private refreshSubscribers: ((token: string) => void)[]
  private abortControllers: Map<string, AbortController>

  constructor() {
    this.accessToken = localStorage.getItem('access_token') || ''
    this.refreshToken = localStorage.getItem('refresh_token') || ''
    this.isRefreshing = false
    this.refreshSubscribers = []
    this.abortControllers = new Map()

    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response
      },
      async (error: AxiosError<ApiResponse>) => {
        const originalRequest = error.config
        console.log('error', error)
        // Handle token expiration
        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          error.response?.data?.message === ERROR_MESSAGE.TOKEN_EXPIRED_MESSAGE
        ) {
          if (!this.isRefreshing) {
            this.isRefreshing = true

            try {
              const tokens = await this.refreshAccessToken()
              this.onRefreshSuccess(tokens)

              // Retry the original failed request
              if (originalRequest) {
                originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
                return this.instance(originalRequest)
              }
            } catch (refreshError) {
              this.onRefreshFailure()
              return Promise.reject(refreshError)
            } finally {
              this.isRefreshing = false
            }
          } else {
            // If refresh is already happening, queue the failed request
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                if (originalRequest) {
                  originalRequest.headers.Authorization = `Bearer ${token}`
                  resolve(this.instance(originalRequest))
                }
              })
            })
          }
        }

        // Handle refresh token expiration
        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          error.response?.data?.message === ERROR_MESSAGE.REFRESH_TOKEN_EXPIRED_MESSAGE
        ) {
          this.handleLogout()
        }

        // Handle other errors
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // TODO: handle error message
          // const errorMessage = error.response?.data?.message || error.message
          // toast.error(errorMessage)
        }

        return Promise.reject(handleApiError(error))
      }
    )
  }

  private async refreshAccessToken(): Promise<AuthTokens> {
    try {
      const response = await axios.post<ApiResponse<RefreshTokenResponse>>(
        `${BASE_URL}/auth/api/token/refresh/`,
        {
          refresh: this.refreshToken
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const newRefreshToken = response.data.data.refresh || this.refreshToken

      return {
        accessToken: response.data.data.access,
        refreshToken: newRefreshToken
      }
    } catch (error) {
      console.log('Refresh token API error:', error)
      throw error
    }
  }

  private onRefreshSuccess(tokens: AuthTokens) {
    this.accessToken = tokens.accessToken
    this.refreshToken = tokens.refreshToken
    localStorage.setItem('access_token', tokens.accessToken)
    localStorage.setItem('refresh_token', tokens.refreshToken)

    // Retry all queued requests
    this.refreshSubscribers.forEach((callback) => callback(tokens.accessToken))
    this.refreshSubscribers = []
  }

  private onRefreshFailure() {
    this.handleLogout()
  }

  private handleLogout() {
    this.accessToken = ''
    this.refreshToken = ''
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    // Redirect to login page or show login modal
    // window.location.href = '/login'
  }

  // Cancel a specific request by its key
  cancelRequest(key: string) {
    const controller = this.abortControllers.get(key)
    if (controller) {
      controller.abort()
      this.abortControllers.delete(key)
    }
  }

  // Cancel all pending requests
  cancelAllRequests() {
    this.abortControllers.forEach((controller) => controller.abort())
    this.abortControllers.clear()
  }

  // Helper to create request config with abort controller
  private createRequestConfig(key: string, config?: AxiosRequestConfig): AxiosRequestConfig {
    // Cancel previous request with the same key if it exists
    this.cancelRequest(key)

    // Create new abort controller
    const controller = new AbortController()
    this.abortControllers.set(key, controller)

    return {
      ...config,
      signal: controller.signal
    }
  }

  // Helper to convert object to query string
  private objectToQueryString(params: Record<string, any>): string {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }

  // Helper to build URL with query params
  private buildUrl(url: string, params?: Record<string, any>): string {
    if (!params) return url
    const queryString = this.objectToQueryString(params)
    return `${url}${url.includes('?') ? '&' : '?'}${queryString}`
  }

  public setTokens(token: string) {
    this.accessToken = token
    localStorage.setItem('access_token', token)
  }

  public setAuthTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  async get<T>({
    url,
    key,
    params,
    standardResponse = true,
    ...config
  }: { url: string; key: string; params?: Record<string, any> } & GetConfig): Promise<ApiResponse<T> | T> {
    const fullUrl = this.buildUrl(url, params)
    const axiosInstance = this.getAxiosInstance(config)
    const response = await axiosInstance.get<T>(fullUrl, this.createRequestConfig(key, config))

    if (standardResponse) {
      return response.data as ApiResponse<T>
    }
    return response.data as T
  }

  async post<T>({
    url,
    key,
    body,
    params,
    ...config
  }: { url: string; key: string; body?: any; params?: Record<string, any> } & GetConfig): Promise<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url, params)
    const axiosInstance = this.getAxiosInstance(config)
    const response = await axiosInstance.post<ApiResponse<T>>(fullUrl, body, this.createRequestConfig(key, config))
    return response.data
  }

  async put<T>({
    url,
    key,
    body,
    params,
    ...config
  }: { url: string; key: string; body?: any; params?: Record<string, any> } & GetConfig): Promise<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url, params)
    const axiosInstance = this.getAxiosInstance(config)
    const response = await axiosInstance.put<ApiResponse<T>>(fullUrl, body, this.createRequestConfig(key, config))
    return response.data
  }

  async patch<T>({
    url,
    key,
    body,
    params,
    ...config
  }: { url: string; key: string; body?: any; params?: Record<string, any> } & GetConfig): Promise<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url, params)
    const axiosInstance = this.getAxiosInstance(config)
    const response = await axiosInstance.patch<ApiResponse<T>>(fullUrl, body, this.createRequestConfig(key, config))
    return response.data
  }

  async delete<T>({
    url,
    key,
    params,
    ...config
  }: { url: string; key: string; params?: Record<string, any> } & GetConfig): Promise<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url, params)
    const axiosInstance = this.getAxiosInstance(config)
    const response = await axiosInstance.delete<ApiResponse<T>>(fullUrl, this.createRequestConfig(key, config))
    return response.data
  }

  // Helper method to create axios instance with custom baseURL
  private createInstanceWithBaseURL(baseURL?: string, skipNgrokWarning?: boolean): AxiosInstance {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (skipNgrokWarning) {
      headers['ngrok-skip-browser-warning'] = 'true'
    }

    if (!baseURL) return this.instance

    return axios.create({
      baseURL,
      timeout: 60000,
      headers
    })
  }

  // Helper method to get the appropriate axios instance
  private getAxiosInstance(config?: GetConfig): AxiosInstance {
    if (config?.baseURL || config?.skipNgrokWarning) {
      const customInstance = this.createInstanceWithBaseURL(config.baseURL, config.skipNgrokWarning)
      // Add request interceptor for custom instance
      customInstance.interceptors.request.use(
        (config) => {
          if (this.accessToken) {
            config.headers.Authorization = `Bearer ${this.accessToken}`
          }
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )
      return customInstance
    }
    return this.instance
  }
}

// Create and export a single instance
const http = new Http()
export default http
