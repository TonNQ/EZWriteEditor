import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react'
import { Editor } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../../libs/tailwind/utils'
import FilledChevronDown from '../../Icons/FilledChevronDown'
import BaseButton from '../BaseButton'

type Level = 1 | 2 | 3 | 4 | 5 | 6
type HeadingOption = {
  label: string
  level: Level | null
}

interface HeadingButtonProps {
  editor: Editor | null
}

const headingOptions: HeadingOption[] = [
  { label: 'Paragraph', level: null },
  { label: 'Heading 1', level: 1 },
  { label: 'Heading 2', level: 2 },
  { label: 'Heading 3', level: 3 },
  { label: 'Heading 4', level: 4 },
  { label: 'Heading 5', level: 5 },
  { label: 'Heading 6', level: 6 }
]

const HeadingButton = ({ editor }: HeadingButtonProps) => {
  if (!editor) return null

  const [open, setOpen] = useState(false)
  const [selectedHeading, setSelectedHeading] = useState<HeadingOption>(headingOptions[0])
  const buttonRef = useRef<HTMLDivElement | null>(null)

  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate
  })

  const isActive = (level: Level | null) => {
    return level === null ? editor.isActive('paragraph') : editor.isActive('heading', { level })
  }

  const setHeading = (option: HeadingOption) => {
    if (option.level === null) {
      editor.chain().focus().setParagraph().run()
    } else {
      editor.chain().focus().toggleHeading({ level: option.level }).run()
    }
    setSelectedHeading(option)
    setOpen(false)
  }

  useEffect(() => {
    if (!editor) return

    const updateHeadingState = () => {
      if (editor.isActive('paragraph')) {
        setSelectedHeading(headingOptions[0])
      } else {
        const matched = headingOptions.find(
          (opt) => opt.level !== null && editor.isActive('heading', { level: opt.level })
        )
        if (matched) {
          setSelectedHeading(matched)
        }
      }
    }

    updateHeadingState()
    editor.on('selectionUpdate', updateHeadingState)

    return () => {
      editor.off('selectionUpdate', updateHeadingState)
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
  }, [refs.floating, refs.reference])

  return (
    <div ref={buttonRef} className='relative inline-block'>
      <div ref={refs.setReference}>
        <BaseButton
          onClick={() => setOpen((prev) => !prev)}
          isActive={open}
          customClass={cn('border-neutral-400 bg-white px-3 py-1', {
            'bg-gray-100': open
          })}
        >
          <div className='flex items-center gap-1'>
            <span className='min-w-[64px] text-sm'>{selectedHeading.label}</span>
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
          {headingOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setHeading(option)}
              className={cn('w-full px-4 py-2 text-left text-sm hover:bg-neutral-100', {
                'font-bold text-blue-600': isActive(option.level)
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

export default HeadingButton
