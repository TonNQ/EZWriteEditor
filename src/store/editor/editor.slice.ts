import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditorLanguage, EditorState } from './types'

// initial state
const initialState: EditorState = {
  language: 'en',
  title: 'Untitled'
}

// editorSlice
const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<EditorLanguage>) => {
      state.language = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    resetEditorState(state) {
      Object.assign(state, initialState)
    }
  }
})

export const { setLanguage, setTitle, resetEditorState } = editorSlice.actions

export default editorSlice.reducer
