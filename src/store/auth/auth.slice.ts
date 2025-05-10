import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HttpStatusCode } from 'axios'
import authInstance, { AuthResponse, LoginBody, RegisterBody } from '../../services/auth.api'
import { ApiResponse } from '../../types/common.type'
import http from '../../utils/api'
import { AuthState } from './types'

// initial state
const initialState: AuthState = {
  isAuthenticated: false,
  authInfoLoaded: false,

  registerInProgress: false,
  registerError: null,

  loginInProgress: false,
  loginError: null,

  logoutInProgress: false,
  logoutError: null
}

// Thunk register
export const registerThunk = createAsyncThunk<ApiResponse<AuthResponse>, RegisterBody>(
  'auth/register',
  async (body, { rejectWithValue }) => {
    try {
      const response = await authInstance.register(body)
      // Check for successful response (201 Created)
      if (response.status === HttpStatusCode.Created && response.data) {
        // Save access token to localStorage
        if (response.data.access) {
          localStorage.setItem('access_token', response.data.access)
        }
        return response
      }

      return rejectWithValue(response.errors || 'Registration failed')
    } catch (error: any) {
      // Handle network errors or other exceptions
      if (error.response?.data?.errors) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue('Something went wrong')
    }
  }
)

// Thunk login
export const loginThunk = createAsyncThunk<ApiResponse<AuthResponse>, LoginBody>(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      const response = await authInstance.login(body)
      // Check for successful response (200 OK)
      if (response.status === HttpStatusCode.Ok && response.data) {
        const accessToken = response.data.access
        // Save access token to localStorage
        if (accessToken) {
          localStorage.setItem('access_token', accessToken)
          http.setTokens(accessToken)
        }
        const user = response.data.user 
        if (user) {
          localStorage.setItem('profile', JSON.stringify(user))
        }
        return response
      }

      return rejectWithValue(response.errors || 'Login failed')
    } catch (error: any) {
      // Handle network errors or other exceptions
      if (error.response?.data?.errors) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue('Something went wrong')
    }
  }
)

// Thunk logout
export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await authInstance.logout()
    if (response.status === HttpStatusCode.Ok) {
      localStorage.removeItem('access_token')
      return response
    }
    return rejectWithValue(response.errors || 'Logout failed')
  } catch (error: any) {
    if (error.response?.data?.errors) {
      return rejectWithValue(error.response.data)
    }
    return rejectWithValue('Something went wrong')
  }
})

// authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload
    },
    resetAuthState(state) {
      state.registerError = null
      state.registerInProgress = false
      state.loginError = null
      state.loginInProgress = false
    },
    checkAuthOnLoad(state) {
      const accessToken = localStorage.getItem('access_token')
      state.isAuthenticated = !!accessToken
      state.authInfoLoaded = true
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerThunk.pending, (state) => {
        state.registerInProgress = true
        state.registerError = null
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.registerInProgress = false
        state.isAuthenticated = true
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.registerInProgress = false
        // Store the entire error response for field-specific errors
        state.registerError = action.payload as any
      })
      // Login cases
      .addCase(loginThunk.pending, (state) => {
        state.loginInProgress = true
        state.loginError = null
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loginInProgress = false
        state.isAuthenticated = true
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginInProgress = false
        // Store the entire error response for field-specific errors
        state.loginError = action.payload as any
      })
      // Logout cases
      .addCase(logoutThunk.pending, (state) => {
        state.logoutInProgress = true
        state.logoutError = null
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.logoutInProgress = false
        state.isAuthenticated = false
        state.logoutError = null
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.logoutInProgress = false
        state.logoutError = action.payload as string
      })
  }
})

export const { setIsAuthenticated, resetAuthState, checkAuthOnLoad } = authSlice.actions
export default authSlice.reducer
