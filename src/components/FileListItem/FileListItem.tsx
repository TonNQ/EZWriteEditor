import { useEffect, useRef, useState } from 'react'
import { FileItem } from '../../pages/FileManagement/FileManagement'
import { formatDate, formatFileSize } from '../../utils/helpers'
import Button from '../Button'
import Delete from '../Icons/Delete'
import File from '../Icons/File'
import MoreVertical from '../Icons/MoreVertical'

interface FileListItemProps {
  file: FileItem
  isSelected: boolean
  onSelect: (file: FileItem) => void
  onDelete: (fileId: string) => void
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
        <span className='truncate'>{file.name}</span>
      </div>
      <div className='col-span-3 text-left text-sm text-gray-500'>{formatDate(file.lastModified)}</div>
      <div className='col-span-2 text-left text-sm text-gray-500'>{formatFileSize(file.size)}</div>
      <div
        className='relative col-span-1 flex justify-end text-left'
        onClick={(e) => e.stopPropagation()}
        ref={menuRef}
      >
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className='rounded p-1 hover:cursor-pointer hover:bg-gray-200'
        >
          <MoreVertical />
        </button>

        {menuOpen && (
          <div className='absolute top-full right-0 z-10 mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg'>
            <Button
              title='Delete'
              onClick={() => {
                onDelete(file.id)
                setMenuOpen(false)
              }}
              iconComponent={<Delete className='mr-2' />}
              className='flex w-full items-center px-3 py-2 text-sm font-normal text-red-600 hover:cursor-pointer hover:bg-gray-100'
              classTitle='font-normal'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FileListItem
