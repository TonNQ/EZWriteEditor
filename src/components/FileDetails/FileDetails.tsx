import { FileItem } from '../../pages/FileManagement/FileManagement'
import { formatDate, formatFileSize } from '../../utils/helpers'
import Button from '../Button'
import Close from '../Icons/Close'
import Delete from '../Icons/Delete'
import Download from '../Icons/Download'
import File from '../Icons/File'

interface FileDetailsProps {
  file: FileItem
  onClose: () => void
  onDelete: () => void
}

const FileDetails = ({ file, onClose, onDelete }: FileDetailsProps) => {
  const renderPreview = (
    <div className='mb-6 flex h-[300px] flex-col items-center justify-center rounded-lg bg-gray-50'>
      <File />
      <p className='mt-4 text-gray-500'>Preview not available</p>
    </div>
  )

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between border-b border-gray-200 p-4'>
        <h2 className='text-lg font-semibold text-gray-600'>File Details</h2>
        <div onClick={onClose} className='cursor-pointer opacity-90 hover:opacity-100'>
          <Close />
        </div>
      </div>

      <div className='flex-1 overflow-auto p-6'>
        {renderPreview}

        <h3 className='mb-4 text-xl font-medium break-words text-gray-600'>{file.name}</h3>

        <div className='space-y-4'>
          <div className='grid grid-cols-3 gap-2 text-sm'>
            <div className='text-left text-gray-500'>Size</div>
            <div className='col-span-2 text-left'>{formatFileSize(file.size)}</div>
          </div>

          <div className='grid grid-cols-3 gap-2 text-sm'>
            <div className='text-left text-gray-500'>Modified</div>
            <div className='col-span-2 text-left'>{formatDate(file.lastModified, true)}</div>
          </div>
        </div>
      </div>

      <div className='flex justify-between gap-2 border-t border-gray-200 p-4 text-gray-600'>
        <Button
          title='Download'
          iconComponent={<Download />}
          onClick={() => window.open(file.url, '_blank')}
          classButton='border border-gray-200 rounded-lg hover:cursor-pointer hover:bg-gray-50'
        />
        <Button
          title='Delete'
          iconComponent={<Delete className='text-white' />}
          onClick={onDelete}
          classButton='rounded-lg border border-red-500 bg-red-500/90 text-white hover:cursor-pointer hover:bg-red-500'
        />
      </div>
    </div>
  )
}

export default FileDetails
