export interface Sentence {
  sentence_id: string
  content: string
  isVoted: boolean
  userRating: number
  rating: number
  numOfRate: number
  isUserAdded: boolean
  isSearchResult: boolean
}

export interface AddSentenceResponse {
  documentId: string
}