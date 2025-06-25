import { type Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { cn } from '../../libs/tailwind/utils'
import speechInstance from '../../services/speech.api'
import Pause from '../Icons/Pause'
import Play from '../Icons/Play'
import Refresh from '../Icons/Refresh'
import TextToSpeech from '../Icons/TextToSpeech'

interface TextToSpeechCompProps {
  editor: Editor | null
}

const TextToSpeechComp = ({ editor }: TextToSpeechCompProps) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const generateSpeech = async () => {
    if (!editor) {
      setError('Editor is not available')
      return
    }

    const text = editor.getText()
    if (!text.trim()) {
      setError('Please enter some text in the editor')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const blob = await speechInstance.textToSpeech({
        text,
        language: 'en-US',
        voice_name: 'en-US-JennyNeural'
      })

      const url = URL.createObjectURL(blob)
      setAudioUrl(url)

      // Create new audio element
      const audio = new Audio(url)
      audio.onended = () => setIsPlaying(false)
      setAudioElement(audio)
    } catch (err) {
      console.error('Text to speech error:', err)
      setError('Failed to generate speech. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlayPause = () => {
    if (!audioElement) return

    if (isPlaying) {
      audioElement.pause()
    } else {
      audioElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const regenerateSpeech = () => {
    if (audioElement) {
      audioElement.pause()
      setIsPlaying(false)
    }
    generateSpeech()
  }

  // Cleanup audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center space-x-2'>
        <TextToSpeech className='text-yellow-500' width={20} height={20} />
        <h2 className='text-base font-semibold text-gray-800'>Text to speech</h2>
      </div>

      {/* Error message */}
      {error && <div className='mb-4 rounded-md bg-red-50 p-2 text-xs text-red-600'>{error}</div>}

      {/* Generate button */}
      <div className='mb-2'>
        <button
          onClick={generateSpeech}
          disabled={isLoading || !editor?.getText().trim()}
          className={cn('w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors', {
            'cursor-not-allowed opacity-50': isLoading || !editor?.getText().trim(),
            'hover:bg-blue-600': !isLoading && editor?.getText().trim()
          })}
        >
          {isLoading ? 'Generating...' : 'Generate Speech'}
        </button>
      </div>

      {/* Audio player */}
      {audioUrl && (
        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <button onClick={togglePlayPause} className='rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600'>
                {isPlaying ? <Pause width={20} height={20} /> : <Play width={20} height={20} />}
              </button>
              <span className='text-sm text-gray-600'>{isPlaying ? 'Playing...' : 'Paused'}</span>
            </div>
            <button
              onClick={regenerateSpeech}
              className='flex items-center space-x-1 rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-300'
            >
              <Refresh width={16} height={16} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TextToSpeechComp
