export interface AuthState {
  isAuthenticated: boolean
  authInfoLoaded: boolean
  registerInProgress: boolean
  registerError: string | Record<string, string[]> | { errors: Record<string, string[]> } | null
  loginInProgress: boolean
  loginError: string | null
}
