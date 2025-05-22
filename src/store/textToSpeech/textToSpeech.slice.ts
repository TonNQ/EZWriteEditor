import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TextToSpeechState } from './types'

// initial state
const initialState: TextToSpeechState = {
  isOpenTextToSpeech: false
}

// textToSpeechSlice
const textToSpeechSlice = createSlice({
  name: 'textToSpeech',
  initialState,
  reducers: {
    setIsOpenTextToSpeech(state, action: PayloadAction<boolean>) {
      state.isOpenTextToSpeech = action.payload
    },
    resetTextToSpeechState(state) {
      Object.assign(state, initialState)
    }
  }
})

export const { setIsOpenTextToSpeech, resetTextToSpeechState } = textToSpeechSlice.actions
export default textToSpeechSlice.reducer
