import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react'
import { Editor } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../../libs/tailwind/utils'
import FilledChevronDown from '../../Icons/FilledChevronDown'
import BaseButton from '../BaseButton'

type FontSizeOption = {
  label: string
  size: string
}

const fontSizeOptions: FontSizeOption[] = [
  { label: '10px', size: '10px' },
  { label: '11px', size: '11px' },
  { label: '12px', size: '12px' },
  { label: '14px', size: '14px' },
  { label: '16px', size: '16px' },
  { label: '18px', size: '18px' },
  { label: '20px', size: '20px' },
  { label: '22px', size: '22px' },
  { label: '24px', size: '24px' },
  { label: '26px', size: '26px' },
  { label: '28px', size: '28px' },
  { label: '36px', size: '36px' },
  { label: '48px', size: '48px' },
  { label: '72px', size: '72px' }
]

interface FontSizeButtonProps {
  editor: Editor | null
}

const FontSizeButton = ({ editor }: FontSizeButtonProps) => {
  if (!editor) return null
  const [open, setOpen] = useState(false)
  const [selectedFontSize, setSelectedFontSize] = useState<FontSizeOption>(fontSizeOptions[4]) // Default to 16px
  const buttonRef = useRef<HTMLDivElement | null>(null)

  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate
  })

  if (!editor) return null

  const handleSelectFontSize = (option: FontSizeOption) => {
    console.log(option.size)
    editor.chain().focus().setFontSize(option.size).run()
    setSelectedFontSize(option)
    setOpen(false)
  }

  useEffect(() => {
    if (!editor) return

    const updateFontSizeState = () => {
      const attrs = editor.getAttributes('fontSize')
      const currentFontSize = attrs.fontSize
      const matched = fontSizeOptions.find((opt) => opt.size === currentFontSize)

      if (matched) {
        setSelectedFontSize(matched)
      } else {
        // set default font size: 16px
        setSelectedFontSize(fontSizeOptions[4])
      }
    }

    updateFontSizeState()
    editor.on('selectionUpdate', updateFontSizeState)

    return () => {
      editor.off('selectionUpdate', updateFontSizeState)
    }
  }, [editor])

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
  }, [refs.floating])

  return (
    <div ref={buttonRef} className='relative inline-block'>
      <div ref={refs.setReference}>
        <BaseButton
          onClick={() => setOpen((prev) => !prev)}
          isActive={open}
          customClass={cn('border-neutral-400 px-3 py-1', {
            'bg-gray-200': open
          })}
          tooltip='Font Size'
        >
          <div className='flex items-center gap-1'>
            <span className='min-w-[64px] text-sm'>{selectedFontSize.label}</span>
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
          {fontSizeOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleSelectFontSize(option)}
              className={cn('w-full px-4 py-2 text-left text-sm hover:bg-neutral-100', {
                'font-bold text-blue-600': selectedFontSize.size === option.size
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

export default FontSizeButton
