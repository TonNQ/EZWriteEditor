import { useEffect, useRef, useState } from 'react'
import { MarkdownFile } from '../../types/markdownFile.type'
import { formatDate } from '../../utils/helpers'
import BaseButton from '../Extensions/BaseButton'
import Delete from '../Icons/Delete'
import File from '../Icons/File'
import MoreVertical from '../Icons/MoreVertical'
import Share from '../Icons/Share'
import Popup from '../Popup/Popup'

interface FileListItemProps {
  file: MarkdownFile
  isSelected: boolean
  onSelect: (file: MarkdownFile) => void
  onDelete: (fileId: number) => void
  onEdit: (file: MarkdownFile) => void
  onShare: (file: MarkdownFile) => void
}

const FileListItem = ({ file, isSelected, onSelect, onDelete, onEdit, onShare }: FileListItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
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
      <div className='col-span-3 flex items-center space-x-3'>
        <File className='text-gray-400' />
        <span className='truncate'>{file.title}</span>
      </div>
      <div className='col-span-5 text-left text-sm text-gray-600'>
        <span className='block truncate' title={file.description}>
          {file.description || 'No description'}
        </span>
      </div>
      <div className='col-span-2 text-left text-sm text-gray-500'>{formatDate(new Date(file.updated_at))}</div>
      <div className='col-span-1 text-left text-sm text-gray-500'>{file.version_count}</div>
      <div className='relative col-span-1 text-right'>
        <BaseButton
          customClass='p-1 hover:bg-gray-100 rounded-full'
          onClick={(e) => {
            e?.stopPropagation()
            setMenuOpen(!menuOpen)
          }}
        >
          <MoreVertical width={20} height={20} />
        </BaseButton>
        {menuOpen && (
          <div
            ref={menuRef}
            className='absolute top-full right-0 z-50 mt-2 min-w-[150px] overflow-visible rounded-xl border border-gray-200 bg-white py-2 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:cursor-pointer hover:bg-gray-100'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onEdit(file)
                setMenuOpen(false)
              }}
            >
              <File />
              Edit
            </button>
            <button
              className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:cursor-pointer hover:bg-gray-100'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onShare(file)
                setMenuOpen(false)
              }}
            >
              <Share width={18} height={18} />
              Share
            </button>
            <button
              className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 transition hover:cursor-pointer hover:bg-red-50'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                setMenuOpen(false)
                setShowDeletePopup(true)
              }}
            >
              <Delete className='h-4 w-4' />
              Delete
            </button>
          </div>
        )}
        <Popup isOpen={showDeletePopup} onClose={() => setShowDeletePopup(false)} title='Delete File?'>
          <div className='cursor-default space-y-4'>
            <div className='text-left text-gray-700'>
              Are you sure you want to delete <b>{file.title}</b>? This action cannot be undone.
            </div>
            <div className='flex justify-end gap-2'>
              <button
                className='cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100'
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className='cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700'
                onClick={() => {
                  onDelete(file.id)
                  setShowDeletePopup(false)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default FileListItem
