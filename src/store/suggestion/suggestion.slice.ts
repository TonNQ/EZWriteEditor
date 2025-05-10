import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SuggestionState } from './types'

// initial state
const initialState: SuggestionState = {
  isOpenSuggestion: false
}

// suggestionSlice
const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {
    setIsOpenSuggestion(state, action: PayloadAction<boolean>) {
      state.isOpenSuggestion = action.payload
    }
  }
})

export const { setIsOpenSuggestion } = suggestionSlice.actions
export default suggestionSlice.reducer
