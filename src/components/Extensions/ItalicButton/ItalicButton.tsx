import { Editor } from '@tiptap/react'
import BaseButton from '../BaseButton'
import ItalicIcon from './ItalicIcon'

interface ItalicButtonProps {
  editor: Editor | null
}

const ItalicButton = ({ editor }: ItalicButtonProps) => {
  if (!editor) return null

  return (
    <BaseButton
      onClick={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      isActive={editor.isActive('italic')}
    >
      <ItalicIcon />
    </BaseButton>
  )
}

export default ItalicButton
