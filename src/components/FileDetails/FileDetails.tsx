import { useNavigate } from 'react-router-dom'
import { getEditorPage } from '../../routes/path'
import { MarkdownFile } from '../../types/markdownFile.type'
import { formatDate } from '../../utils/helpers'
import Button from '../Button'
import BaseButton from '../Extensions/BaseButton'
import Close from '../Icons/Close'
import Delete from '../Icons/Delete'
import Edit from '../Icons/Edit'

interface FileDetailsProps {
  file: MarkdownFile
  onClose: () => void
  onDelete: (fileId: number) => void
}

const FileDetails = ({ file, onClose, onDelete }: FileDetailsProps) => {
  const navigate = useNavigate()

  const navigateToEditFilePage = () => {
    navigate(getEditorPage(file.id.toString()))
  }

  return (
    <div className='flex h-full flex-col p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='flex-1 text-left text-xl font-semibold'>File Details</h2>
        <BaseButton onClick={onClose} customClass='p-1 hover:bg-gray-50 rounded-full w-fit'>
          <Close />
        </BaseButton>
      </div>

      <div className='mb-6 space-y-4'>
        {/* Basic Information */}
        <div className='space-y-4'>
          <div>
            <h3 className='mb-1 text-left text-sm font-medium text-gray-500'>Title</h3>
            <p className='text-left break-all text-gray-900'>{file.title}</p>
          </div>

          <div>
            <h3 className='mb-1 text-left text-sm font-medium text-gray-500'>Description</h3>
            <p className='text-left break-all text-gray-900'>{file.description}</p>
          </div>
        </div>

        {/* File Statistics */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <h3 className='mb-1 text-left text-sm font-medium text-gray-500'>Created</h3>
            <p className='text-left text-sm text-gray-900'>{formatDate(new Date(file.created_at))}</p>
          </div>

          <div className='flex flex-col'>
            <h3 className='mb-1 text-left text-sm font-medium text-gray-500'>Last Modified</h3>
            <p className='text-left text-sm text-gray-900'>{formatDate(new Date(file.updated_at))}</p>
          </div>

          <div className='flex flex-col'>
            <h3 className='mb-1 text-left text-sm font-medium text-gray-500'>Total Versions</h3>
            <p className='text-left text-sm text-gray-900'>{file.version_count}</p>
          </div>

          <div className='flex flex-col'>
            <h3 className='mb-1 text-left text-sm font-medium text-gray-500'>Status</h3>
            <p className='text-left text-sm text-gray-900'>{file.is_owner ? 'Owner' : 'Shared'}</p>
          </div>
        </div>

        {/* Version Information */}
        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
          <h3 className='mb-3 text-left text-sm font-medium text-gray-700'>Latest Version</h3>
          <div className='space-y-3'>
            <div className='flex flex-col'>
              <h4 className='mb-1 text-left text-xs font-medium text-gray-500'>Version Number</h4>
              <p className='text-left text-sm text-gray-900'>{file.latest_version.version_number}</p>
            </div>

            <div className='flex flex-col'>
              <h4 className='mb-1 text-left text-xs font-medium text-gray-500'>Created At</h4>
              <p className='text-left text-sm text-gray-900'>{formatDate(new Date(file.latest_version.created_at))}</p>
            </div>

            {file.latest_version.version_name && (
              <div className='flex flex-col'>
                <h4 className='mb-1 text-left text-xs font-medium text-gray-500'>Version Name</h4>
                <p className='text-left text-sm text-gray-900'>{file.latest_version.version_name}</p>
              </div>
            )}

            {file.latest_version.commit_message && (
              <div className='flex flex-col'>
                <h4 className='mb-1 text-left text-xs font-medium text-gray-500'>Commit Message</h4>
                <p className='text-left text-sm break-all text-gray-900'>{file.latest_version.commit_message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-auto space-y-3'>
        <Button
          title='Edit'
          onClick={navigateToEditFilePage}
          classButton='w-full border border-gray-200 rounded-lg hover:cursor-pointer hover:bg-gray-50'
          iconComponent={<Edit />}
        />

        {/* <Button
          title='Download'
          onClick={() => window.open(file.latest_version.download_url, '_blank')}
          classButton='w-full border border-gray-200 rounded-lg hover:bg-gray-50'
          iconComponent={<Download />}
        /> */}

        <Button
          title='Delete'
          onClick={() => onDelete(file.id)}
          classButton='w-full border border-red-500 bg-red-500/90 rounded-lg text-white hover:cursor-pointer hover:bg-red-500'
          iconComponent={<Delete className='text-white' />}
        />
      </div>
    </div>
  )
}

export default FileDetails
