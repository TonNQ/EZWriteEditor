import { HttpStatusCode } from 'axios'
import { ApiResponse } from '../types/common.type'
import { Sentence } from '../types/sentence.type'
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

const searchApi = async (params: SearchParams, signal?: AbortSignal): Promise<ApiResponse<Sentence[]>> => {
  try {
    const response = await http.get<{ results: Sentence[] }>({
      url: '/api/search/',
      key: 'search',
      params,
      signal
    })
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
    const response = await http.get<{ results: string[] }>({
      url: '/api/suggest/',
      key: 'suggest',
      params,
      signal
    })
    console.log('data', response.data)

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data.results
    }
  } catch (error) {
    console.error('Suggest API error:', error)
    return error as ApiResponse<string[]>
  }
}

const sentencesInstance = {
  search: searchApi,
  suggest: suggestApi
}

export default sentencesInstance
