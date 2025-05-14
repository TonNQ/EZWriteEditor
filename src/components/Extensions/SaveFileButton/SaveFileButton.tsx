import { Editor } from '@tiptap/react'
import markdownInstance from '../../../services/markdown.api'
import SaveFile from '../../Icons/SaveFile'
import BaseButton from '../BaseButton'

interface SaveFileButtonProps {
  editor: Editor | null
}

const SaveFileButton = ({ editor }: SaveFileButtonProps) => {
  if (!editor) return null

  const handleExport = async () => {
    try {
      const html = editor.getHTML()

      // const fullHtml = `
      //   <html>
      //     <head>
      //       <meta charset="utf-8" />
      //     </head>
      //     <body>${html}</body>
      //   </html>
      // `

      // const blob = (window as any).htmlDocx.asBlob(fullHtml)
      // saveAs(blob, 'document.docx')
      await markdownInstance.createMarkdownFile({
        title: 'Untitled',
        description: 'Untitled',
        content: html
      })
    } catch (error) {
      console.error('Error creating markdown file:', error)
    }
  }

  return (
    <BaseButton onClick={handleExport}>
      <SaveFile />
    </BaseButton>
  )
}

export default SaveFileButton
