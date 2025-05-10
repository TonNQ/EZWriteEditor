import { Editor } from '@tiptap/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ELASTIC_SEARCH_INDEX } from '../../constants/common'
import useDebounce from '../../hooks/useDebounce'
import { cn } from '../../libs/tailwind/utils'
import sentencesInstance from '../../services/sentences.api'
import { RootState } from '../../store'
import { Sentence } from '../../types/sentence.type'
import { getLastClosestSentences } from '../../utils/sentence'
import Suggestion from '../Icons/Suggestion'
import SuggestedSentence from './SuggestedSentence'

interface SuggestionsProps {
  editor: Editor | null
}

const Suggestions = ({ editor }: SuggestionsProps) => {
  const isOpenTranslation = useSelector((state: RootState) => state.translation.isOpenTranslation)
  const [userInput, setUserInput] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [currentIncompleteSentence, setCurrentIncompleteSentence] = useState('')
  const [searchResults, setSearchResults] = useState<Sentence[]>([])
  const [suggestResults, setSuggestResults] = useState<string[]>([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [isLoadingSuggest, setIsLoadingSuggest] = useState(false)
  const searchAbortControllerRef = useRef<AbortController | null>(null)
  const suggestAbortControllerRef = useRef<AbortController | null>(null)

  const debouncedUserInput = useDebounce(userInput, 500)

  // Combine results from both APIs
  const allSuggestions: Array<Sentence | string> = [...suggestResults, ...searchResults]

  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    // Cancel previous search request if exists
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    searchAbortControllerRef.current = new AbortController()

    setIsLoadingSearch(true)
    try {
      setSearchResults([])
      setSuggestResults([])
      const { data } = await sentencesInstance.search(
        {
          q: query,
          index: ELASTIC_SEARCH_INDEX
        },
        searchAbortControllerRef.current.signal
      )
      setSearchResults(data)
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return // Ignore abort errors
      }
      console.error('Error fetching search results:', error)
      setSearchResults([])
    } finally {
      setIsLoadingSearch(false)
    }
  }, [])

  const fetchSuggestResults = useCallback(async (input: string) => {
    if (!input) {
      setSuggestResults([])
      return
    }

    // Cancel previous suggest request if exists
    if (suggestAbortControllerRef.current) {
      suggestAbortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    suggestAbortControllerRef.current = new AbortController()

    setIsLoadingSuggest(true)
    try {
      const { data } = await sentencesInstance.suggest(
        {
          user_input: input
        },
        suggestAbortControllerRef.current.signal
      )
      setSuggestResults(data)
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return // Ignore abort errors
      }
      console.error('Error fetching suggest results:', error)
      setSuggestResults([])
    } finally {
      setIsLoadingSuggest(false)
    }
  }, [])

  // Fetch search results first (faster API)
  useEffect(() => {
    if (debouncedUserInput && !isApplying && !hasApplied) {
      fetchSearchResults(getLastClosestSentences(debouncedUserInput))
    }
  }, [debouncedUserInput, isApplying, hasApplied, fetchSearchResults])

  // Fetch suggest results after a delay (slower API)
  useEffect(() => {
    if (debouncedUserInput && !isApplying && !hasApplied) {
      // const timer = setTimeout(() => {
      fetchSuggestResults(getLastClosestSentences(debouncedUserInput))
      // }, 1000) // Delay to prioritize search results
      // return () => clearTimeout(timer)
    }
  }, [debouncedUserInput, isApplying, hasApplied, fetchSuggestResults])

  const updateUserInput = useCallback(() => {
    if (!editor) return

    const { state } = editor
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
          suggestResults.length > 0 ? suggestResults[0] : searchResults.length > 0 ? searchResults[0].content : null

        if (firstSuggestion) {
          handleApply(firstSuggestion)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [suggestResults, searchResults, isApplying, hasApplied])

  const handleApply = async (suggestion: string) => {
    if (!editor || isApplying || hasApplied) return

    setIsApplying(true)
    setHasApplied(true)

    try {
      const { state } = editor
      const { selection } = state
      const { $from, $to } = selection

      if (currentIncompleteSentence) {
        // Replace only the incomplete sentence
        const paragraph = $from.parent
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
            const sentences = [...paragraphText.matchAll(sentenceRegex)].map(m => m[0])
            
            if (sentences.length === 0) return false
          
            const lastSentence = sentences[sentences.length - 1]
            const startOffset = paragraphText.lastIndexOf(lastSentence)
            const fromPos = paragraphStart + startOffset
            const toPos = fromPos + lastSentence.length
          
            tr.replaceWith(fromPos, toPos, state.schema.text(suggestion))
            return true
          })
          .run()
      } else {
        // Append the suggestion to the end
        editor.chain().focus().insertContent(` ${suggestion}`).run()
      }
    } catch (error) {
      console.error('Error applying suggestion:', error)
    } finally {
      setIsApplying(false)
    }
  }

  // Reset hasApplied when userInput changes
  useEffect(() => {
    console.log('userInput', userInput)
    setHasApplied(false)
  }, [userInput])

  return (
    <div
      className={cn('w-72 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-sm', {
        'max-h-[calc(50vh-76px)]': isOpenTranslation,
        'max-h-[calc(100vh-132px)]': !isOpenTranslation
      })}
    >
      <div className='mb-4 flex items-center space-x-2'>
        <Suggestion />
        <h2 className='text-base font-semibold text-gray-800'>Suggestions</h2>
      </div>

      <div className='space-y-1'>
        {/* Hiển thị loading nếu đang loading cả 2 và chưa có gì */}
        {isLoadingSearch && searchResults.length === 0 && (
          <p className='text-xs text-gray-500'>Loading search suggestions...</p>
        )}

        {isLoadingSuggest && <p className='text-xs text-gray-500'>Loading additional suggestions...</p>}

        {(suggestResults.length > 0 || searchResults.length > 0) && (
          <p className='mb-4 text-xs text-gray-500'>Press Tab to apply the first suggestion</p>
        )}

        {suggestResults.map((suggestion, index) => (
          <SuggestedSentence
            key={`suggest-${index}`}
            sentence={suggestion}
            onApply={() => handleApply(suggestion)}
            disabled={isApplying || hasApplied}
            isSearch={false}
          />
        ))}

        {searchResults.map((sentence, index) => (
          <SuggestedSentence
            key={`search-${index}`}
            sentence={sentence.content}
            onApply={() => handleApply(sentence.content)}
            disabled={isApplying || hasApplied}
            isSearch={true}
          />
        ))}

        {!isLoadingSearch && !isLoadingSuggest && suggestResults.length === 0 && searchResults.length === 0 && (
          <p className='text-sm text-gray-500'>No suggestions available</p>
        )}
      </div>
    </div>
  )
}

export default Suggestions
