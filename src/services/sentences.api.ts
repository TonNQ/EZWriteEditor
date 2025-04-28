import { HttpStatusCode } from 'axios'
import { ELASTIC_SEARCH_INDEX } from '../constants/common'
import { ApiResponse } from '../types/common.type'
import http from '../utils/api'

interface SearchParams {
  index?: string
  q: string
}

interface SuggestParams {
  user_input: string
}

const searchApi = async (params: SearchParams, signal?: AbortSignal): Promise<ApiResponse<string[]>> => {
  try {
    const response = await http.get<{ results: string[] }>({
      url: '/api/search',
      key: 'search',
      params: {
        index: params.index || ELASTIC_SEARCH_INDEX,
        q: params.q
      },
      signal
    })
    console.log('response', response)

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data.results ?? []
    }
  } catch (error) {
    console.error('Search API error:', error)
    return error as ApiResponse<string[]>
  }
}

const suggestApi = async (params: SuggestParams, signal?: AbortSignal): Promise<ApiResponse<string[]>> => {
  try {
    const response = await http.get<{ results: string[] }>({
      url: '/api/suggest',
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
