export interface ApiResponse<T = any> {
  status?: number
  message?: string
  data: T
  errors?: {
    [key: string]: string
  }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  access: string
  refresh?: string
}
