'use client'

import type { Editor } from '@tiptap/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { SUCCESS_MESSAGE } from '../../../constants/message'
import { path } from '../../../routes/path'
import markdownInstance from '../../../services/markdown.api'
import type { RootState } from '../../../store'
import SaveFile from '../../Icons/SaveFile'
import Popup from '../../Popup/Popup'
import SaveFileForm from '../../SaveFileForm/SaveFileForm'
import BaseButton from '../BaseButton'

interface SaveFileButtonProps {
  editor: Editor | null
}

const SaveFileButton = ({ editor }: SaveFileButtonProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const title = useSelector((state: RootState) => state.editor.title)
  const { id } = useParams()

  if (!editor) return null

  const handleSaveClick = () => {
    setIsPopupOpen(true)
  }

  const handleSave = async (formData: { title: string; description: string; versionName: string }) => {
    setIsLoading(true)

    try {
      const html = editor.getHTML()
      const isNewFile = location.pathname === path.home || location.pathname === path.compose

      if (isNewFile) {
        await markdownInstance.createMarkdownFile({
          title: formData.title,
          description: formData.description || formData.title,
          content: html
        })
        toast.success(SUCCESS_MESSAGE.SAVE_MARKDOWN_FILE)
      } else if (id) {
        const commitId = formData.versionName || uuidv4()

        const updateMarkdownFilePromise = markdownInstance.updateMarkdownFile(id, {
          title: formData.title,
          description: formData.description || formData.title
        })

        const createVersionOfMarkdownFilePromise = markdownInstance.createVersionOfMarkdownFile(id, {
          commit_message: commitId,
          content: html
        })

        await Promise.all([updateMarkdownFilePromise, createVersionOfMarkdownFilePromise])
        toast.success(SUCCESS_MESSAGE.SAVE_MARKDOWN_FILE)
      } else {
        console.error('No file id found')
        toast.error('Error: No file ID found')
        return
      }

      setIsPopupOpen(false)
    } catch (error) {
      console.error('Error saving markdown file:', error)
      toast.error('Error saving file. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsPopupOpen(false)
  }

  return (
    <>
      <BaseButton onClick={handleSaveClick}>
        <SaveFile />
      </BaseButton>

      <Popup isOpen={isPopupOpen} onClose={handleCancel} title='Save file'>
        <SaveFileForm initialTitle={title} onSave={handleSave} onCancel={handleCancel} isLoading={isLoading} />
      </Popup>
    </>
  )
}

export default SaveFileButton
