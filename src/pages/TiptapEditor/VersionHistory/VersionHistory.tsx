import { useDispatch } from 'react-redux'
import { setIsShowHistory } from '../../../store/editor/editor.slice'
import VersionHeader from './VersionHeader'
import MainEditorContent from '../MainEditorContent'
import { useEditor, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import VersionSidebar from './VersionSidebar'
import { useParams } from 'react-router-dom'
import markdownInstance from '../../../services/markdown.api'

const mockVersions = [
  {
    id: '1',
    timestamp: '18:52, 28 tháng 5',
    author: 'Lý',
    isCurrent: true,
    description: 'Đã nhập tệp .docx '
  },
  {
    id: '2',
    timestamp: '17:30, 28 tháng 5',
    author: 'Minh',
    isCurrent: false,
    description: 'Chỉnh sửa bảng dữ liệu'
  },
  {
    id: '3',
    timestamp: '16:15, 28 tháng 5',
    author: 'Hoa',
    isCurrent: false,
    description: 'Thêm phần kết luận'
  },
  {
    id: '4',
    timestamp: '15:45, 28 tháng 5',
    author: 'Lý',
    isCurrent: false,
    description: 'Tạo tài liệu mới'
  }
]

const VersionHistory = () => {
  const fakeEditor = useEditor({
    extensions: [StarterKit],
    content: 'abc'
  })
  const { id } = useParams()
  const [selectedVersion, setSelectedVersion] = useState<string>('1')
  const [showChanges, setShowChanges] = useState<boolean>(false)
  const dispatch = useDispatch()
  const handleBack = () => {
    // Navigate back to document editor
    dispatch(setIsShowHistory(false))
  }

  const handleVersionSelect = (id: string) => {
    setSelectedVersion(id)
  }

  const handleShowChangesToggle = (show: boolean) => {
    setShowChanges(show)
  }

  useEffect(() => {
    if (id) {
      const markdownId = Number.parseInt(id)
      const fetchVersionsOfMarkdownFile = async () => {
        const response = await markdownInstance.getAllVersionsOfMarkdownFile(markdownId)
        console.log('response', response)
      }
      fetchVersionsOfMarkdownFile()
    }
  }, [id])

  return (
    <>
      <VersionHeader timestamp='18:52, 28 tháng 5' onBack={handleBack} />

      <div className='flex flex-1 overflow-hidden bg-gray-50'>
        <div className='h-full flex-1 overflow-auto px-6 py-4'>
          <MainEditorContent editor={fakeEditor as Editor} />
        </div>

        <VersionSidebar
          versions={mockVersions}
          selectedVersion={selectedVersion}
          showChanges={showChanges}
          onVersionSelect={handleVersionSelect}
          onShowChangesToggle={handleShowChangesToggle}
        />
      </div>
    </>
  )
}

export default VersionHistory
