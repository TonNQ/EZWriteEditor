import type React from 'react'
import { useState } from 'react'
import type { SaveFileFormData } from '../../types/markdownFile.type'

interface SaveFileFormProps {
  initialTitle: string
  onSave: (data: SaveFileFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

const SaveFileForm = ({ initialTitle, onSave, onCancel, isLoading = false }: SaveFileFormProps) => {
  const [formData, setFormData] = useState<SaveFileFormData>({
    title: initialTitle || '',
    description: '',
    versionName: '',
    commitMessage: ''
  })
  const [errors, setErrors] = useState<{ title?: string }>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (field === 'title' && errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: { title?: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* Title Field */}
      <div>
        <label htmlFor='title' className='mb-1 block text-left text-sm font-medium text-gray-700'>
          Title <span className='text-red-500'>*</span>
        </label>
        <input
          id='title'
          type='text'
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='Enter file title'
          disabled={isLoading}
        />
        {errors.title && <p className='mt-1 text-left text-xs font-semibold text-red-500'>{errors.title}</p>}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor='description' className='mb-1 block text-left text-sm font-medium text-gray-700'>
          Description
        </label>
        <textarea
          id='description'
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none'
          placeholder='Enter file description (optional)'
          disabled={isLoading}
        />
      </div>

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
          placeholder='Enter version name (optional)'
          disabled={isLoading}
        />
      </div>

      {/* Version Description Field */}
      <div>
        <label htmlFor='versionDescription' className='mb-1 block text-left text-sm font-medium text-gray-700'>
          Version description
        </label>
        <textarea
          id='commitMessage'
          value={formData.commitMessage}
          onChange={(e) => handleInputChange('commitMessage', e.target.value)}
          rows={3}
          className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none'
          placeholder='Enter version description (optional)'
          disabled={isLoading}
        />
      </div>

      {/* Buttons */}
      <div className='flex justify-end space-x-3 pt-4'>
        <button
          type='button'
          onClick={onCancel}
          disabled={isLoading}
          className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-blue-700 focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default SaveFileForm
