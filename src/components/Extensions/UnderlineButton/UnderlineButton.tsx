import { Editor } from '@tiptap/react'
import BaseButton from '../BaseButton'
import UnderlineIcon from './UnderlineIcon'

interface UnderlineButtonProps {
  editor: Editor | null
}

const UnderlineButton = ({ editor }: UnderlineButtonProps) => {
  if (!editor) return null

  return (
    <BaseButton
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      disabled={!editor.can().chain().focus().toggleUnderline().run()}
      isActive={editor.isActive('underline')}
    >
      <UnderlineIcon />
    </BaseButton>
  )
}

export default UnderlineButton
