import { Editor } from '@tiptap/react'
import BaseButton from '../BaseButton'
import BoldIcon from './BoldIcon'

interface BoldButtonProps {
  editor: Editor | null
}

const BoldButton = ({ editor }: BoldButtonProps) => {
  if (!editor) return null

  return (
    <BaseButton
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      isActive={editor.isActive('bold')}
      tooltip='Bold'
    >
      <BoldIcon />
    </BaseButton>
  )
}

export default BoldButton
