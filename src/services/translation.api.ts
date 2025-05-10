// const translateText = async ({ text, from, to }: { text: string; from: string; to: string }) => {
//   try {
//     if (!text.trim()) {
//       return { text: '', from: { language: { iso: '' } } }
//     }

import { HttpStatusCode } from "axios"
import { ApiResponse } from "../types/common.type"
import { TranslationInfo } from "../types/translation.type"
import http from "../utils/api"

//     // const result = await translate(text, { from, to })
//     const url = `https://cors-anywhere.herokuapp.com/https://lingva.thedaviddelta.com/api/v1/${from}/${to}/${text}`;

//     const res = await fetch(url, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' }
//     })

//     const result = await res.json()
//     return result.translation
//   } catch (error) {
//     console.error('Translation error:', error)
//     throw new Error('Failed to translate text')
//   }
// }

interface TranslateParams {
  text: string 
  source_lang: string 
  target_lang: string
}

const translateApi = async (params: TranslateParams, signal?: AbortSignal): Promise<ApiResponse<TranslationInfo>> => {
  try {
    const response = await http.get<TranslationInfo>({
      url: '/api/translate/',
      key: 'translate',
      params,
      signal
    })
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
