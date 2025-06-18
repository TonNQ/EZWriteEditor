import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import BaseButton from '../../components/Extensions/BaseButton'
import FileDetails from '../../components/FileDetails'
import FileList from '../../components/FileList'
import Search from '../../components/Icons/Search/Search'
import SharePopup from '../../components/Popup/SharePopup'
import SortAlphabeticalAsc from '../../components/Icons/SortAlphabeticalAsc'
import SortAlphabeticalDesc from '../../components/Icons/SortAlphabeticalDesc'
import SortDateAsc from '../../components/Icons/SortDateAsc'
import SortDateDesc from '../../components/Icons/SortDateDesc'
import SortDefault from '../../components/Icons/SortDefault'
import SortNumberAsc from '../../components/Icons/SortNumberAsc'
import SortNumberDesc from '../../components/Icons/SortNumberDesc'
import { getEditorPage, path } from '../../routes/path'
import markdownInstance from '../../services/markdown.api'
import { AppDispatch, RootState } from '../../store'
import { deleteMarkdownFile, fetchMarkdownFiles } from '../../store/markdownFiles/markdownFiles.slice'
import { resetAllStore } from '../../store/resetStore'
import { MarkdownFile } from '../../types/markdownFile.type'

// Custom hook for debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Sort options type
type SortOption = {
  key: 'default' | 'name' | 'date' | 'size'
  label: string
  direction: 'asc' | 'desc'
  icon: React.ComponentType<{ className?: string }>
}

const FileManagement = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { files: markdownFiles, error } = useSelector((state: RootState) => state.markdownFiles)
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>({
    key: 'default',
    label: 'Default Order',
    direction: 'asc',
    icon: SortDefault
  })
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'my_shares' | 'shared_with_me'>('all')
  const [files, setFiles] = useState<MarkdownFile[]>([])
  const [sharePopupOpen, setSharePopupOpen] = useState(false)
  const [shareFile, setShareFile] = useState<MarkdownFile | null>(null)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.sort-dropdown')) {
        setShowSortDropdown(false)
      }
    }

    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSortDropdown])

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

  // Filter files based on search query
  const filteredFiles = useCallback(() => {
    if (!debouncedSearchQuery.trim()) {
      return files
    }

    return files.filter(
      (file) =>
        file.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        file.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  }, [files, debouncedSearchQuery])

  // Sort files based on sort option
  const sortedFiles = useCallback(() => {
    const filtered = filteredFiles()

    // If default sort, return files in original API order
    if (sortOption.key === 'default') {
      return filtered
    }

    return [...filtered].sort((a, b) => {
      let comparison = 0

      switch (sortOption.key) {
        case 'name':
          comparison = a.title.localeCompare(b.title)
          break
        case 'date':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
          break
        case 'size':
          comparison = (a.version_count || 0) - (b.version_count || 0)
          break
        default:
          comparison = 0
      }

      return sortOption.direction === 'asc' ? comparison : -comparison
    })
  }, [filteredFiles, sortOption])

  // Helper function to get sort icon
  const getSortIcon = (option: SortOption) => {
    const IconComponent = option.icon
    return <IconComponent className='h-5 w-5' />
  }

  // Sort options
  const sortOptions: SortOption[] = [
    { key: 'default', label: 'Default Order', direction: 'asc', icon: SortDefault },
    { key: 'name', label: 'Name A-Z', direction: 'asc', icon: SortAlphabeticalAsc },
    { key: 'name', label: 'Name Z-A', direction: 'desc', icon: SortAlphabeticalDesc },
    { key: 'date', label: 'Date Modified (Newest)', direction: 'desc', icon: SortDateDesc },
    { key: 'date', label: 'Date Modified (Oldest)', direction: 'asc', icon: SortDateAsc },
    { key: 'size', label: 'Version Count (High to Low)', direction: 'desc', icon: SortNumberDesc },
    { key: 'size', label: 'Version Count (Low to High)', direction: 'asc', icon: SortNumberAsc }
  ]

  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
    setShowSortDropdown(false)
  }

  if (error) {
    return <div className='flex h-full items-center justify-center text-red-500'>{error}</div>
  }

  return (
    <div className='flex h-full'>
      <div className={`flex-1 p-6 ${isDetailsOpen ? 'w-3/4' : 'w-full'}`}>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>My Files</h1>
          <BaseButton
            customClass='px-6 bg-blue-500 text-white font-semibold py-5 hover:bg-blue-600 rounded-md transition-colors'
            onClick={navigateToNewFile}
          >
            Create new file
          </BaseButton>
        </div>
        <div className='mb-4 flex space-x-4'>
          <button
            className={`rounded px-4 py-2 font-medium transition-colors hover:cursor-pointer ${
              activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Files
          </button>
          <button
            className={`rounded px-4 py-2 font-medium transition-colors hover:cursor-pointer ${
              activeTab === 'my_shares' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('my_shares')}
          >
            My Shares
          </button>
          <button
            className={`rounded px-4 py-2 font-medium transition-colors hover:cursor-pointer ${
              activeTab === 'shared_with_me' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('shared_with_me')}
          >
            Shared With Me
          </button>
        </div>

        {/* Search and Sort Controls */}
        <div className='mb-6 flex h-[42px] items-center space-x-4'>
          {/* Search Input */}
          <div className='align-center relative flex h-full flex-1 flex-row rounded-md border border-gray-300 px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200'>
            <Search width={20} height={20} className='text-gray-400' />
            <input
              className='ml-2 flex-1 text-gray-600 placeholder-gray-400 outline-none'
              placeholder='Search files by name or description...'
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className='ml-2 text-gray-400 hover:text-gray-600'>
                ×
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className='sort-dropdown relative h-full'>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className='flex h-full items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            >
              {getSortIcon(sortOption)}
              <span>{sortOption.label}</span>
              <ChevronDown className='h-4 w-4' />
            </button>

            {/* Sort Dropdown Menu */}
            {showSortDropdown && (
              <div className='absolute top-full right-0 z-10 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg'>
                <div className='py-1'>
                  {sortOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSortChange(option)}
                      className={`flex w-full items-center space-x-2 px-4 py-2 text-left text-sm hover:cursor-pointer hover:bg-gray-100 ${
                        sortOption.key === option.key && sortOption.direction === option.direction
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {getSortIcon(option)}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className='mb-4 text-sm text-gray-500'>
          {debouncedSearchQuery && (
            <span>
              Found {sortedFiles().length} file{sortedFiles().length !== 1 ? 's' : ''} for "{debouncedSearchQuery}"
            </span>
          )}
          {!debouncedSearchQuery && (
            <span>
              {files.length} file{files.length !== 1 ? 's' : ''} total
            </span>
          )}
        </div>

        <FileList
          files={sortedFiles()}
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
