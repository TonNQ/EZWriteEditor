import { HttpStatusCode } from 'axios'
import { ApiResponse } from '../types/common.type'
import { AddSentenceResponse, Sentence } from '../types/sentence.type'
import http from '../utils/api'
import { ELASTIC_SEARCH_INDEX } from '../constants/common'

interface SearchParams {
  index?: string
  q: string
  lang?: string
}

interface SuggestParams {
  user_input: string
  lang?: string
}

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
      signal
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

const sentencesInstance = {
  search: searchApi,
  suggest: suggestApi,
  addSentence
}

export default sentencesInstance
