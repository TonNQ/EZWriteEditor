import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import editorReducer from './editor/editor.slice'
import markdownFilesReducer from './markdownFiles/markdownFiles.slice'
import suggestionReducer from './suggestion/suggestion.slice'
import translationReducer from './translation/translation.slice'

const rootReducer = {
  auth: authReducer,
  suggestion: suggestionReducer,
  translation: translationReducer,
  editor: editorReducer,
  markdownFiles: markdownFilesReducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
