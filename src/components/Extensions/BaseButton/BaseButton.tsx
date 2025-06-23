import { ReactNode } from 'react'
import { cn } from '../../../libs/tailwind/utils'

interface BaseButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
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
  )
}

export default BaseButton
