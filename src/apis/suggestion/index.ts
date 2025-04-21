import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from '../../config/queryClient'
import { ApiError } from '../../types/client.type'
import { STALE_TIME } from '../../constants/common'

const SUGGESTION_URL = 'http://127.0.0.1:8000/api/suggest'

export const getSuggestions = (userInput: string, options?: UseQueryOptions<string[], ApiError>) => {
  return useQuery<string[], ApiError>({
    queryKey: ['getSuggestions', userInput],
    queryFn: async ({ signal }) => {
      const response = await queryFetch<string[]>({
        url: `${SUGGESTION_URL}/?user_input=${encodeURIComponent(userInput)}`,
        signal
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}