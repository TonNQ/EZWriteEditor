import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sentence } from '../../types/sentence.type'
import { SuggestionState } from './types'

// initial state
const initialState: SuggestionState = {
  isOpenSuggestion: false,
  openAISuggestResults: [],
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
    setOpenAISuggestResults(state, action: PayloadAction<string[]>) {
      state.openAISuggestResults = action.payload
    },
    setSearchResults(state, action: PayloadAction<{ results: Sentence[]; isLoading?: boolean }>) {
      state.searchResults = action.payload.results
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
    updateSentenceInSearchResults(state, action: PayloadAction<Partial<Sentence>>) {
      state.searchResults = state.searchResults.map((sentence) =>
        sentence.sentence_id === action.payload.sentence_id ? { ...sentence, ...action.payload } : sentence
      )
    },
    updateSentenceInSuggestResults(state, action: PayloadAction<Partial<Sentence>>) {
      state.suggestResults = state.suggestResults.map((sentence) =>
        sentence.sentence_id === action.payload.sentence_id ? { ...sentence, ...action.payload } : sentence
      )
    },
    resetSuggestionState(state) {
      state.openAISuggestResults = []
      state.searchResults = []
      state.suggestResults = []
      state.isLoadingSearch = false
      state.isLoadingSuggest = false
    }
  }
})

export const {
  setIsOpenSuggestion,
  setOpenAISuggestResults,
  setSearchResults,
  setSuggestResults,
  setIsLoadingSearch,
  setIsLoadingSuggest,
  updateSentenceInSearchResults,
  updateSentenceInSuggestResults,
  resetSuggestionState
} = suggestionSlice.actions

export default suggestionSlice.reducer
