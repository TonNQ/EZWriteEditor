import { HttpStatusCode } from 'axios'
import { ELASTIC_SEARCH_INDEX } from '../constants/common'
import {
  ContentApiResponse,
  GrammarApiResponse,
  ParaphraseApiResponse,
  VocabularyApiResponse
} from '../types/analysis.type'
import { ApiResponse } from '../types/common.type'
import { AddSentenceResponse, Sentence } from '../types/sentence.type'
import http from '../utils/api'

interface SearchParams {
  index?: string
  q: string
  lang?: string
}

interface SuggestParams {
  user_input: string
  lang?: string
}

interface OpenAISuggestParams extends SuggestParams {
  model?: 'gpt-3.5-turbo' | 'gpt-4o' | 'gpt-4o-mini'
  num_suggestions?: number
}

interface ExplainParams {
  suggested_sentence: string
  context: string
  language?: 'vi' | 'en'
}

const SUGGEST_BASE_URL = import.meta.env.VITE_API_SUGGEST_URL || import.meta.env.VITE_API_URL

const searchApi = async (params: SearchParams, signal?: AbortSignal): Promise<ApiResponse<Sentence[]>> => {
  try {
    const response = (await http.get<{ results: Sentence[] }>({
      url: '/api/search/',
      key: 'search',
      params,
      signal
    })) as ApiResponse<{ results: Sentence[] }>
    console.log('response', response)

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data.results ?? []
    }
  } catch (error) {
    console.error('Search API error:', error)
    return error as ApiResponse<Sentence[]>
  }
}

const suggestApi = async (params: SuggestParams, signal?: AbortSignal): Promise<ApiResponse<string[]>> => {
  try {
    const response = (await http.get<{ results: string[] }>({
      url: '/api/suggest/',
      key: 'suggest',
      params,
      signal,
      baseURL: SUGGEST_BASE_URL,
      skipNgrokWarning: true
    })) as ApiResponse<{ results: string[] }>
    console.log('data', response.data)

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data.results ?? []
    }
  } catch (error) {
    console.error('Suggest API error:', error)
    return error as ApiResponse<string[]>
  }
}

const addSentence = async (content: string, signal?: AbortSignal): Promise<ApiResponse<AddSentenceResponse>> => {
  try {
    const response = await http.post<AddSentenceResponse>({
      url: '/api/add-document/',
      key: 'add-document',
      body: {
        index_name: ELASTIC_SEARCH_INDEX,
        content
      },
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Add sentence API error:', error)
    return error as ApiResponse<AddSentenceResponse>
  }
}

const getOpenAISuggestion = async (
  params: OpenAISuggestParams,
  signal?: AbortSignal
): Promise<ApiResponse<string[]>> => {
  try {
    const response = (await http.get<{ results: string[] }>({
      url: '/api/openai-suggest/',
      key: 'openai-suggest',
      params,
      signal
    })) as ApiResponse<{ results: string[] }>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data.results ?? []
    }
  } catch (error) {
    console.error('Get openai suggestion API error:', error)
    return error as ApiResponse<string[]>
  }
}

const explainVocabulary = async (
  params: ExplainParams,
  signal?: AbortSignal
): Promise<ApiResponse<VocabularyApiResponse>> => {
  try {
    const response = (await http.get<VocabularyApiResponse>({
      url: '/api/explain-vocabulary/',
      key: 'explain-vocabulary',
      params,
      signal
    })) as ApiResponse<VocabularyApiResponse>
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? ({} as VocabularyApiResponse)
    }
  } catch (error) {
    console.error('Explain vocabulary API error:', error)
    return error as ApiResponse<VocabularyApiResponse>
  }
}

const explainGrammar = async (
  params: ExplainParams,
  signal?: AbortSignal
): Promise<ApiResponse<GrammarApiResponse>> => {
  try {
    const response = (await http.get<GrammarApiResponse>({
      url: '/api/explain-grammar/',
      key: 'explain-grammar',
      params,
      signal
    })) as ApiResponse<GrammarApiResponse>
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? ({} as GrammarApiResponse)
    }
  } catch (error) {
    console.error('Explain grammar API error:', error)
    return error as ApiResponse<GrammarApiResponse>
  }
}

const explainContent = async (
  params: ExplainParams,
  signal?: AbortSignal
): Promise<ApiResponse<ContentApiResponse>> => {
  try {
    const response = (await http.get<ContentApiResponse>({
      url: '/api/explain-content/',
      key: 'explain-content',
      params,
      signal
    })) as ApiResponse<ContentApiResponse>
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? ({} as ContentApiResponse)
    }
  } catch (error) {
    console.error('Explain content API error:', error)
    return error as ApiResponse<ContentApiResponse>
  }
}

const explainParaphrase = async (
  params: ExplainParams,
  signal?: AbortSignal
): Promise<ApiResponse<ParaphraseApiResponse>> => {
  try {
    const response = (await http.get<ParaphraseApiResponse>({
      url: '/api/explain-paraphrase/',
      key: 'explain-paraphrase',
      params,
      signal
    })) as ApiResponse<ParaphraseApiResponse>
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? ({} as ParaphraseApiResponse)
    }
  } catch (error) {
    console.error('Explain paraphrase API error:', error)
    return error as ApiResponse<ParaphraseApiResponse>
  }
}

const sentencesInstance = {
  search: searchApi,
  suggest: suggestApi,
  addSentence,
  getOpenAISuggestion,
  explainVocabulary,
  explainGrammar,
  explainContent,
  explainParaphrase
}

export default sentencesInstance
