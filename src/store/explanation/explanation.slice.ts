import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import sentencesInstance from '../../services/sentences.api'

interface ExplanationState {
  selectedSentence: string
  context: string
  analysisData: any
  isLoading: boolean
  isError: boolean
}

const initialState: ExplanationState = {
  selectedSentence: '',
  context: '',
  analysisData: null,
  isLoading: false,
  isError: false
}

export const fetchAnalysis = createAsyncThunk(
  'explanation/fetchAnalysis',
  async ({ suggested_sentence, context }: { suggested_sentence: string; context: string }, { rejectWithValue }) => {
    try {
      const response = await sentencesInstance.getExplanation({
        suggested_sentence,
        context
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const explanationSlice = createSlice({
  name: 'explanation',
  initialState,
  reducers: {
    setSelectedSentence: (state, action: PayloadAction<string>) => {
      state.selectedSentence = action.payload
    },
    setContext: (state, action: PayloadAction<string>) => {
      console.log('setContext', action.payload)
      state.context = action.payload
    },
    resetExplanationState: (state) => {
      Object.assign(state, initialState)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysis.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(fetchAnalysis.fulfilled, (state, action) => {
        state.isLoading = false
        state.analysisData = action.payload
      })
      .addCase(fetchAnalysis.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export const { setSelectedSentence, setContext, resetExplanationState } = explanationSlice.actions
export default explanationSlice.reducer
