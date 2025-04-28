import { ReactNode } from 'react'
import { cn } from '../../libs/tailwind/utils'

interface FormFieldWrapperProps {
  labelName?: string
  classNameWrapper?: string
  classNameLabel?: string
  classNameError?: string
  classNameRequired?: string
  errorMessage?: string
  showIsRequired?: boolean
  showError?: boolean
  children: ReactNode
}

const FormFieldWrapper = ({
  labelName,
  classNameWrapper = '',
  classNameLabel = '',
  classNameError = '',
  classNameRequired = '',
  errorMessage,
  showIsRequired = false,
  showError = true,
  children
}: FormFieldWrapperProps) => {
  return (
    <div className={cn('mt-2', classNameWrapper)}>
      {labelName && (
        <div className={cn('text-left text-sm font-semibold tracking-wide text-neutral-600', classNameLabel)}>
          {labelName}
          {showIsRequired && <span className={cn('ml-1 text-red-500', classNameRequired)}>*</span>}
        </div>
      )}
      {children}
      {showError && (
        <div className={cn('mt-1 min-h-[18px] text-left text-xs font-semibold text-red-500', classNameError)}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default FormFieldWrapper
