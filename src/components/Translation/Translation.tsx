import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'
import { cn } from '../../libs/tailwind/utils'
import translateInstance from '../../services/translation.api'
import { RootState } from '../../store'
import Translate from '../Icons/Translate'

const Translation = () => {
  const isOpenSuggestion = useSelector((state: RootState) => state.suggestion.isOpenSuggestion)
  const [direction, setDirection] = useState<'en-vi' | 'vi-en'>('en-vi')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [_isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedInputText = useDebounce(inputText, 500)

  // Handle direction change
  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDirection(e.target.value as 'en-vi' | 'vi-en')
    setOutputText('')
    setError(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    setError(null)
  }

  useEffect(() => {
    const translate = async () => {
      if (!debouncedInputText.trim()) {
        setOutputText('')
        return
      }

      setIsTranslating(true)
      setError(null)

      try {
        const [from, to] = direction === 'en-vi' ? ['en', 'vi'] : ['vi', 'en']
        const res = await translateInstance.translate({
          text: debouncedInputText,
          source_lang: from,
          target_lang: to
        })
        setOutputText(res.data.translated_text)
      } catch (err) {
        console.error('Translation error:', err)
        setError('Failed to translate. Please try again.')
        setOutputText('')
      } finally {
        setIsTranslating(false)
      }
    }

    translate()
  }, [debouncedInputText, direction])

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setError(null)
  }

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).catch((err) => {
        console.error('Failed to copy:', err)
      })
    }
  }

  return (
    <div
      className={cn('w-80 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-sm', {
        'max-h-[calc(50vh-76px)]': isOpenSuggestion,
        'max-h-[calc(100vh-132px)]': !isOpenSuggestion
      })}
    >
      <div className='mb-4 flex items-center space-x-2'>
        <Translate className='text-yellow-500' />
        <h2 className='text-base font-semibold text-gray-800'>Translation</h2>
      </div>

      {/* Language direction selector */}
      <div className='mb-4'>
        <select
          value={direction}
          onChange={handleDirectionChange}
          className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
        >
          <option value='en-vi'>English → Vietnamese</option>
          <option value='vi-en'>Vietnamese → English</option>
        </select>
      </div>

      {/* Input text area */}
      <div className='mb-4'>
        <div className='mb-1 flex items-center justify-between'>
          <label htmlFor='input-text' className='block text-sm font-medium text-gray-700'>
            {direction === 'en-vi' ? 'English' : 'Vietnamese'}
          </label>
          {inputText && (
            <button onClick={handleClear} className='text-xs text-gray-500 hover:text-gray-700'>
              Clear
            </button>
          )}
        </div>
        <textarea
          id='input-text'
          value={inputText}
          onChange={handleInputChange}
          placeholder={`Enter ${direction === 'en-vi' ? 'English' : 'Vietnamese'} text...`}
          className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
          rows={2}
        />
      </div>

      {/* Translate button */}
      {/* <div className='mb-4'>
        <button
          onClick={handleTranslate}
          disabled={isTranslating || !inputText.trim()}
          className={`w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
            isTranslating || !inputText.trim() ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {isTranslating ? (
            <span className='flex items-center justify-center'>
              <svg
                className='mr-2 -ml-1 h-4 w-4 animate-spin text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Translating...
            </span>
          ) : (
            'Translate'
          )}
        </button>
      </div> */}

      {/* Error message */}
      {error && <div className='mb-4 rounded-md bg-red-50 p-2 text-xs text-red-600'>{error}</div>}

      {/* Output text area (read-only) */}
      <div>
        <div className='mb-1 flex items-center justify-between'>
          <label htmlFor='output-text' className='block text-sm font-medium text-gray-700'>
            {direction === 'en-vi' ? 'Vietnamese' : 'English'}
          </label>
          {outputText && (
            <button onClick={handleCopy} className='text-xs text-gray-500 hover:text-gray-700'>
              Copy
            </button>
          )}
        </div>
        <textarea
          id='output-text'
          value={outputText}
          readOnly
          placeholder={`${direction === 'en-vi' ? 'Vietnamese' : 'English'} translation will appear here...`}
          className='w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm'
          rows={2}
        />
      </div>
    </div>
  )
}

export default Translation
