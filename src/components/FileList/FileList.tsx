import { FileItem } from '../../pages/FileManagement/FileManagement'
import FileListItem from '../FileListItem'
import File from '../Icons/File'

interface FileListProps {
  files: FileItem[]
  onFileSelect: (file: FileItem) => void
  onFileDelete: (fileId: string) => void
  selectedFileId?: string
}

export function FileList({ files, onFileSelect, onFileDelete, selectedFileId }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className='flex h-64 flex-col items-center justify-center text-gray-500'>
        <File width={48} height={48} className='mb-4 opacity-50' />
        <p className='text-lg'>No files found</p>
        <p className='text-sm'>Upload files to get started</p>
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-lg border border-gray-300'>
      <div className='grid grid-cols-12 bg-gray-200 p-3 text-sm font-medium text-gray-500'>
        <div className='col-span-6 text-left'>Name</div>
        <div className='col-span-3 text-left'>Last Modified</div>
        <div className='col-span-2 text-left'>Size</div>
        <div className='col-span-1 text-left'></div>
      </div>
      <div className='divide-y divide-gray-300'>
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
            isSelected={selectedFileId === file.id}
            onSelect={onFileSelect}
            onDelete={onFileDelete}
          />
        ))}
      </div>
    </div>
  )
}
