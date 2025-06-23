import { type Editor } from '@tiptap/react'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { cn } from '../../libs/tailwind/utils'
import { RootState } from '../../store'
import Suggestions from '../Suggestions/Suggestions'
import TextToSpeechComp from '../TextToSpeechComp'
import Translation from '../Translation'
import Explanation from '../AnalysisPanel'
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
  const isOpenSuggestion = useSelector((state: RootState) => state.suggestion.isOpenSuggestion)
  const isOpenTranslation = useSelector((state: RootState) => state.translation.isOpenTranslation)
  const isOpenTextToSpeech = useSelector((state: RootState) => state.textToSpeech.isOpenTextToSpeech)
  const isOpenExplanation = useSelector((state: RootState) => state.suggestion.isOpenExplanation)

  const tabs: Tab[] = useMemo(() => {
    const availableTabs: Tab[] = []
    if (isOpenSuggestion) {
      availableTabs.push({
        key: 'suggestions',
        title: 'Suggestions',
        component: <Suggestions editor={editor} />
      })
    }
    if (isOpenExplanation) {
      availableTabs.push({
        key: 'analysis-panel',
        title: 'Analysis',
        component: <AnalysisPanel />
      })
    }
    if (isOpenTranslation) {
      availableTabs.push({
        key: 'translation',
        title: 'Translation',
        component: <Translation />
      })
    }
    if (isOpenTextToSpeech) {
      availableTabs.push({
        key: 'text-to-speech',
        title: 'Text to Speech',
        component: <TextToSpeechComp editor={editor} />
      })
    }
    return availableTabs
  }, [isOpenSuggestion, isOpenTranslation, isOpenTextToSpeech, isOpenExplanation, editor])

  useEffect(() => {
    const activeTabExists = tabs.some((tab) => tab.key === activeTab)
    if (!activeTabExists && tabs.length > 0) {
      setActiveTab(tabs[0].key)
    }
  }, [tabs, activeTab])

  const activeComponent = useMemo(() => tabs.find((tab) => tab.key === activeTab)?.component, [tabs, activeTab])

  return (
    <div className='shadow-mdsticky top-0 block w-[max(425px,calc(50vw-425px))] max-w-[600px] min-w-[425px] border-l border-l-gray-200 bg-white'>
      <div className='block w-full p-4'>
        <div className='flex w-fit rounded-sm bg-gray-100'>
          <div className='flex gap-x-1 p-1'>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn('rounded-sm px-2 py-[6px] text-xs font-medium hover:cursor-pointer', {
                  'bg-white': activeTab === tab.key,
                  'text-gray-400 hover:bg-gray-50': activeTab !== tab.key
                })}
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
