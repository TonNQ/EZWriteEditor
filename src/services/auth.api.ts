import { HttpStatusCode } from 'axios'
import { ApiResponse } from '../types/common.type'
import { User } from '../types/user.type'
import http from '../utils/api'

export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface AuthResponse {
  access: string
  user: User
}

export interface LogoutResponse {
  success: boolean
}

export const loginApi = async (body: LoginBody, signal?: AbortSignal): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await http.post<AuthResponse>({
      url: '/auth/api/login/',
      key: 'login',
      body,
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data
    }
  } catch (error) {
    console.error('Login API error:', error)
    return error as ApiResponse<AuthResponse>
  }
}

export const registerApi = async (body: RegisterBody, signal?: AbortSignal): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await http.post<AuthResponse>({
      url: '/auth/api/register/',
      key: 'register',
      body,
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data
    }
  } catch (error) {
    console.error('Register API error:', error)
    return error as ApiResponse<AuthResponse>
  }
}

export const logoutApi = async (signal?: AbortSignal): Promise<ApiResponse<LogoutResponse>> => {
  try {
    const response = await http.post<LogoutResponse>({
      url: '/auth/api/logout/',
      key: 'logout',
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data
    }
  } catch (error) {
    console.error('Logout API error:', error)
    return error as ApiResponse<LogoutResponse>
  }
}

const authInstance = {
  login: loginApi,
  register: registerApi,
  logout: logoutApi
}

export default authInstance
