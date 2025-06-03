import { useDispatch } from 'react-redux'
import { setIsShowHistory } from '../../../store/editor/editor.slice'
import VersionHeader from './VersionHeader'
import MainEditorContent from '../MainEditorContent'
import { useEditor, type Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import VersionSidebar from './VersionSidebar'
import { useParams } from 'react-router-dom'
import markdownInstance from '../../../services/markdown.api'
import { MarkdownVersion } from '../../../types/markdownFile.type'
import { formatDateTimeDisplay } from '../../../utils/datetime'
import { editorExtensions } from '../../../utils/extensions'

const useMarkdownVersions = (fileId?: string) => {
  const editor = useEditor({
    extensions: editorExtensions,
    content: '',
    editable: false
  })
  const [versions, setVersions] = useState<MarkdownVersion[]>([])
  const [selectedVersion, setSelectedVersion] = useState<MarkdownVersion>()
  const [loadingVersions, setLoadingVersions] = useState<boolean>(false)
  const [errorVersions, setErrorVersions] = useState<string | null>(null)
  const [loadingVersionContent, setLoadingVersionContent] = useState<boolean>(false)
  const [errorVersionContent, setErrorVersionContent] = useState<string | null>(null)

  const getVersionContentOfMarkdownFile = async ({ fileId, versionId }: { fileId: string; versionId: string }) => {
    if (!fileId || !versionId) return

    try {
      setLoadingVersionContent(true)
      const response = await markdownInstance.getVersionContentOfMarkdownFile(fileId, versionId)
      return response.data.content || ''
    } catch (error) {
      console.error('Error fetching version content:', error)
      setErrorVersionContent('Failed to load version content. Please try again.')
    } finally {
      setLoadingVersionContent(false)
    }
  }

  useEffect(() => {
    if (!fileId) return

    const fetchVersions = async () => {
      setLoadingVersions(true)
      setErrorVersions(null)

      try {
        const response = await markdownInstance.getAllVersionsOfMarkdownFile(fileId)
        setVersions(response.data || [])
        setSelectedVersion(response.data[0])
      } catch (err) {
        console.error('Error fetching versions:', err)
        setErrorVersions('Failed to load versions. Please try again.')
        setVersions([])
        setSelectedVersion(undefined)
      } finally {
        setLoadingVersions(false)
      }
    }

    fetchVersions()
  }, [fileId])

  useEffect(() => {
    if (!editor || !selectedVersion) return

    const fetchContent = async () => {
      try {
        const content = await getVersionContentOfMarkdownFile({
          fileId: fileId?.toString() || '',
          versionId: selectedVersion.id.toString()
        })
        editor.commands.setContent(content || '')
      } catch (error) {
        console.error('Error fetching version content:', error)
        editor.commands.setContent('')
      }
    }

    fetchContent()
  }, [editor, selectedVersion])

  return {
    versions,
    loadingVersions,
    errorVersions,
    loadingVersionContent,
    errorVersionContent,
    selectedVersion,
    setSelectedVersion,
    editor
  }
}

const VersionHistory = () => {
  const [showChanges, setShowChanges] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { id: fileId } = useParams()
  const {
    versions,
    loadingVersions,
    errorVersions,
    loadingVersionContent,
    errorVersionContent,
    selectedVersion,
    setSelectedVersion,
    editor
  } = useMarkdownVersions(fileId)

  const handleBack = () => {
    // Navigate back to document editor
    dispatch(setIsShowHistory(false))
  }

  const handleVersionSelect = (version: MarkdownVersion) => {
    setSelectedVersion(version)
  }

  const handleShowChangesToggle = (show: boolean) => {
    setShowChanges(show)
  }

  return (
    <>
      <VersionHeader
        timestamp={selectedVersion ? formatDateTimeDisplay(selectedVersion.created_at) : ''}
        onBack={handleBack}
      />

      <div className='flex flex-1 overflow-hidden bg-gray-50'>
        <div className='h-full flex-1 overflow-auto px-6 py-4'>
          <MainEditorContent editor={editor as Editor} />
        </div>

        <VersionSidebar
          versions={versions}
          selectedVersion={selectedVersion}
          showChanges={showChanges}
          onVersionSelect={handleVersionSelect}
          onShowChangesToggle={handleShowChangesToggle}
        />
      </div>
    </>
  )
}

export default VersionHistory
