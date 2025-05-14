import { useEffect, useState } from 'react'
import FileDetails from '../../components/FileDetails'
import FileList from '../../components/FileList'
import Search from '../../components/Icons/Search/Search'

export type FileItem = {
  id: string
  name: string
  type: string
  size: number
  lastModified: Date
  url: string
}

const FileManagement = () => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date')
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Simulate fetching files from an API
  useEffect(() => {
    // This would be replaced with an actual API call
    const mockFiles: FileItem[] = [
      {
        id: '1',
        name: 'Project Proposal.pdf',
        type: 'application/pdf',
        size: 2500000,
        lastModified: new Date(2023, 5, 15),
        url: '/files/project-proposal.pdf'
      },
      {
        id: '2',
        name: 'Meeting Notes.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 150000,
        lastModified: new Date(2023, 6, 20),
        url: '/files/meeting-notes.docx'
      },
      {
        id: '3',
        name: 'Budget.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 500000,
        lastModified: new Date(2023, 7, 5),
        url: '/files/budget.xlsx'
      },
      {
        id: '4',
        name: 'Team Photo.jpg',
        type: 'image/jpeg',
        size: 3500000,
        lastModified: new Date(2023, 8, 10),
        url: '/files/team-photo.jpg'
      },
      {
        id: '5',
        name: 'Presentation.pptx',
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        size: 4200000,
        lastModified: new Date(2023, 9, 25),
        url: '/files/presentation.pptx'
      }
    ]
    setFiles(mockFiles)
  }, [])

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file)
    setIsDetailsOpen(true)
  }

  const handleFileUpload = (newFile: FileItem) => {
    setFiles((prevFiles) => [...prevFiles, newFile])
  }

  const handleFileDelete = (fileId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
    if (selectedFile?.id === fileId) {
      setSelectedFile(null)
      setIsDetailsOpen(false)
    }
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'date') {
      return b.lastModified.getTime() - a.lastModified.getTime()
    } else {
      return b.size - a.size
    }
  })

  return (
    <div className='flex h-full'>
      <div className={`flex-1 p-6 ${isDetailsOpen ? 'w-2/3' : 'w-full'}`}>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>My Files</h1>
          {/* <FileUploader onFileUpload={handleFileUpload} /> */}
        </div>

        <div className='mb-6 flex items-center space-x-4'>
          <div className='align-center relative flex flex-1 flex-row rounded-md border border-gray-300 px-3 py-2'>
            <Search width={24} height={24} />
            <input
              className='ml-2 flex-1 text-gray-600 outline-none'
              placeholder='Search files...'
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <FileList
          files={sortedFiles}
          onFileSelect={handleFileSelect}
          onFileDelete={handleFileDelete}
          selectedFileId={selectedFile?.id}
        />
      </div>

      {isDetailsOpen && selectedFile && (
        <div className='h-full w-1/3 border-l border-gray-200 shadow-md'>
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
