import { InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useController, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { cn } from '../../libs/tailwind/utils'
import FormFieldWrapper from '../FormFieldWrapper'

type InputVariant = 'input' | 'textarea'

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameWrapper?: string
  classNameLabel?: string
  classNameInput?: string
  classNameError?: string
  classNameRequired?: string
  className?: string
  labelName?: string
  showIsRequired?: boolean
  showError?: boolean
  name?: FieldPath<TFieldValues>
  variant?: InputVariant
  autoResize?: boolean
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  Partial<UseControllerProps<TFieldValues, TName>>

const Input = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Props<TFieldValues, TName>
) => {
  const {
    type,
    onChange,
    labelName,
    showIsRequired,
    classNameWrapper,
    classNameInput = '',
    classNameError,
    className = '',
    showError,
    value,
    control,
    name,
    rules,
    variant = 'input',
    autoResize = false,
    ...rest
  } = props

  const hasController = control && name
  const {
    field,
    fieldState: { error }
  } = hasController
    ? useController({ control, name, rules })
    : {
        field: {
          value: value?.toString() || ''
        },
        fieldState: {}
      }

  const [isDirty, setIsDirty] = useState<boolean>(false)
  const displayValue = isDirty ? field.value : value?.toString() || ''
  const [localValue, setLocalValue] = useState<string>(displayValue)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (hasController) {
      setLocalValue(displayValue)
    }
    if (!isDirty) {
      setIsDirty(true)
    }
  }, [field.value, hasController])

  useLayoutEffect(() => {
    if (variant === 'textarea' && autoResize) {
      adjustHeight()
    }
  }, [localValue, autoResize, variant])

  const adjustHeight = () => {
    if (textareaRef.current && autoResize) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const valueFromInput = event.target.value
    setLocalValue(valueFromInput)

    if (variant === 'textarea' && autoResize) {
      adjustHeight()
    }

    if ('onChange' in field && typeof field.onChange === 'function') {
      field.onChange(valueFromInput)
    }
    if (onChange && typeof onChange === 'function') {
      onChange(event as any)
    }
  }

  return (
    <FormFieldWrapper
      labelName={labelName}
      showIsRequired={showIsRequired}
      classNameWrapper={classNameWrapper}
      showError={showError}
      errorMessage={error?.message}
      {...rest}
    >
      {variant === 'textarea' ? (
        <textarea
          className={cn(
            'border-neutral-400 bg-white/50 focus:outline-neutral-800 mt-1 w-full rounded-md border-[1px] px-4 py-2',
            classNameInput
          )}
          {...rest}
          {...(hasController ? field : {})}
          ref={textareaRef}
          onChange={handleChange}
          value={localValue}
        />
      ) : (
        <input
          className={cn(
            'border-neutral-400 bg-white/50 focus:outline-neutral-800 mt-1 w-full rounded-md border-[1px] px-4 py-2',
            classNameInput
          )}
          {...rest}
          {...(hasController ? field : {})}
          type={type}
          onChange={handleChange}
          value={localValue}
        />
      )}
    </FormFieldWrapper>
  )
}

export default Input
