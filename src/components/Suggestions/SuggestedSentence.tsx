import { HttpStatusCode } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ELASTIC_SEARCH_INDEX } from '../../constants/common'
import { cn } from '../../libs/tailwind/utils'
import feedbackInstance from '../../services/feedback.api'
import { updateSentenceInSearchResults } from '../../store/suggestion/suggestion.slice'
import { Sentence } from '../../types/sentence.type'
import CheckFill from '../Icons/CheckFill'
import FeedbackOutline from '../Icons/FeedbackOutline'

interface SuggestedSentenceProps {
  sentence: string | Sentence
  onApply: () => void
  disabled?: boolean
  isSearch?: boolean
}

const SuggestedSentence = ({ sentence, onApply, disabled = false, isSearch = true }: SuggestedSentenceProps) => {
  const dispatch = useDispatch()
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
      if (isSearch && (sentence as Sentence).isVoted) {
        setSelectedRating((sentence as Sentence).userRating)
      }
    }
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
  }

  const handleSubmit = async () => {
    if (!selectedRating || !isSearch) return

    try {
      let response
      const sentenceId = (sentence as Sentence).sentence_id
      if ((sentence as Sentence).isVoted) {
        response = await feedbackInstance.updateVote({
          sentence_id: sentenceId,
          index_name: ELASTIC_SEARCH_INDEX,
          rating: selectedRating
        })
      } else {
        response = await feedbackInstance.vote({
          sentence_id: sentenceId,
          index_name: ELASTIC_SEARCH_INDEX,
          rating: selectedRating
        })
      }

      if (response.status === HttpStatusCode.Created || response.status === HttpStatusCode.Ok) {
        toast.success('Thank you for your feedback!')
        const updatedSentence: Sentence = {
          ...(sentence as Sentence),
          ...(response.data as Partial<Sentence>),
          userRating: selectedRating,
          isVoted: true
        }
        dispatch(updateSentenceInSearchResults(updatedSentence))
      } else {
        toast.error('Failed to submit feedback. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast.error('Failed to submit feedback. Please try again.')
    }

    setShowFeedbackPopup(false)
    setSelectedRating(null)
  }

  const handleCancel = () => {
    setShowFeedbackPopup(false)
    setSelectedRating(null)
  }

  const handleRemoveVote = async () => {
    if (!isSearch || !(sentence as Sentence).isVoted) return

    try {
      const response = await feedbackInstance.removeVote({
        sentence_id: (sentence as Sentence).sentence_id,
        index_name: ELASTIC_SEARCH_INDEX
      })

      if (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.NoContent) {
        toast.success('Your vote has been removed.')
        const updatedSentence: Sentence = {
          ...(sentence as Sentence),
          ...(response.data as Partial<Sentence>),
          isVoted: false,
          userRating: 0
        }
        dispatch(updateSentenceInSearchResults(updatedSentence))
      } else {
        toast.error('Failed to remove vote. Please try again.')
      }
    } catch (error) {
      console.error('Error removing vote:', error)
      toast.error('Failed to remove vote. Please try again.')
    }

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

  const getRatingTextColor = (rating: number) => {
    if (rating < 1.5) {
      return 'text-red-500/90 hover:text-red-500'
    } else if (rating < 2.5) {
      return 'text-orange-500/90 hover:text-orange-500'
    } else if (rating < 3.5) {
      return 'text-yellow-500/90 hover:text-yellow-500'
    } else if (rating < 4.5) {
      return 'text-lime-500/90 hover:text-lime-500'
    } else {
      return 'text-green-500/90 hover:text-green-500'
    }
  }

  const getRatingBackgroundColor = (rating: number) => {
    if (rating < 1.5) {
      return 'bg-red-500'
    } else if (rating < 2.5) {
      return 'bg-orange-500'
    } else if (rating < 3.5) {
      return 'bg-yellow-500'
    } else if (rating < 4.5) {
      return 'bg-lime-500'
    } else {
      return 'bg-green-500'
    }
  }

  const ratingTextColor = (sentence as Sentence).isVoted ? getRatingTextColor((sentence as Sentence).userRating) : ''

  return (
    <div
      className={cn('flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50', {
        'bg-blue-50 hover:bg-blue-100': !isSearch
      })}
    >
      <p className='text-left text-xs text-gray-700'>
        {isSearch ? (sentence as Sentence).content : (sentence as string)}
      </p>
      <div className='ml-4 flex items-center'>
        {isSearch && (sentence as Sentence).rating > 0 && (
          <div
            className={cn(
              'rounded-full px-2 py-1 text-xs text-white',
              getRatingBackgroundColor((sentence as Sentence).rating)
            )}
          >
            {(sentence as Sentence).rating}
          </div>
        )}
        {isSearch && (
          <div className='relative' ref={iconRef}>
            <FeedbackOutline
              width={20}
              height={20}
              className={cn('rounded-full', {
                'cursor-not-allowed text-gray-400': disabled,
                'cursor-pointer text-blue-400 hover:text-blue-500': !disabled,
                [ratingTextColor]: (sentence as Sentence).isVoted
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
                  <div className='flex items-center space-x-2'>
                    {(sentence as Sentence).isVoted && isSearch && (
                      <button
                        className='cursor-pointer rounded px-3 py-1 text-xs text-red-600 hover:bg-red-100'
                        onClick={handleRemoveVote}
                      >
                        Remove
                      </button>
                    )}
                    <button
                      className={cn(
                        'cursor-pointer rounded px-3 py-1 text-xs text-white',
                        selectedRating ? 'bg-blue-500 hover:bg-blue-600' : 'cursor-not-allowed bg-gray-300'
                      )}
                      onClick={handleSubmit}
                      disabled={
                        !selectedRating && !(isSearch && (sentence as Sentence).isVoted && selectedRating === null)
                      }
                    >
                      {isSearch && (sentence as Sentence).isVoted ? 'Update' : 'Submit'}
                    </button>
                  </div>
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
