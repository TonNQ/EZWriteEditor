interface SuggestedSentenceProps {
  sentence: string
  onApply: () => void
  disabled?: boolean
}

const SuggestedSentence = ({ sentence, onApply, disabled = false }: SuggestedSentenceProps) => {
  return (
    <div className='flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50'>
      <p className='text-left text-sm text-gray-700'>{sentence}</p>
      <button 
        onClick={onApply} 
        className={`ml-4 rounded px-3 py-1 text-sm text-white ${
          disabled 
            ? 'cursor-not-allowed bg-gray-400' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={disabled}
      >
        Apply
      </button>
    </div>
  )
}

export default SuggestedSentence
