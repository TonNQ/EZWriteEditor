import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BaseButton from '../../components/Extensions/BaseButton'
import FileDetails from '../../components/FileDetails'
import FileList from '../../components/FileList'
import Search from '../../components/Icons/Search/Search'
import SharePopup from '../../components/Popup/SharePopup'
import { getEditorPage, path } from '../../routes/path'
import markdownInstance from '../../services/markdown.api'
import { AppDispatch, RootState } from '../../store'
import { deleteMarkdownFile, fetchMarkdownFiles } from '../../store/markdownFiles/markdownFiles.slice'
import { resetAllStore } from '../../store/resetStore'
import { MarkdownFile } from '../../types/markdownFile.type'

const FileManagement = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { files: markdownFiles, error } = useSelector((state: RootState) => state.markdownFiles)
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, _setSortBy] = useState<'name' | 'date' | 'size'>('date')
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'my_shares' | 'shared_with_me'>('all')
  const [files, setFiles] = useState<MarkdownFile[]>([])
  const [sharePopupOpen, setSharePopupOpen] = useState(false)
  const [shareFile, setShareFile] = useState<MarkdownFile | null>(null)

  useEffect(() => {
    dispatch(fetchMarkdownFiles())
  }, [dispatch])

  useEffect(() => {
    const fetchFiles = async () => {
      if (activeTab === 'all') {
        const res = await markdownInstance.getAllMarkdownFiles()
        setFiles(res.data)
      } else if (activeTab === 'my_shares') {
        const res = await markdownInstance.getMySharedMarkdownFiles()
        setFiles(res.data as any)
      } else if (activeTab === 'shared_with_me') {
        const res = await markdownInstance.getMarkdownFilesSharedWithMe()
        setFiles(res.data)
      }
    }
    fetchFiles()
  }, [activeTab])

  const handleFileSelect = (file: MarkdownFile) => {
    setSelectedFile(file)
    setIsDetailsOpen(true)
  }

  const handleFileDelete = (fileId: number) => {
    // This will be implemented when we add file delete functionality
    if (selectedFile?.id === fileId) {
      setSelectedFile(null)
      setIsDetailsOpen(false)
      dispatch(deleteMarkdownFile(fileId.toString()))
    }
  }

  const navigateToNewFile = () => {
    resetAllStore()
    navigate(path.compose)
  }

  const filteredFiles = markdownFiles.filter((file) => file.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title)
    } else if (sortBy === 'date') {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    } else {
      return b.version_count - a.version_count
    }
  })

  if (error) {
    return <div className='flex h-full items-center justify-center text-red-500'>{error}</div>
  }

  return (
    <div className='flex h-full'>
      <div className={`flex-1 p-6 ${isDetailsOpen ? 'w-3/4' : 'w-full'}`}>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>My Files</h1>
        </div>
        <div className='mb-4 flex space-x-4'>
          <button
            className={`rounded px-4 py-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Files
          </button>
          <button
            className={`rounded px-4 py-2 ${activeTab === 'my_shares' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('my_shares')}
          >
            My Shares
          </button>
          <button
            className={`rounded px-4 py-2 ${activeTab === 'shared_with_me' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('shared_with_me')}
          >
            Shared With Me
          </button>
        </div>
        <div className='mb-6 flex h-[42px] items-center space-x-4'>
          <div className='align-center relative flex h-full flex-1 flex-row rounded-md border border-gray-300 px-3 py-2'>
            <Search width={24} height={24} />
            <input
              className='ml-2 flex-1 text-gray-600 outline-none'
              placeholder='Search files...'
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
          <BaseButton
            customClass='px-6 bg-blue-500 text-white font-semibold h-full hover:bg-blue-600 rounded-md'
            onClick={navigateToNewFile}
          >
            Create new file
          </BaseButton>
        </div>
        <FileList
          files={files.filter((file) => file.title.toLowerCase().includes(searchQuery.toLowerCase()))}
          onFileSelect={handleFileSelect}
          onFileDelete={handleFileDelete}
          onEdit={(file) => navigate(getEditorPage(file.id.toString()))}
          onShare={(file) => {
            setShareFile(file)
            setSharePopupOpen(true)
          }}
          selectedFileId={selectedFile?.id}
        />
        <SharePopup file={shareFile} isOpen={sharePopupOpen} onClose={() => setSharePopupOpen(false)} />
      </div>
      {isDetailsOpen && selectedFile && (
        <div className='h-full w-1/4 border-l border-gray-200 shadow-md'>
          <FileDetails
            file={selectedFile}
            onClose={() => setIsDetailsOpen(false)}
            onDelete={() => handleFileDelete(selectedFile.id)}
          />
        </div>
      )}
    </div>
  )
}

export default FileManagement
