import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Editor } from '@tiptap/react'
import SuggestionIcon from '../Icons/SuggestionIcon'
import SuggestedSentence from './SuggestedSentence'
import useDebounce from '../../hooks/useDebounce'
import { searchApi, suggestApi } from '../../services/api'

interface SuggestionsProps {
  editor: Editor | null
}

const Suggestions = ({ editor }: SuggestionsProps) => {
  const [userInput, setUserInput] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [currentIncompleteSentence, setCurrentIncompleteSentence] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [suggestResults, setSuggestResults] = useState<string[]>([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [isLoadingSuggest, setIsLoadingSuggest] = useState(false)
  const searchAbortControllerRef = useRef<AbortController | null>(null)
  const suggestAbortControllerRef = useRef<AbortController | null>(null)

  const debouncedUserInput = useDebounce(userInput, 500)

  // Combine results from both APIs
  const allSuggestions = [...suggestResults, ...searchResults]

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
      const { data } = await searchApi(query, 'ezwrite_demo_21042025', searchAbortControllerRef.current.signal)
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
      const { data } = await suggestApi(input, suggestAbortControllerRef.current.signal)
      console.log('data', data)
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
      fetchSearchResults(debouncedUserInput)
    }
  }, [debouncedUserInput, isApplying, hasApplied, fetchSearchResults])

  // Fetch suggest results after a delay (slower API)
  useEffect(() => {
    if (debouncedUserInput && !isApplying && !hasApplied) {
      const timer = setTimeout(() => {
        fetchSuggestResults(debouncedUserInput)
      }, 1000) // Delay to prioritize search results
      
      return () => clearTimeout(timer)
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
      if (e.key === 'Tab' && allSuggestions.length > 0 && !isApplying && !hasApplied) {
        e.preventDefault()
        handleApply(allSuggestions[0])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [allSuggestions, isApplying, hasApplied])

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
        
        editor
          .chain()
          .focus()
          .command(({ tr }) => {
            tr.replaceWith(paragraphStart, paragraphEnd, state.schema.text(suggestion))
            return true
          })
          .run()
      } else {
        // Append the suggestion to the end
        editor
          .chain()
          .focus()
          .insertContent(`\n${suggestion}`)
          .run()
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
    <div className="overflow-y-auto max-h-[80vh] w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center space-x-2">
        <SuggestionIcon />
        <h2 className="text-lg font-semibold text-gray-800">Suggestions</h2>
      </div>

      <div className="space-y-2">
        {/* Hiển thị loading nếu đang loading cả 2 và chưa có gì */}
        {isLoadingSearch && searchResults.length === 0 && (
          <p className="text-sm text-gray-500">Loading search suggestions...</p>
        )}

        {/* Đang loading suggest */}
        {isLoadingSuggest && (
          <p className="text-sm text-gray-500">Loading additional suggestions...</p>
        )}

        {allSuggestions.length > 0 && (
          <p className="mb-4 text-sm text-gray-500">
            Press Tab to apply the first suggestion
          </p>
        )}

        {/* Hiển thị combined suggestions */}
        {allSuggestions.length > 0 && (
          <>
            {allSuggestions.map((suggestion, index) => (
              <SuggestedSentence
                key={index}
                sentence={suggestion}
                onApply={() => handleApply(suggestion)}
                disabled={isApplying || hasApplied}
              />
            ))}
          </>
        )}

        {/* Không có suggestion nào hết */}
        {!isLoadingSearch && !isLoadingSuggest && allSuggestions.length === 0 && (
          <p className="text-sm text-gray-500">No suggestions available</p>
        )}
      </div>

    </div>
  )
}

export default Suggestions 