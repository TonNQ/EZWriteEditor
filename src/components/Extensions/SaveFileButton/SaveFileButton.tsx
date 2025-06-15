'use client'

import type { Editor } from '@tiptap/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SUCCESS_MESSAGE } from '../../../constants/message'
import { path } from '../../../routes/path'
import markdownInstance from '../../../services/markdown.api'
import type { RootState } from '../../../store'
import { setFileInformation } from '../../../store/editor/editor.slice'
import { SaveFileFormData } from '../../../types/markdownFile.type'
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
  const dispatch = useDispatch()

  if (!editor) return null

  const handleSaveClick = () => {
    setIsPopupOpen(true)
  }

  const handleSave = async (formData: SaveFileFormData) => {
    setIsLoading(true)

    try {
      const html = editor.getHTML()
      const isNewFile = location.pathname === path.home || location.pathname === path.compose

      if (isNewFile) {
        const response = await markdownInstance.createMarkdownFile({
          title: formData.title,
          description: formData.description || formData.title,
          content: html
        })
        dispatch(
          setFileInformation({
            title: response.data.title,
            description: response.data.description
          })
        )
        toast.success(SUCCESS_MESSAGE.SAVE_MARKDOWN_FILE)
      } else if (id) {
        const updateMarkdownFilePromise = markdownInstance.updateMarkdownFile(id, {
          title: formData.title,
          description: formData.description || formData.title
        })

        const createVersionOfMarkdownFilePromise = markdownInstance.createVersionOfMarkdownFile(id, {
          version_name: formData.versionName,
          commit_message: formData.commitMessage,
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
