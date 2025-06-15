import type React from 'react'
import Close from '../Icons/Close'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Popup = ({ isOpen, onClose, title, children }: PopupProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='bg-opacity-50 absolute inset-0 bg-black/10' onClick={onClose} />

      {/* Modal */}
      <div className='relative mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-xl'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
          <h2 className='text-lg font-semibold text-gray-700'>{title}</h2>
          <Close onClick={onClose} width={24} height={24} className='hover:cursor-pointer' />
        </div>

        {/* Content */}
        <div className='p-6'>{children}</div>
      </div>
    </div>
  )
}

export default Popup
