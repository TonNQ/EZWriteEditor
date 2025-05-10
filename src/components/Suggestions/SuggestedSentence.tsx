import { useEffect, useRef, useState } from 'react'
import { cn } from '../../libs/tailwind/utils'
import CheckFill from '../Icons/CheckFill'
import FeedbackOutline from '../Icons/FeedbackOutline'

interface SuggestedSentenceProps {
  sentence: string
  onApply: () => void
  disabled?: boolean
  isSearch?: boolean
}

const SuggestedSentence = ({ sentence, onApply, disabled = false, isSearch = true }: SuggestedSentenceProps) => {
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setShowFeedbackPopup(false)
        setSelectedRating(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFeedbackClick = () => {
    if (!disabled) {
      setShowFeedbackPopup(true)
    }
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
  }

  const handleSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log(`Submitted rating: ${selectedRating}`)
    setShowFeedbackPopup(false)
    setSelectedRating(null)
  }

  const handleCancel = () => {
    setShowFeedbackPopup(false)
    setSelectedRating(null)
  }

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1:
        return 'Very Poor'
      case 2:
        return 'Poor'
      case 3:
        return 'Average'
      case 4:
        return 'Good'
      case 5:
        return 'Excellent'
      default:
        return ''
    }
  }

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 1:
        return 'bg-red-500'
      case 2:
        return 'bg-orange-500'
      case 3:
        return 'bg-yellow-500'
      case 4:
        return 'bg-lime-500'
      case 5:
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div
      className={cn('flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50', {
        'bg-blue-50 hover:bg-blue-100': !isSearch
      })}
    >
      <p className='text-left text-xs text-gray-700'>{sentence}</p>
      <div className='ml-4 flex items-center'>
        {isSearch && (
          <div className='relative' ref={iconRef}>
            <FeedbackOutline
              width={20}
              height={20}
              className={cn('rounded-full', {
                'cursor-not-allowed text-gray-400': disabled,
                'cursor-pointer text-blue-400 hover:text-blue-500': !disabled
              })}
              onClick={handleFeedbackClick}
            />

            {/* Feedback Popup */}
            {showFeedbackPopup && (
              <div
                ref={popupRef}
                className='absolute right-0 bottom-full z-100 mb-2 w-56 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg'
              >
                <div className='mb-2'>
                  <p className='mb-2 text-xs font-medium text-gray-700'>Rate this suggestion</p>
                  <div className='flex justify-between'>
                    <span className='text-xs text-gray-400'>Very Poor</span>
                    <span className='text-xs text-gray-400'>Excellent</span>
                  </div>
                  <div className='mt-2 flex justify-between'>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className='relative'
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(null)}
                      >
                        <button
                          className={cn(
                            'h-6 w-9 cursor-pointer rounded-2xl opacity-70 transition-all hover:opacity-100',
                            getRatingColor(rating),
                            {
                              'opacity-100': selectedRating === rating,
                              'opacity-30': selectedRating !== null && selectedRating !== rating
                            }
                          )}
                          onClick={() => handleRatingClick(rating)}
                        />

                        {/* Tooltip */}
                        {hoveredRating === rating && (
                          <div className='absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white'>
                            {getRatingLabel(rating)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex justify-between'>
                  <button
                    className='cursor-pointer rounded px-3 py-1 text-xs text-gray-600 hover:bg-gray-100'
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className={cn(
                      'cursor-pointer rounded px-3 py-1 text-xs text-white',
                      selectedRating ? 'bg-blue-500 hover:bg-blue-600' : 'cursor-not-allowed bg-gray-300'
                    )}
                    onClick={handleSubmit}
                    disabled={!selectedRating}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <CheckFill
          onClick={onApply}
          width={20}
          height={20}
          className={cn('rounded-full', {
            'cursor-not-allowed text-gray-400': disabled,
            'cursor-pointer text-green-500 hover:text-green-600': !disabled
          })}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default SuggestedSentence
