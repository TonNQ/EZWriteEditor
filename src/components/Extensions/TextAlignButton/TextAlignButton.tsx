import { Editor } from '@tiptap/react'
import BaseButton from '../BaseButton'
import AlignCenterIcon from './AlignCenterIcon'
import AlignJustifyIcon from './AlignJustifyIcon'
import AlignLeftIcon from './AlignLeftIcon'
import AlignRightIcon from './AlignRightIcon'

interface TextAlignButtonProps {
  editor: Editor
}

const alignments = ['left', 'center', 'right', 'justify'] as const
type Alignment = (typeof alignments)[number]

const icons: Record<Alignment, React.ReactNode> = {
  left: <AlignLeftIcon />,
  center: <AlignCenterIcon />,
  right: <AlignRightIcon />,
  justify: <AlignJustifyIcon />
}

export const TextAlignButton = ({ editor }: TextAlignButtonProps) => {
  if (!editor) return null

  const applyAlignment = (alignment: Alignment) => {
    editor.chain().focus().setTextAlign(alignment).run()
  }

  return (
    <div className='flex gap-1'>
      {alignments.map((align) => {
        const isActive = editor.isActive({ textAlign: align })

        return (
          <BaseButton key={align} onClick={() => applyAlignment(align)} isActive={isActive} tooltip={align}>
            {icons[align]}
          </BaseButton>
        )
      })}
    </div>
  )
}

export default TextAlignButton
