import { Editor } from '@tiptap/react'
import Print from '../../Icons/Print'
import BaseButton from '../BaseButton'

interface PrintButtonProps {
  editor: Editor
}

const PrintButton = ({ editor }: PrintButtonProps) => {
  const handlePrint = () => {
    if (!editor) return
    const content = editor.getHTML()
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  return (
    <BaseButton onClick={handlePrint} tooltip='Print'>
      <Print width={20} height={20} className='text-gray-default' />
    </BaseButton>
  )
}

export default PrintButton
