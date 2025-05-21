import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditorLanguage, EditorState } from './types'

// initial state
const initialState: EditorState = {
  language: 'en'
}

// editorSlice
const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<EditorLanguage>) {
      console.log('action', action)
      state.language = action.payload
    }
  }
})

export const { setLanguage } = editorSlice.actions

export default editorSlice.reducer
