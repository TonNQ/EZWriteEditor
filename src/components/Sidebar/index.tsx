import React from 'react'
import { type Editor } from '@tiptap/react'
import { useEffect, useMemo, useState } from 'react'
import Suggestions from '../Suggestions/Suggestions'
import TextToSpeechComp from '../TextToSpeechComp'
import Translation from '../Translation'
// import Explanation from '../Explanation'
import { cn } from '../../libs/tailwind/utils'

// Temporary placeholder for Explanation tab
const Explanation = ({ editor }: { editor: Editor | null }) => (
  <div className='p-4 text-gray-500'>Explanation content here</div>
)

interface Tab {
  key: string
  title: string
  component: React.ReactNode
}

interface SidebarProps {
  editor: Editor | null
}

const Sidebar = ({ editor }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<string>('suggestions')

  const tabs: Tab[] = useMemo(
    () => [
      {
        key: 'suggestions',
        title: 'Suggestions',
        component: <Suggestions editor={editor} />
      },
      {
        key: 'translation',
        title: 'Translation',
        component: <Translation />
      },
      {
        key: 'text-to-speech',
        title: 'Text to Speech',
        component: <TextToSpeechComp editor={editor} />
      },
      {
        key: 'explanation',
        title: 'Explanation',
        component: <Explanation editor={editor} />
      }
    ],
    [editor]
  )

  useEffect(() => {
    if (!tabs.some((tab) => tab.key === activeTab)) {
      setActiveTab(tabs[0].key)
    }
  }, [tabs, activeTab])

  const activeComponent = useMemo(() => tabs.find((tab) => tab.key === activeTab)?.component, [tabs, activeTab])

  return (
    <div className='sticky top-0 flex w-[max(350px,calc(50vw-350px))] max-w-[600px] min-w-[350px] flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm'>
      <div className='-m-4 flex border-b'>
        <div className='flex gap-x-4 px-4'>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn('border-b-2 py-2 text-sm font-medium', {
                'border-blue-500 text-blue-600': activeTab === tab.key,
                'border-transparent text-gray-500 hover:text-gray-700': activeTab !== tab.key
              })}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div>{activeComponent}</div>
    </div>
  )
}

export default Sidebar
