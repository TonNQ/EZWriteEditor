import { Editor } from '@tiptap/react'
import BaseButton from '../BaseButton'
import StrikeIcon from './StrikeIcon'

interface StrikeButtonProps {
  editor: Editor | null
}

const StrikeButton = ({ editor }: StrikeButtonProps) => {
  if (!editor) return null

  return (
    <BaseButton
      onClick={() => editor.chain().focus().toggleStrike().run()}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
      isActive={editor.isActive('strike')}
      tooltip='Strike'
    >
      <StrikeIcon />
    </BaseButton>
  )
}

export default StrikeButton
