import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sentence } from '../../types/sentence.type'
import { SuggestionState } from './types'

// initial state
const initialState: SuggestionState = {
  isOpenSuggestion: false,
  searchResults: [],
  suggestResults: [],
  isLoadingSearch: false,
  isLoadingSuggest: false
}

// suggestionSlice
const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {
    setIsOpenSuggestion(state, action: PayloadAction<boolean>) {
      state.isOpenSuggestion = action.payload
    },
    setSearchResults(state, action: PayloadAction<{ results: Sentence[]; isLoading?: boolean }>) {
      state.searchResults = action.payload.results.map((result) => ({
        ...result,
        isSearchResult: true
      }))
      if (typeof action.payload.isLoading === 'boolean') {
        state.isLoadingSearch = action.payload.isLoading
      }
    },
    setSuggestResults(state, action: PayloadAction<{ results: string[]; isLoading?: boolean }>) {
      state.suggestResults = action.payload.results.map((result) => ({
        sentence_id: '',
        content: result,
        isVoted: false,
        userRating: 0,
        rating: 0,
        numOfRate: 0,
        isUserAdded: false,
        isSearchResult: false
      }))
      if (typeof action.payload.isLoading === 'boolean') {
        state.isLoadingSuggest = action.payload.isLoading
      }
    },
    setIsLoadingSearch(state, action: PayloadAction<boolean>) {
      state.isLoadingSearch = action.payload
    },
    setIsLoadingSuggest(state, action: PayloadAction<boolean>) {
      state.isLoadingSuggest = action.payload
    },
    updateSentenceInSearchResults(state, action: PayloadAction<Sentence>) {
      const index = state.searchResults.findIndex((s) => s.sentence_id === action.payload.sentence_id)
      if (index !== -1) {
        state.searchResults[index] = action.payload
      }
    },
    updateSentenceInSuggestResults(state, action: PayloadAction<Partial<Sentence>>) {
      const index = state.suggestResults.findIndex((s) => s.sentence_id === action.payload.sentence_id || s.content === action.payload.content)
      if (index !== -1) {
        state.suggestResults[index] = {
          ...state.suggestResults[index],
          ...action.payload
        }
      }
    },
    resetSuggestionState(state) {
      Object.assign(state, initialState)
    }
  }
})

export const {
  setIsOpenSuggestion,
  setSearchResults,
  setSuggestResults,
  setIsLoadingSearch,
  setIsLoadingSuggest,
  updateSentenceInSearchResults,
  updateSentenceInSuggestResults,
  resetSuggestionState
} = suggestionSlice.actions

export default suggestionSlice.reducer
