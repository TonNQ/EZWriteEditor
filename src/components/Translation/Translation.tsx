import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import translateInstance from '../../services/translation.api'
import Translate from '../Icons/Translate'

const Translation = () => {
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
    <div className='w-full'>
      <div className='mb-4 flex items-center space-x-2'>
        <Translate className='text-yellow-500' width={20} height={20} />
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
          rows={7}
        />
      </div>

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
          rows={7}
        />
      </div>
    </div>
  )
}

export default Translation
