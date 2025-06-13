// import { Book, ChevronDown, FileText, LogOut, Settings, SettingsIcon, User } from 'lucide-react'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../store'
import { logoutThunk } from '../../store/auth/auth.slice'
import { getInitialFromName, getRandomDarkColor } from '../../utils/helpers'
import ChevronDown from '../Icons/ChevronDown'
import Dictionary from '../Icons/Dictionary'
import File from '../Icons/File'
import Folder from '../Icons/Folder'
import LogOut from '../Icons/LogOut'
import Setting from '../Icons/Setting'
import User from '../Icons/User'

interface TabBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const tabs = [
    { id: 'file', label: 'File của bạn', icon: Folder, extensions: [''] },
    { id: 'editor', label: 'Soạn thảo', icon: File, extensions: [] },
    { id: 'dictionary', label: 'Từ điển', icon: Dictionary, extensions: [] }
  ]

  // Mock user data - in a real app, this would come from authentication
  const profileData = localStorage.getItem('profile')
  const user = profileData ? JSON.parse(profileData) : null
  const fullName = `${user.first_name} ${user.last_name}`

  const initialName = getInitialFromName(fullName)
  const backgroundColorAvatar = useMemo(() => getRandomDarkColor(), [])

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap()
      localStorage.removeItem('access_token')
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className='z-100 flex h-[48px] items-center justify-between border-b border-gray-200 bg-gray-50 px-2 shadow-xs'>
      <div className='flex h-full'>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab.startsWith(tab.id) || tab.extensions.includes(activeTab)

          return (
            <button
              key={tab.id}
              className={`flex cursor-pointer items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-b-2 border-blue-500 bg-white text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon width={20} height={20} className={isActive ? 'text-blue-500' : 'text-gray-600'} />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className='flex items-center gap-2 pr-4' ref={dropdownRef}>
        <button
          className='flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-gray-50'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Avatar */}
          <div
            className='flex h-8 w-8 items-center justify-center overflow-hidden rounded-full'
            style={{ backgroundColor: backgroundColorAvatar }}
          >
            <span className='text-sm leading-0 font-medium text-gray-50'>{initialName}</span>
          </div>

          {/* User info - hidden on mobile */}
          <div className='text-left md:block'>
            <p className='text-sm font-medium'>{fullName}</p>
            <p className='text-xs text-gray-500'>{user.email}</p>
          </div>

          <ChevronDown width={16} height={16} />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className='absolute top-12 right-6 z-100 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-neutral-200 focus:outline-none'>
            <div className='px-4 py-3'>
              <p className='text-sm font-medium'>Tài khoản của tôi</p>
            </div>
            <div className='py-1'>
              <button className='flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                <User />
                Hồ sơ
              </button>
              <button className='flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                <Setting />
                Cài đặt
              </button>
            </div>
            <div className='py-1'>
              <button
                onClick={handleLogout}
                className='flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
              >
                <LogOut />
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TabBar
