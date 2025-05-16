import { Sentence } from '../../types/sentence.type'

export interface SuggestionState {
  isOpenSuggestion: boolean
  searchResults: Sentence[]
  suggestResults: string[]
  isLoadingSearch: boolean
  isLoadingSuggest: boolean
}
