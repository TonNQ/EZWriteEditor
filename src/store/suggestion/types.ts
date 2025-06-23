import { Sentence } from '../../types/sentence.type'

export interface SuggestionState {
  openAISuggestResults: string[]
  searchResults: Sentence[]
  suggestResults: Sentence[]
  isLoadingSearch: boolean
  isLoadingSuggest: boolean
}
