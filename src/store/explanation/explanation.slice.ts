import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import sentencesInstance from '../../services/sentences.api'
import { ContentAnalysis, GrammarAnalysis, ParaphraseAnalysis, VocabularyAnalysis } from '../../types/analysis.type'

interface ExplanationState {
  selectedSentence: string
  context: string
  analysisData: {
    vocabulary: VocabularyAnalysis | null
    grammar: GrammarAnalysis | null
    content: ContentAnalysis | null
    paraphrase: ParaphraseAnalysis | null
  } | null
  isLoading: boolean
  isError: boolean
}

const initialState: ExplanationState = {
  selectedSentence: '',
  context: '',
  analysisData: {
    vocabulary: null,
    grammar: null,
    content: null,
    paraphrase: null
  },
  isLoading: false,
  isError: false
}

export const fetchVocabulary = createAsyncThunk(
  'explanation/fetchVocabulary',
  async ({ suggested_sentence, context }: { suggested_sentence: string; context: string }, { rejectWithValue }) => {
    try {
      const res = await sentencesInstance.explainVocabulary({ suggested_sentence, context, language: 'vi' })
      return res.data?.analysis?.vi || null
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchGrammar = createAsyncThunk(
  'explanation/fetchGrammar',
  async ({ suggested_sentence, context }: { suggested_sentence: string; context: string }, { rejectWithValue }) => {
    try {
      const res = await sentencesInstance.explainGrammar({ suggested_sentence, context, language: 'vi' })
      return res.data?.analysis?.vi || null
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchContent = createAsyncThunk(
  'explanation/fetchContent',
  async ({ suggested_sentence, context }: { suggested_sentence: string; context: string }, { rejectWithValue }) => {
    try {
      const res = await sentencesInstance.explainContent({ suggested_sentence, context, language: 'vi' })
      return res.data?.analysis?.vi || null
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchParaphrase = createAsyncThunk(
  'explanation/fetchParaphrase',
  async ({ suggested_sentence, context }: { suggested_sentence: string; context: string }, { rejectWithValue }) => {
    try {
      const res = await sentencesInstance.explainParaphrase({ suggested_sentence, context, language: 'vi' })
      return res.data?.analysis?.vi || null
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
      state.context = action.payload
    },
    resetExplanationState: (state) => {
      Object.assign(state, initialState)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVocabulary.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(fetchVocabulary.fulfilled, (state, action) => {
        state.isLoading = false
        if (!state.analysisData)
          state.analysisData = { vocabulary: null, grammar: null, content: null, paraphrase: null }
        state.analysisData.vocabulary = action.payload
      })
      .addCase(fetchGrammar.fulfilled, (state, action) => {
        state.isLoading = false
        if (!state.analysisData)
          state.analysisData = { vocabulary: null, grammar: null, content: null, paraphrase: null }
        state.analysisData.grammar = action.payload
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false
        if (!state.analysisData)
          state.analysisData = { vocabulary: null, grammar: null, content: null, paraphrase: null }
        state.analysisData.content = action.payload
      })
      .addCase(fetchParaphrase.fulfilled, (state, action) => {
        state.isLoading = false
        if (!state.analysisData)
          state.analysisData = { vocabulary: null, grammar: null, content: null, paraphrase: null }
        state.analysisData.paraphrase = action.payload
      })
      .addCase(fetchVocabulary.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(fetchGrammar.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(fetchContent.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(fetchParaphrase.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export const { setSelectedSentence, setContext, resetExplanationState } = explanationSlice.actions
export default explanationSlice.reducer
