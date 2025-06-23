'use client'

interface SentenceContextDisplayProps {
  originalSentence: string
  suggestedSentence?: string
  context: string
}

export function SentenceContextDisplay({ originalSentence, suggestedSentence, context }: SentenceContextDisplayProps) {
  return (
    <div className='space-y-3'>
      {/* Original Sentence */}
      <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='px-6 py-4 pb-2'>
          <div className='flex items-center gap-2 text-xs font-medium text-gray-600'>
            <span className='inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700'>
              Original
            </span>
            Sentence
          </div>
        </div>
        <div className='px-6 pt-0 pb-6'>
          <div className='rounded border-l-4 border-blue-500 bg-blue-50 p-3 text-sm'>"{originalSentence}"</div>
        </div>
      </div>

      {/* Suggested Sentence */}
      {suggestedSentence && (
        <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
          <div className='px-6 py-4 pb-2'>
            <div className='flex items-center gap-2 text-xs font-medium text-gray-600'>
              <span className='inline-flex items-center rounded-full border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700'>
                Suggested
              </span>
              Sentence
            </div>
          </div>
          <div className='px-6 pt-0 pb-6'>
            <div className='rounded border-l-4 border-green-500 bg-green-50 p-3 text-sm'>"{suggestedSentence}"</div>
          </div>
        </div>
      )}

      {/* Context */}
      <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='px-6 py-4 pb-2'>
          <div className='flex items-center gap-2 text-xs font-medium text-gray-600'>
            <span className='inline-flex items-center rounded-full border-purple-200 bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700'>
              Context
            </span>
            Surrounding Text
          </div>
        </div>
        <div className='px-6 pt-0 pb-6'>
          <div className='rounded border-l-4 border-gray-400 bg-gray-50 p-3 text-sm leading-relaxed'>{context}</div>
        </div>
      </div>
    </div>
  )
}
