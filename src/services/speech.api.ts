import { ApiResponse } from '../types/common.type'
import http from '../utils/api'

interface TextToSpeechParams {
  text: string
  language?: string
  voice_name?: string
}

const textToSpeechApi = async (params: TextToSpeechParams, signal?: AbortSignal): Promise<Blob> => {
  try {
    const response = (await http.instance.get<Blob>('/api/text-to-speech/', {
      params,
      responseType: 'blob',
      signal
    })) as ApiResponse<Blob>

    return response.data
  } catch (error) {
    console.error('Text to speech API error:', error)
    throw error
  }
}

const speechInstance = {
  textToSpeech: textToSpeechApi
}

export default speechInstance
