'use client'

import { Check, Link, Mail, User, Users, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import markdownInstance, { MarkdownFileSharesResponse } from '../../services/markdown.api'
import type { MarkdownFile } from '../../types/markdownFile.type'
import BaseButton from '../Extensions/BaseButton'
import Copy from '../Icons/Copy'
import Popup from './Popup'

interface SharePopupProps {
  file: MarkdownFile | null
  isOpen: boolean
  onClose: () => void
}

const SharePopup: React.FC<SharePopupProps> = ({ file, isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [shares, setShares] = useState<MarkdownFileSharesResponse['shares']>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    if (file && isOpen && file.is_owner) {
      fetchShares()
    }
    // eslint-disable-next-line
  }, [file, isOpen])

  const fetchShares = async () => {
    if (!file || !file.is_owner) return
    setLoading(true)
    setError('')
    const res = await markdownInstance.getMarkdownFileShares(file.id.toString())
    if (res.status === 200 && res.data) {
      setShares(res.data.shares)
    } else {
      setError(res.message || 'Failed to load shared users. Please try again later.')
    }
    setLoading(false)
  }

  const handleShare = async () => {
    if (!file || !email || !file.is_owner) return
    setLoading(true)
    setError('')
    const res = await markdownInstance.shareMarkdownFile(file.id.toString(), { shared_with_email: email })
    if (res.status === 201) {
      setEmail('')
      fetchShares()
    } else {
      setError(res.message || 'Failed to share the file. Please check the email and try again.')
    }
    setLoading(false)
  }

  const handleUnshare = async (sharedEmail: string) => {
    if (!file || !file.is_owner) return
    setLoading(true)
    setError('')
    const res = await markdownInstance.unshareMarkdownFile(file.id.toString(), sharedEmail)
    if (res.status === 200) {
      fetchShares()
    } else {
      setError(res.message || 'Failed to remove access. Please try again later.')
    }
    setLoading(false)
  }

  const handleCopyLink = () => {
    if (!file) return
    const url = window.location.origin + '/editor/' + file.id
    navigator.clipboard.writeText(url)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} title='Share file'>
      <div className='mx-auto w-full max-w-md'>
        {/* Share with email section - only show for owners */}
        {file?.is_owner && (
          <div className='mb-6 text-left'>
            <label className='mb-3 block text-sm font-medium text-gray-700'>
              <Mail className='mr-2 inline h-4 w-4' />
              Share with others
            </label>
            <div className='flex space-x-2'>
              <div className='relative flex-1'>
                <input
                  type='email'
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 transition-all duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter email address...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleShare()}
                />
              </div>
              <button
                onClick={handleShare}
                disabled={loading || !email.trim()}
                className='flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {loading ? (
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                ) : (
                  <span>Share</span>
                )}
              </button>
            </div>
            {error && (
              <div className='mt-2 flex items-center space-x-2 rounded-lg border border-red-200 bg-red-50 p-3'>
                <X className='h-4 w-4 flex-shrink-0 text-red-500' />
                <span className='text-sm text-red-700'>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Shared users section */}
        <div className='mb-6'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='flex items-center text-sm font-medium text-gray-700'>
              <Users className='mr-2 h-4 w-4' />
              Users with access
            </h3>
            {file?.is_owner && shares.length > 0 && (
              <span className='rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500'>{shares.length} users</span>
            )}
          </div>

          <div className='max-h-48 overflow-y-auto rounded-lg bg-gray-50 p-4'>
            {!file?.is_owner ? (
              <div className='py-6 text-center'>
                <Users className='mx-auto mb-2 h-8 w-8 text-gray-300' />
                <p className='text-sm text-gray-500'>Access restricted</p>
                <p className='mt-1 text-xs text-gray-400'>Only the file owner can view the list of users with access</p>
              </div>
            ) : loading ? (
              <div className='flex items-center justify-center py-4'>
                <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent' />
                <span className='ml-2 text-sm text-gray-500'>Loading...</span>
              </div>
            ) : shares.length === 0 ? (
              <div className='py-6 text-center'>
                <Users className='mx-auto mb-2 h-8 w-8 text-gray-300' />
                <p className='text-sm text-gray-500'>No one has been shared yet</p>
                <p className='mt-1 text-xs text-gray-400'>Add an email above to share this file</p>
              </div>
            ) : (
              <div className='space-y-2'>
                {shares.map((share, idx: number) => (
                  <li key={idx} className='flex items-center justify-between rounded bg-gray-50 px-3 py-2'>
                    <div className='flex items-center space-x-2'>
                      <User width={18} height={18} />
                      <span className='text-sm text-gray-700'>{share.shared_with_email || share.owner_email}</span>
                    </div>
                    <BaseButton
                      customClass='text-red-500 text-xs px-2 py-1 rounded hover:bg-red-50'
                      onClick={() => handleUnshare(share.shared_with_email || share.owner_email)}
                      disabled={loading}
                    >
                      Remove
                    </BaseButton>
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copy link section */}
        <div className='mb-6 text-left'>
          <label className='mb-3 block text-sm font-medium text-gray-700'>
            <Link className='mr-2 inline h-4 w-4' />
            Share link
          </label>
          <div className='flex space-x-2'>
            <div className='flex-1 truncate rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600'>
              {window.location.origin}/editor/{file?.id}
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex items-center space-x-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                copySuccess
                  ? 'border border-green-200 bg-green-100 text-green-700'
                  : 'border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {copySuccess ? (
                <>
                  <Check className='h-4 w-4' />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy width={16} height={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className='mt-2 text-xs text-gray-500'>Share this link with people who have access to this file</p>
        </div>

        {/* Footer */}
        <div className='flex justify-end border-t border-gray-200 pt-4'>
          <button
            onClick={onClose}
            className='rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Done
          </button>
        </div>
      </div>
    </Popup>
  )
}

export default SharePopup
