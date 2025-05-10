import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TranslationState } from './types'

// initial state
const initialState: TranslationState = {
  isOpenTranslation: false
}

// translationSlice
const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setIsOpenTranslation(state, action: PayloadAction<boolean>) {
      state.isOpenTranslation = action.payload
    }
  }
})

export const { setIsOpenTranslation } = translationSlice.actions
export default translationSlice.reducer
