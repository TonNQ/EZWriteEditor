import { HttpStatusCode } from 'axios'
import { ApiResponse } from '../types/common.type'
import { FeedbackBody } from '../types/feedback.type'
import http from '../utils/api'
import { Sentence } from '../types/sentence.type'

const vote = async (body: FeedbackBody, signal?: AbortSignal): Promise<ApiResponse<Sentence>> => {
  try {
    const response = await http.post<Sentence>({
      url: '/api/rating-document/',
      key: 'rating-sentence',
      body,
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Vote API error:', error)
    return error as ApiResponse<Sentence>
  }
}

const updateVote = async (body: FeedbackBody, signal?: AbortSignal): Promise<ApiResponse<Sentence>> => {
  try {
    const response = await http.put<Sentence>({
      url: '/api/update-rating/',
      key: 'update-rating',
      body,
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Update vote API error:', error)
    return error as ApiResponse<Sentence>
  }
}

const removeVote = async (params: Partial<FeedbackBody>, signal?: AbortSignal): Promise<ApiResponse<Sentence>> => {
  try {
    const response = await http.delete<Sentence>({
      url: '/api/delete-rating/',
      key: 'remove-rating',
      params,
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Update vote API error:', error)
    return error as ApiResponse<Sentence>
  }
}

const feedbackInstance = {
  vote,
  updateVote,
  removeVote
}

export default feedbackInstance
