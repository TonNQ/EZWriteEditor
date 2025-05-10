import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import suggestionReducer from './suggestion/suggestion.slice'
import translationReducer from './translation/translation.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    suggestion: suggestionReducer,
    translation: translationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
