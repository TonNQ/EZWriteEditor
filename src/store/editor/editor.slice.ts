import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditorLanguage, EditorState } from './types'

// initial state
const initialState: EditorState = {
  language: 'en',
  title: '',
  description: '',
  isShowHistory: false
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
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setFileInformation: (state, action: PayloadAction<{ title: string; description: string }>) => {
      state.title = action.payload.title
      state.description = action.payload.description
    },
    setIsShowHistory: (state, action: PayloadAction<boolean>) => {
      state.isShowHistory = action.payload
    },
    resetEditorState(state) {
      Object.assign(state, initialState)
    }
  }
})

export const { setLanguage, setTitle, setDescription, setFileInformation, setIsShowHistory, resetEditorState } =
  editorSlice.actions

export default editorSlice.reducer
