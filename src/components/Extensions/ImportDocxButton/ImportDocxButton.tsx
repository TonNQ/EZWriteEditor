import { Editor } from '@tiptap/react'
import mammoth from 'mammoth'
import Import from '../../Icons/Import'
import BaseButton from '../BaseButton'

interface ImportDocxButtonProps {
  editor: Editor | null
}

const ImportDocxButton = ({ editor }: ImportDocxButtonProps) => {
  if (!editor) return null

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file || !editor) return

    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
      const html = result.value
      console.log('html', result, html)

      editor.commands.setContent(html, false)
    } catch (err) {
      console.error('Failed to import DOCX:', err)
    }
  }

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.docx'
    input.onchange = handleFileChange
    input.click()
  }

  return (
    <BaseButton onClick={handleClick}>
      <Import />
    </BaseButton>
  )
}

export default ImportDocxButton
