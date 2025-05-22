import { Editor } from '@tiptap/react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { SUCCESS_MESSAGE } from '../../../constants/message'
import { path } from '../../../routes/path'
import markdownInstance from '../../../services/markdown.api'
import { RootState } from '../../../store'
import SaveFile from '../../Icons/SaveFile'
import BaseButton from '../BaseButton'

interface SaveFileButtonProps {
  editor: Editor | null
}

const SaveFileButton = ({ editor }: SaveFileButtonProps) => {
  const location = useLocation()
  const title = useSelector((state: RootState) => state.editor.title)
  const { id } = useParams()

  if (!editor) return null

  const handleExport = async () => {
    try {
      const html = editor.getHTML()
      const isNewFile = location.pathname === path.home || location.pathname === path.composeNewFile

      if (isNewFile) {
        await markdownInstance.createMarkdownFile({
          title: title || 'Untitled',
          description: title || 'Untitled',
          content: html
        })
      } else if (id) {
        const commitId = uuidv4()
        // TODO: Handle update existing file
        const updateMarkdownFilePromise = markdownInstance.updateMarkdownFile(id, {
          title: title || 'Untitled',
          description: title || 'Untitled'
        })

        const createVersionOfMarkdownFilePromise = markdownInstance.createVersionOfMarkdownFile(id, {
          commit_message: commitId,
          content: html
        })

        await Promise.all([updateMarkdownFilePromise, createVersionOfMarkdownFilePromise])
        toast.success(SUCCESS_MESSAGE.SAVE_MARKDOWN_FILE)
      } else {
        console.error('No file id found')
      }
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
