import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BaseButton from '../../components/Extensions/BaseButton'
import FileDetails from '../../components/FileDetails'
import FileList from '../../components/FileList'
import Search from '../../components/Icons/Search/Search'
import { path } from '../../routes/path'
import { AppDispatch, RootState } from '../../store'
import { deleteMarkdownFile, fetchMarkdownFiles } from '../../store/markdownFiles/markdownFiles.slice'
import { resetAllStore } from '../../store/resetStore'
import { MarkdownFile } from '../../types/markdownFile.type'

const FileManagement = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { files: markdownFiles, loading, error } = useSelector((state: RootState) => state.markdownFiles)
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date')
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchMarkdownFiles())
  }, [dispatch])

  const handleFileSelect = (file: MarkdownFile) => {
    setSelectedFile(file)
    setIsDetailsOpen(true)
  }

  const handleFileUpload = (newFile: MarkdownFile) => {
    // This will be implemented when we add file upload functionality
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
    navigate(path.composeNewFile)
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
          files={sortedFiles}
          onFileSelect={handleFileSelect}
          onFileDelete={handleFileDelete}
          selectedFileId={selectedFile?.id}
        />
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
