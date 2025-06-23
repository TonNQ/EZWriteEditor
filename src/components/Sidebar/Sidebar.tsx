import { type Editor } from '@tiptap/react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '../../libs/tailwind/utils'
import Suggestions from '../Suggestions/Suggestions'
import TextToSpeechComp from '../TextToSpeechComp'
import Translation from '../Translation'
import AnalysisPanel from '../AnalysisPanel'

interface Tab {
  key: string
  title: string
  component: React.ReactNode
}

interface SidebarProps {
  editor: Editor | null
}

const Sidebar = ({ editor }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<string>('')

  const tabs: Tab[] = useMemo(
    () => [
      {
        key: 'suggestions',
        title: 'Suggestions',
        component: <Suggestions editor={editor} />
      },
      {
        key: 'analysis-panel',
        title: 'Analysis',
        component: <AnalysisPanel />
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
      }
    ],
    [editor]
  )

  useEffect(() => {
    const activeTabExists = tabs.some((tab) => tab.key === activeTab)
    if (!activeTabExists && tabs.length > 0) {
      setActiveTab(tabs[0].key)
    }
  }, [tabs, activeTab])

  const activeComponent = useMemo(() => tabs.find((tab) => tab.key === activeTab)?.component, [tabs, activeTab])

  return (
    <div className='sticky top-0 block w-[max(425px,calc(50vw-425px))] max-w-[600px] min-w-[425px] border-l border-l-gray-200 bg-white shadow-md'>
      <div className='block w-full p-4'>
        <div className='inline-flex h-10 w-fit items-center justify-center rounded-md bg-gray-100 px-2 py-1 text-gray-500'>
          <div className='flex gap-x-1 p-1'>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                  {
                    'bg-white text-gray-950 shadow-sm': activeTab === tab.key,
                    'text-gray-600 hover:text-gray-900': activeTab !== tab.key
                  }
                )}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='h-[calc(100%-68px)] overflow-auto px-4 pb-4'>{activeComponent}</div>
    </div>
  )
}

export default Sidebar
