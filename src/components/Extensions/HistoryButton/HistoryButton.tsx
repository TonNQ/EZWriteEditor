import { Editor } from '@tiptap/react'
import BaseButton from '../BaseButton'
import RedoIcon from './RedoIcon'
import UndoIcon from './UndoIcon'

interface HistoryButtonProps {
  editor: Editor | null
}

const HistoryButton = ({ editor }: HistoryButtonProps) => {
  if (!editor) return null

  return (
    <div className='flex gap-1'>
      <BaseButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        tooltip='Undo'
      >
        <UndoIcon />
      </BaseButton>

      <BaseButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        tooltip='Redo'
      >
        <RedoIcon />
      </BaseButton>
    </div>
  )
}

export default HistoryButton
