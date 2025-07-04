import { Editor } from '@tiptap/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ELASTIC_SEARCH_INDEX } from '../../constants/common'
import useDebounce from '../../hooks/useDebounce'
import sentencesInstance from '../../services/sentences.api'
import { RootState } from '../../store'
import { setContext } from '../../store/explanation/explanation.slice'
import {
  setIsLoadingSearch as setStoreIsLoadingSearch,
  setIsLoadingSuggest as setStoreIsLoadingSuggest,
  setOpenAISuggestResults as setStoreOpenAISuggestResults,
  setSearchResults as setStoreSearchResults,
  setSuggestResults as setStoreSuggestResults,
  updateSentenceInSuggestResults
} from '../../store/suggestion/suggestion.slice'
import { getLastClosestSentences } from '../../utils/sentence'
import Suggestion from '../Icons/Suggestion'
import SuggestedSentence from './SuggestedSentence'

interface SuggestionsProps {
  editor: Editor | null
  onAnalyticsClick?: () => void
}

const Suggestions = ({ editor, onAnalyticsClick }: SuggestionsProps) => {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state.editor.language)
  const { openAISuggestResults, searchResults, suggestResults, isLoadingSearch, isLoadingSuggest } = useSelector(
    (state: RootState) => state.suggestion
  )

  const [userInput, setUserInput] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [currentIncompleteSentence, setCurrentIncompleteSentence] = useState('')
  const [isLoadingOpenAISuggest, setIsLoadingOpenAISuggest] = useState(false)

  const searchAbortControllerRef = useRef<AbortController | null>(null)
  const suggestAbortControllerRef = useRef<AbortController | null>(null)

  const debouncedUserInput = useDebounce(userInput, 500)

  const fetchSearchResults = useCallback(
    async (query: string) => {
      if (!query) {
        dispatch(setStoreSearchResults({ results: [] }))
        return
      }

      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort()
      }
      searchAbortControllerRef.current = new AbortController()

      dispatch(setStoreIsLoadingSearch(true))
      dispatch(setStoreSearchResults({ results: [] }))
      try {
        const { data } = await sentencesInstance.search(
          {
            q: query,
            index: ELASTIC_SEARCH_INDEX,
            lang: currentLanguage
          },
          searchAbortControllerRef.current.signal
        )
        dispatch(setStoreSearchResults({ results: data, isLoading: false }))
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }
        console.error('Error fetching search results:', error)
        dispatch(setStoreSearchResults({ results: [], isLoading: false }))
      }
    },
    [dispatch, currentLanguage]
  )

  const fetchSuggestResults = useCallback(
    async (input: string) => {
      if (!input) {
        dispatch(setStoreSuggestResults({ results: [] }))
        return
      }

      if (suggestAbortControllerRef.current) {
        suggestAbortControllerRef.current.abort()
      }
      suggestAbortControllerRef.current = new AbortController()

      dispatch(setStoreIsLoadingSuggest(true))
      try {
        const { data } = await sentencesInstance.suggest(
          {
            user_input: input,
            lang: currentLanguage
          },
          suggestAbortControllerRef.current.signal
        )
        dispatch(setStoreSuggestResults({ results: data, isLoading: false }))
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }
        console.error('Error fetching suggest results:', error)
        dispatch(setStoreSuggestResults({ results: [], isLoading: false }))
      }
    },
    [dispatch, currentLanguage]
  )

  const fetchOpenAISuggestResults = useCallback(
    async (input: string) => {
      if (!input) {
        dispatch(setStoreOpenAISuggestResults([]))
        return
      }
      setIsLoadingOpenAISuggest(true)
      try {
        const { data } = await sentencesInstance.getOpenAISuggestion({
          user_input: input,
          lang: currentLanguage,
          num_suggestions: 1
        })
        dispatch(setStoreOpenAISuggestResults(data))
      } catch (error) {
        console.error('Error fetching OpenAI suggestions:', error)
        dispatch(setStoreOpenAISuggestResults([]))
      } finally {
        setIsLoadingOpenAISuggest(false)
      }
    },
    [dispatch, currentLanguage]
  )

  // Fetch search results first (faster API)
  useEffect(() => {
    if (debouncedUserInput && !isApplying && !hasApplied) {
      const context = getLastClosestSentences(debouncedUserInput)
      dispatch(setContext(context))
      fetchSearchResults(context)
    }
  }, [debouncedUserInput, isApplying, hasApplied, fetchSearchResults])

  // Fetch suggest results after a delay (slower API)
  useEffect(() => {
    if (debouncedUserInput && !isApplying && !hasApplied) {
      fetchSuggestResults(getLastClosestSentences(debouncedUserInput))
    }
  }, [debouncedUserInput, isApplying, hasApplied, fetchSuggestResults])

  // Fetch OpenAI suggest results song song
  useEffect(() => {
    if (debouncedUserInput && !isApplying && !hasApplied) {
      fetchOpenAISuggestResults(getLastClosestSentences(debouncedUserInput))
    }
  }, [debouncedUserInput, isApplying, hasApplied, fetchOpenAISuggestResults])

  const updateUserInput = useCallback(() => {
    if (!editor) return

    const currentSelection = editor.state.selection.$head.parent.textContent

    // Check if current selection ends with a sentence-ending punctuation
    const hasEndingPunctuation = /[.!?]$/.test(currentSelection)

    if (!hasEndingPunctuation) {
      setCurrentIncompleteSentence(currentSelection)
      setUserInput(currentSelection.trim())
    } else {
      setCurrentIncompleteSentence('')
      setUserInput(currentSelection.trim())
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return

    editor.on('update', updateUserInput)
    return () => {
      editor.off('update', updateUserInput)
      // Cleanup: abort any pending requests when component unmounts
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort()
      }
      if (suggestAbortControllerRef.current) {
        suggestAbortControllerRef.current.abort()
      }
    }
  }, [editor, updateUserInput])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !isApplying && !hasApplied) {
        e.preventDefault()

        const firstSuggestion =
          suggestResults.length > 0
            ? suggestResults[0].content
            : searchResults.length > 0
              ? searchResults[0].content
              : null

        if (firstSuggestion) {
          handleApply({ suggestion: firstSuggestion, isSearch: suggestResults.length === 0 })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [suggestResults, searchResults, isApplying, hasApplied])

  const handleApply = async ({ suggestion, isSearch }: { suggestion: string; isSearch: boolean }) => {
    if (!editor || isApplying || hasApplied) return

    setIsApplying(true)
    setHasApplied(true)

    try {
      const { state } = editor
      const { selection } = state
      const { $from, $to } = selection

      if (currentIncompleteSentence) {
        // Replace only the incomplete sentence
        const paragraphStart = $from.start()
        const paragraphEnd = $to.end()
        console.log('state', { state, selection, $from, $to, paragraphStart, paragraphEnd })
        editor
          .chain()
          .focus()
          .command(({ tr, state }) => {
            const paragraph = $from.parent
            const paragraphStart = $from.start()
            const paragraphText = paragraph.textContent

            // Tách câu bằng regex
            const sentenceRegex = /[^.!?]+[.!?]?/g
            const sentences = [...paragraphText.matchAll(sentenceRegex)].map((m) => m[0])

            if (sentences.length === 0) return false

            const lastSentence = sentences[sentences.length - 1]
            const startOffset = paragraphText.lastIndexOf(lastSentence)
            const fromPos = paragraphStart + startOffset
            const toPos = fromPos + lastSentence.length

            tr.replaceWith(fromPos, toPos, state.schema.text(` ${suggestion}`))
            return true
          })
          .run()
      } else {
        // Append the suggestion to the end
        editor.chain().focus().insertContent(` ${suggestion}`).run()
      }
      if (!isSearch) {
        const response = await sentencesInstance.addSentence(suggestion)
        dispatch(
          updateSentenceInSuggestResults({
            sentence_id: response.data.documentId,
            isUserAdded: true
          })
        )
      }
    } catch (error) {
      console.error('Error applying suggestion:', error)
    } finally {
      setIsApplying(false)
    }
  }

  // Reset hasApplied when userInput changes
  useEffect(() => {
    setHasApplied(false)
  }, [userInput])

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center space-x-2'>
        <Suggestion width={20} height={20} />
        <h2 className='text-base font-semibold text-gray-800'>Suggestions</h2>
      </div>

      <div className='space-y-1'>
        {/* Loading và các loại suggest/search khác giữ nguyên */}
        {isLoadingSearch && searchResults.length === 0 && (
          <p className='text-xs text-gray-500'>Loading search suggestions...</p>
        )}

        {isLoadingSuggest && suggestResults.length === 0 && searchResults.length === 0 && (
          <p className='text-xs text-gray-500'>Loading additional suggestions...</p>
        )}

        {isLoadingOpenAISuggest && <p className='text-xs text-gray-500'>Loading AI suggestions...</p>}

        {(suggestResults.length > 0 || searchResults.length > 0) && !isLoadingSearch && !isLoadingSuggest && (
          <p className='mb-4 text-xs text-gray-500'>Press Tab to apply the first suggestion</p>
        )}

        {/* Hiển thị openAISuggestResults đầu tiên */}
        {openAISuggestResults.map((suggestion, index) => (
          <SuggestedSentence
            key={`openai-suggest-${index}`}
            sentence={{
              sentence_id: '',
              content: suggestion,
              isVoted: false,
              userRating: 0,
              rating: 0,
              numOfRate: 0,
              isUserAdded: false,
              isSearchResult: false
            }}
            onApply={() => handleApply({ suggestion, isSearch: false })}
            disabled={isApplying || hasApplied}
            isSearch={false}
            isOpenAISuggest={true}
            context={debouncedUserInput}
            onAnalyticsClick={onAnalyticsClick}
          />
        ))}

        {suggestResults.map((suggestion, index) => (
          <SuggestedSentence
            key={`suggest-${index}`}
            sentence={suggestion}
            onApply={() => handleApply({ suggestion: suggestion.content, isSearch: false })}
            disabled={isApplying || hasApplied}
            isSearch={false}
            context={debouncedUserInput}
            onAnalyticsClick={onAnalyticsClick}
          />
        ))}

        {searchResults.map((sentence) => (
          <SuggestedSentence
            key={`search-${sentence.sentence_id}`}
            sentence={sentence}
            onApply={() => handleApply({ suggestion: sentence.content, isSearch: true })}
            disabled={isApplying || hasApplied}
            isSearch={true}
            context={debouncedUserInput}
            onAnalyticsClick={onAnalyticsClick}
          />
        ))}

        {!isLoadingSearch &&
          !isLoadingSuggest &&
          suggestResults.length === 0 &&
          searchResults.length === 0 &&
          openAISuggestResults.length === 0 &&
          !isLoadingOpenAISuggest && <p className='text-sm text-gray-500'>No suggestions available</p>}
      </div>
    </div>
  )
}

export default Suggestions
