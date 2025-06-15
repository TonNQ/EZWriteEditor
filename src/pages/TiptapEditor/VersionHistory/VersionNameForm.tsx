import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import markdownInstance from '../../../services/markdown.api'
import { MarkdownVersion } from '../../../types/markdownFile.type'

interface VersionNameFormProps {
  version: MarkdownVersion
  fileId: string
  onClose: () => void
  onSuccess: () => void
}

const VersionNameForm = ({ version, fileId, onClose, onSuccess }: VersionNameFormProps) => {
  const [formData, setFormData] = useState({
    versionName: version.version_name || '',
    commitMessage: version.commit_message || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setHasChanges(
      formData.versionName !== (version.version_name || '') || formData.commitMessage !== (version.commit_message || '')
    )
  }, [formData, version])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasChanges) return

    setIsLoading(true)
    try {
      const response = await markdownInstance.updateVersionOfMarkdownFile(fileId, {
        version_id: version.id,
        version_name: formData.versionName,
        commit_message: formData.commitMessage
      })

      if (response.status === 200) {
        toast.success('Version updated successfully')
        onSuccess()
        onClose()
      } else {
        toast.error('Failed to update version')
      }
    } catch (error) {
      console.error('Error updating version:', error)
      toast.error('Failed to update version')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* Version Name Field */}
      <div>
        <label htmlFor='versionName' className='mb-1 block text-left text-sm font-medium text-gray-700'>
          Version Name
        </label>
        <input
          id='versionName'
          type='text'
          value={formData.versionName}
          onChange={(e) => handleInputChange('versionName', e.target.value)}
          className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none'
          placeholder='Enter version name'
          disabled={isLoading}
        />
      </div>

      {/* Version Description Field */}
      <div>
        <label htmlFor='commitMessage' className='mb-1 block text-left text-sm font-medium text-gray-700'>
          Version description
        </label>
        <textarea
          id='commitMessage'
          value={formData.commitMessage}
          onChange={(e) => handleInputChange('commitMessage', e.target.value)}
          rows={3}
          className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none'
          placeholder='Enter version description'
          disabled={isLoading}
        />
      </div>

      {/* Buttons */}
      <div className='flex justify-end space-x-3 pt-4'>
        <button
          type='button'
          onClick={onClose}
          disabled={isLoading}
          className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isLoading || !hasChanges}
          className='rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-blue-700 focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default VersionNameForm
