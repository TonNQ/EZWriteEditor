import { Sentence } from '../../types/sentence.type'

export interface SuggestionState {
  isOpenSuggestion: boolean
  searchResults: Sentence[]
  suggestResults: Sentence[]
  isLoadingSearch: boolean
  isLoadingSuggest: boolean
}
