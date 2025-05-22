import { HttpStatusCode } from "axios"
import { ApiResponse } from "../types/common.type"
import { TranslationInfo } from "../types/translation.type"
import http from "../utils/api"

interface TranslateParams {
  text: string 
  source_lang: string 
  target_lang: string
}

const translateApi = async (params: TranslateParams, signal?: AbortSignal): Promise<ApiResponse<TranslationInfo>> => {
  try {
    const response = (await http.get<TranslationInfo>({
      url: '/api/translate/',
      key: 'translate',
      params,
      signal
    })) as ApiResponse<TranslationInfo>
    console.log('response', response)

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Translate API error:', error)
    return error as ApiResponse<TranslationInfo>
  }
}

const translateInstance = {
  translate: translateApi
}

export default translateInstance
