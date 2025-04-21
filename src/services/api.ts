const BASE_URL = 'http://127.0.0.1:8000'

interface ApiResponse<T> {
  data: T
  error?: string
}

export const searchApi = async (query: string, index: string = 'ezwrite_demo_21042025', signal?: AbortSignal): Promise<ApiResponse<string[]>> => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/?index=${index}&q=${encodeURIComponent(query)}`, {
      signal
    })
    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`)
    }
    const data = await response.json() 
    console.log('data', data)

    return { data: data.results.map((s: any) => s.content) ?? [] } 
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { data: [], error: 'Request aborted' }
    }
    console.error('Search API error:', error)
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const suggestApi = async (userInput: string, signal?: AbortSignal): Promise<ApiResponse<string[]>> => {
  try {
    const response = await fetch(`${BASE_URL}/api/suggest/?user_input=${encodeURIComponent(userInput)}`, {
      signal
    })
    if (!response.ok) {
      throw new Error(`Suggest API error: ${response.status}`)
    }
    const data = await response.json()
    console.log('data', data)

    return { data: data.result }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { data: [], error: 'Request aborted' }
    }
    console.error('Suggest API error:', error)
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 