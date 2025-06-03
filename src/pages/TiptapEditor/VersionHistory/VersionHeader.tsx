import BaseButton from '../../../components/Extensions/BaseButton'
import ArrowLeft from '../../../components/Icons/ArrowLeft'
import Clock from '../../../components/Icons/Clock/Clock'

interface VersionHeaderProps {
  timestamp: string
  onBack: () => void
}

const VersionHeader = ({ timestamp, onBack }: VersionHeaderProps) => {
  return (
    <div className='flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4'>
      <div className='flex items-center gap-3'>
        <BaseButton onClick={onBack} customClass='p-2'>
          <ArrowLeft className='h-4 w-4' />
        </BaseButton>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Clock />
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  )
}

export default VersionHeader
