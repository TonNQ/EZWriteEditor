import { ReactNode } from 'react'
import { cn } from '../../../libs/tailwind/utils'

interface BaseButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
  isActive?: boolean
  disabled?: boolean
  children: ReactNode
  customClass?: string
  tooltip?: string
}

const BaseButton = ({ onClick, isActive, disabled, children, customClass, tooltip }: BaseButtonProps) => {
  return (
    <div className='group relative inline-block'>
      <button
        type='button'
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={cn(
          'flex h-[28px] min-w-[28px] cursor-pointer items-center justify-center rounded-sm p-1 hover:bg-neutral-200',
          {
            'bg-blue-200/60 hover:bg-blue-200/70': isActive,
            'cursor-default opacity-20': disabled
          },
          customClass || ''
        )}
      >
        {children}
      </button>
      {tooltip && (
        <span className='absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transform rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100'>
          {tooltip}
        </span>
      )}
    </div>
  )
}

export default BaseButton
