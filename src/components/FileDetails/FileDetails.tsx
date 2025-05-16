import { MarkdownFile } from '../../types/markdownFile.type'
import { formatDate } from '../../utils/helpers'
import Button from '../Button'
import Close from '../Icons/Close'
import Delete from '../Icons/Delete'
import Download from '../Icons/Download'
import Edit from '../Icons/Edit'

interface FileDetailsProps {
  file: MarkdownFile
  onClose: () => void
  onDelete: (fileId: number) => void
}

const FileDetails = ({ file, onClose, onDelete }: FileDetailsProps) => {
  return (
    <div className='flex h-full flex-col p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>File Details</h2>
        <Button title='' onClick={onClose} classButton='p-1 hover:bg-gray-100 rounded-full' iconComponent={<Close />} />
      </div>

      <div className='mb-6 space-y-4'>
        <div>
          <h3 className='mb-1 text-sm font-medium text-gray-500'>Title</h3>
          <p className='text-gray-900'>{file.title}</p>
        </div>

        <div>
          <h3 className='mb-1 text-sm font-medium text-gray-500'>Description</h3>
          <p className='text-gray-900'>{file.description}</p>
        </div>

        <div>
          <h3 className='mb-1 text-sm font-medium text-gray-500'>Created</h3>
          <p className='text-gray-900'>{formatDate(new Date(file.created_at))}</p>
        </div>

        <div>
          <h3 className='mb-1 text-sm font-medium text-gray-500'>Last Modified</h3>
          <p className='text-gray-900'>{formatDate(new Date(file.updated_at))}</p>
        </div>

        <div>
          <h3 className='mb-1 text-sm font-medium text-gray-500'>Versions</h3>
          <p className='text-gray-900'>{file.version_count}</p>
        </div>
      </div>

      <div className='mt-auto space-y-3'>
        <Button
          title='Edit'
          onClick={() => window.open(`/editor/${file.id}`, '_blank')}
          classButton='w-full border border-gray-200 rounded-lg hover:bg-gray-50'
          iconComponent={<Edit />}
        />

        <Button
          title='Download'
          onClick={() => window.open(file.latest_version.download_url, '_blank')}
          classButton='w-full border border-gray-200 rounded-lg hover:bg-gray-50'
          iconComponent={<Download />}
        />

        <Button
          title='Delete'
          onClick={() => onDelete(file.id)}
          classButton='w-full border border-red-500 bg-red-500/90 text-white hover:bg-red-500'
          iconComponent={<Delete className='text-white' />}
        />
      </div>
    </div>
  )
}

export default FileDetails
