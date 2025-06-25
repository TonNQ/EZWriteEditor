import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '../../../libs/tailwind/utils'
import { setLanguage } from '../../../store/editor/editor.slice'
import { EditorLanguage } from '../../../store/editor/types'
import FilledChevronDown from '../../Icons/FilledChevronDown'
import BaseButton from '../BaseButton'

type LanguageOption = {
  label: string
  value: EditorLanguage
}

const languageOptions: LanguageOption[] = [
  { label: 'English', value: 'en' },
  { label: 'Vietnamese', value: 'vi' }
]

const LanguageButton = () => {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: { editor: { language: EditorLanguage } }) => state.editor.language)
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    languageOptions.find((opt) => opt.value === currentLanguage) || languageOptions[0]
  )
  const buttonRef = useRef<HTMLDivElement | null>(null)

  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate
  })

  const setLanguageOption = (option: LanguageOption) => {
    dispatch(setLanguage(option.value))
    setSelectedLanguage(option)
    setOpen(false)
  }

  useEffect(() => {
    const newSelectedLanguage = languageOptions.find((opt) => opt.value === currentLanguage) || languageOptions[0]
    setSelectedLanguage(newSelectedLanguage)
  }, [currentLanguage])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        refs.floating.current &&
        !refs.floating.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs.floating, refs.reference])

  return (
    <div ref={buttonRef} className='relative inline-block'>
      <div ref={refs.setReference}>
        <BaseButton
          onClick={() => setOpen((prev) => !prev)}
          isActive={open}
          customClass={cn('border-neutral-400 px-3 py-1', {
            'bg-gray-100': open
          })}
          tooltip='Language'
        >
          <div className='flex items-center gap-1'>
            <span className='min-w-[64px] text-sm'>{selectedLanguage.label}</span>
            <FilledChevronDown />
          </div>
        </BaseButton>
      </div>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={cn(
            'z-50 w-40 rounded-md border border-neutral-300 bg-white py-1 shadow-lg',
            'transition-all duration-200'
          )}
        >
          {languageOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setLanguageOption(option)}
              className={cn('w-full px-4 py-2 text-left text-sm hover:bg-neutral-100', {
                'font-bold text-blue-600': option.value === currentLanguage
              })}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageButton
