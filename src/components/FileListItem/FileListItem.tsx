import { useEffect, useRef, useState } from 'react'
import { MarkdownFile } from '../../types/markdownFile.type'
import { formatDate } from '../../utils/helpers'
import Button from '../Button'
import Delete from '../Icons/Delete'
import File from '../Icons/File'
import MoreVertical from '../Icons/MoreVertical'

interface FileListItemProps {
  file: MarkdownFile
  isSelected: boolean
  onSelect: (file: MarkdownFile) => void
  onDelete: (fileId: number) => void
}

const FileListItem = ({ file, isSelected, onSelect, onDelete }: FileListItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={`grid cursor-pointer grid-cols-12 items-center p-3 hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
      onClick={() => onSelect(file)}
    >
      <div className='col-span-6 flex items-center space-x-3'>
        <File className='text-gray-400' />
        <span className='truncate'>{file.title}</span>
      </div>
      <div className='col-span-3 text-left text-sm text-gray-500'>{formatDate(new Date(file.updated_at))}</div>
      <div className='col-span-2 text-left text-sm text-gray-500'>{file.version_count}</div>
      <div className='col-span-1 text-right'>
        <Button
          variant='ghost'
          size='sm'
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen(!menuOpen)
          }}
        >
          <MoreVertical className='h-5 w-5 text-gray-500' />
        </Button>
        {menuOpen && (
          <div
            ref={menuRef}
            className='ring-opacity-5 absolute right-4 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black'
          >
            <button
              className='flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
              onClick={(e) => {
                e.stopPropagation()
                onDelete(file.id)
                setMenuOpen(false)
              }}
            >
              <Delete className='mr-2 h-4 w-4' />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileListItem
