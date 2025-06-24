import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import editorReducer from './editor/editor.slice'
import explanationReducer from './explanation/explanation.slice'
import markdownFilesReducer from './markdownFiles/markdownFiles.slice'
import suggestionReducer from './suggestion/suggestion.slice'

const rootReducer = {
  auth: authReducer,
  suggestion: suggestionReducer,
  editor: editorReducer,
  markdownFiles: markdownFilesReducer,
  explanation: explanationReducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
