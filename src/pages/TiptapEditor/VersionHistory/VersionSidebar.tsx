import { useRef, useState, useEffect } from 'react'
import { ChevronDown, MoreVertical } from 'lucide-react'
import { MarkdownVersion } from '../../../types/markdownFile.type'
import { formatDateTimeDisplay } from '../../../utils/datetime'

interface VersionSidebarProps {
  versions: MarkdownVersion[]
  selectedVersion: MarkdownVersion | undefined
  showChanges: boolean
  onVersionSelect: (version: MarkdownVersion) => void
  onShowChangesToggle: (show: boolean) => void
}

const VersionSidebar = ({
  versions,
  selectedVersion,
  showChanges,
  onVersionSelect,
  onShowChangesToggle
}: VersionSidebarProps) => {
  console.log('versions', versions)
  // State for dropdowns
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false)
  const [actionDropdownOpen, setActionDropdownOpen] = useState<number | null>(null)

  // Refs for click outside detection
  const filterDropdownRef = useRef<HTMLDivElement>(null)
  const actionDropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Handle filter dropdown
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setFilterDropdownOpen(false)
      }

      // Handle action dropdowns
      if (
        actionDropdownOpen &&
        actionDropdownRefs.current[actionDropdownOpen] &&
        !actionDropdownRefs.current[actionDropdownOpen]?.contains(event.target as Node)
      ) {
        setActionDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [actionDropdownOpen])

  // Toggle filter dropdown
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen((prev) => !prev)
  }

  // Toggle action dropdown for a specific version
  const toggleActionDropdown = (id: number) => {
    setActionDropdownOpen((prev) => (prev === id ? null : id))
  }

  // Handle checkbox change
  const handleCheckboxChange = () => {
    onShowChangesToggle(!showChanges)
  }

  return (
    <div className='flex h-full w-80 flex-col border-l border-gray-200 bg-white'>
      <div className='border-b border-gray-200 p-4'>
        {/* Custom dropdown implementation */}
        <div className='relative' ref={filterDropdownRef}>
          <button
            onClick={toggleFilterDropdown}
            className='flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            aria-haspopup='true'
            aria-expanded={filterDropdownOpen}
          >
            <span>Tất cả phiên bản</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${filterDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {filterDropdownOpen && (
            <div className='absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg'>
              <ul role='menu' aria-orientation='vertical' aria-labelledby='filter-button'>
                <li>
                  <button
                    className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    role='menuitem'
                    onClick={() => setFilterDropdownOpen(false)}
                  >
                    Tất cả phiên bản
                  </button>
                </li>
                <li>
                  <button
                    className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    role='menuitem'
                    onClick={() => setFilterDropdownOpen(false)}
                  >
                    Phiên bản được đặt tên
                  </button>
                </li>
                <li>
                  <button
                    className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    role='menuitem'
                    onClick={() => setFilterDropdownOpen(false)}
                  >
                    Chỉ của tôi
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className='flex-1 overflow-auto'>
        <div className='p-2'>
          {versions.map((version, idx) => {
            const {
              id: versionId,
              created_at: createdAt,
              commit_message: commitMessage,
              version_name: versionName
            } = version
            const isCurrentVersion = selectedVersion?.id === versionId

            return (
              <div
                key={versionId}
                className={`mb-2 cursor-pointer rounded-lg p-3 transition-colors ${
                  isCurrentVersion ? 'border border-blue-200 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => onVersionSelect(version)}
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='mb-1 flex items-center gap-2'>
                      <span className='text-sm font-medium'>{versionName || formatDateTimeDisplay(createdAt)}</span>
                      {isCurrentVersion && (
                        <span className='rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700'>
                          Phiên bản hiện tại
                        </span>
                      )}
                      {!isCurrentVersion && idx === 0 && (
                        <span className='rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700'>
                          Phiên bản gốc
                        </span>
                      )}
                    </div>
                    {/* <div className='mb-1 text-left text-xs text-gray-600'>
                      <span className='mr-1 inline-block h-2 w-2 rounded-full bg-green-500'></span>
                      {version.author}
                    </div> */}
                    {commitMessage && <div className='text-left text-xs text-gray-500'>{commitMessage}</div>}
                  </div>

                  {/* Custom action dropdown */}
                  <div
                    className='relative'
                    ref={(el) => {
                      if (el) {
                        actionDropdownRefs.current[versionId] = el
                      }
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleActionDropdown(versionId)
                      }}
                      className='rounded-md p-1 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                      aria-haspopup='true'
                      aria-expanded={actionDropdownOpen === versionId}
                    >
                      <MoreVertical className='h-4 w-4' />
                    </button>

                    {actionDropdownOpen === versionId && (
                      <div className='absolute right-0 z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg'>
                        <ul role='menu' aria-orientation='vertical'>
                          <li>
                            <button
                              className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                              role='menuitem'
                              onClick={(e) => {
                                e.stopPropagation()
                                setActionDropdownOpen(null)
                              }}
                            >
                              Đặt tên phiên bản này
                            </button>
                          </li>
                          <li>
                            <button
                              className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                              role='menuitem'
                              onClick={(e) => {
                                e.stopPropagation()
                                setActionDropdownOpen(null)
                              }}
                            >
                              Tạo bản sao
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='border-t border-gray-200 p-4'>
        <div className='flex items-center space-x-2'>
          {/* Custom checkbox implementation */}
          <div className='relative flex items-center'>
            <input
              type='checkbox'
              id='show-changes'
              checked={showChanges}
              onChange={handleCheckboxChange}
              className='h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500'
            />
            <label htmlFor='show-changes' className='ml-2 cursor-pointer text-sm font-medium text-gray-700'>
              Hiển thị thay đổi
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VersionSidebar
