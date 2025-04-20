import { ReactNode } from 'react'
import { cn } from '../../../libs/tailwind/utils'

interface BaseButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: ReactNode
  customClass?: string
}

const BaseButton = ({ onClick, isActive, disabled, children, customClass }: BaseButtonProps) => {
  return (
    <button
      type='button'
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        'flex h-[32px] min-w-[32px] cursor-pointer items-center justify-center rounded-sm p-1 hover:bg-neutral-100',
        {
          'bg-neutral-200 hover:bg-neutral-200': isActive,
          'cursor-default opacity-20': disabled
        },
        customClass || ''
      )}
    >
      {children}
    </button>
  )
}

export default BaseButton
