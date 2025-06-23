import { HttpStatusCode } from 'axios'
import { ELASTIC_SEARCH_INDEX } from '../constants/common'
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
  original_sentence: string
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

const getOpenAISuggestion = async (params: OpenAISuggestParams, signal?: AbortSignal): Promise<ApiResponse<string[]>> => {
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

const getExplanation = async (params: ExplainParams, signal?: AbortSignal): Promise<ApiResponse<any>> => {
  try {
    const response = (await http.get<any>({
      url: '/api/explain-suggestion/',
      key: 'explain',
      params,
      signal,
    })) as ApiResponse<any>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? ''
    }
  } catch (error) {
    console.error('Get explanation API error:', error)
    return error as ApiResponse<any>
  }
}

const sentencesInstance = {
  search: searchApi,
  suggest: suggestApi,
  addSentence,
  getOpenAISuggestion,
  getExplanation,
}

export default sentencesInstance
