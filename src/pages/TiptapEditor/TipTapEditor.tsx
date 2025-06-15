import { type Editor, useEditor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BaseButton from '../../components/Extensions/BaseButton'
import BoldButton from '../../components/Extensions/BoldButton'
import FontSizeButton from '../../components/Extensions/FontSizeButton'
import HeadingButton from '../../components/Extensions/HeadingButton'
import HistoryButton from '../../components/Extensions/HistoryButton'
import ImportDocxButton from '../../components/Extensions/ImportDocxButton'
import ItalicButton from '../../components/Extensions/ItalicButton'
import LanguageButton from '../../components/Extensions/LanguageButton'
import PrintButton from '../../components/Extensions/PrintButton'
import SaveFileButton from '../../components/Extensions/SaveFileButton'
import SearchReplaceButton from '../../components/Extensions/SearchReplaceButton'
import StrikeButton from '../../components/Extensions/StrikeButton'
import SuggestionButton from '../../components/Extensions/SuggestionButton'
import TextAlignButton from '../../components/Extensions/TextAlignButton/TextAlignButton'
import TextToSpeechButton from '../../components/Extensions/TextToSpeechButton'
import TranslateButton from '../../components/Extensions/TranslateButton'
import UnderlineButton from '../../components/Extensions/UnderlineButton'
import ChevronDown from '../../components/Icons/ChevronDown'
import ChevronUp from '../../components/Icons/ChevronUp'
import Document from '../../components/Icons/Document'
import History from '../../components/Icons/History'
import Suggestions from '../../components/Suggestions/Suggestions'
import TextToSpeechComp from '../../components/TextToSpeechComp'
import Translation from '../../components/Translation'
import VerticalSeparate from '../../components/VerticalSeparate/VerticalSeparate'
import { cn } from '../../libs/tailwind/utils'
import markdownInstance from '../../services/markdown.api'
import { RootState } from '../../store'
import { setIsShowHistory, setTitle } from '../../store/editor/editor.slice'
import { resetAllStore } from '../../store/resetStore'
import { editorExtensions } from '../../utils/extensions'
import MainEditorContent from './MainEditorContent'
import './styles.css'
import VersionHistory from './VersionHistory'

interface MenuBarProps {
  editor: Editor | null
}

interface MainEditorProps {
  editor: Editor | null
  isOpenSuggestion: boolean
  isOpenTranslation: boolean
  isOpenTextToSpeech: boolean
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const dispatch = useDispatch()
  const title = useSelector((state: RootState) => state.editor.title)

  if (!editor) {
    return null
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value))
  }

  return (
    <div className='flex flex-col bg-gray-50 px-4 py-2'>
      {isOpen && (
        <div className='flex w-full flex-row items-center justify-between'>
          <div className='flex flex-1 items-center'>
            <Document width={28} height={28} />
            <input
              value={title || ''}
              onChange={handleTitleChange}
              placeholder='Untitled'
              className='ml-2 w-full border-none bg-transparent text-base font-medium text-gray-500 placeholder-gray-400 outline-none'
            />
          </div>
          <div className='flex items-center'>
            <History
              width={24}
              height={24}
              className='text-gray-500 hover:cursor-pointer hover:text-gray-600'
              onClick={() => dispatch(setIsShowHistory(true))}
            />
          </div>
        </div>
      )}
      <div className='mt-2 flex w-full flex-1 flex-row items-center justify-between gap-1 rounded-xl bg-gray-200/40 px-4 py-1'>
        <div className='flex flex-row items-center gap-1'>
          <ImportDocxButton editor={editor} />
          <SaveFileButton editor={editor} />
          <PrintButton editor={editor} />
          <VerticalSeparate />
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
          <UnderlineButton editor={editor} />
          <StrikeButton editor={editor} />
          <VerticalSeparate />
          <HeadingButton editor={editor} />
          <FontSizeButton editor={editor} />
          <VerticalSeparate />
          <HistoryButton editor={editor} />
          <VerticalSeparate />
          <SearchReplaceButton editor={editor} />
          <VerticalSeparate />
          <TextAlignButton editor={editor} />
          <VerticalSeparate />
          <LanguageButton />
          <VerticalSeparate />
          <SuggestionButton />
          <TranslateButton />
          <TextToSpeechButton />
        </div>
        <div className='flex items-center gap-1'>
          <VerticalSeparate />
          {isOpen ? (
            <BaseButton onClick={() => setIsOpen(!isOpen)}>
              <ChevronUp width={18} height={18} />
            </BaseButton>
          ) : (
            <BaseButton onClick={() => setIsOpen(!isOpen)}>
              <ChevronDown width={18} height={18} />
            </BaseButton>
          )}
        </div>
      </div>
    </div>
  )
}

const MainEditor = ({ editor, isOpenSuggestion, isOpenTranslation, isOpenTextToSpeech }: MainEditorProps) => {
  const numberOfExtensions = [isOpenSuggestion, isOpenTranslation, isOpenTextToSpeech].filter(Boolean).length
  const hasSidebar = numberOfExtensions >= 1
  const isSidebarScrollable = numberOfExtensions > 1

  return (
    <>
      <MenuBar editor={editor} />
      <div className='flex h-full w-full flex-1 gap-4 overflow-auto p-4 text-center'>
        <MainEditorContent editor={editor} />
        {hasSidebar && (
          <div
            className={cn(
              'sticky top-0 flex w-[max(350px,calc(50vw-350px))] max-w-[600px] min-w-[350px] flex-col gap-4 px-2',
              {
                'overflow-y-auto': isSidebarScrollable
              }
            )}
          >
            {isOpenSuggestion && (
              <div className='h-fit'>
                <Suggestions editor={editor} />
              </div>
            )}
            {isOpenTranslation && (
              <div className='h-fit'>
                <Translation />
              </div>
            )}
            {isOpenTextToSpeech && (
              <div className='h-fit'>
                <TextToSpeechComp editor={editor} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default function TipTapEditor() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const isOpenSuggestion = useSelector((state: RootState) => state.suggestion.isOpenSuggestion)
  const isOpenTranslation = useSelector((state: RootState) => state.translation.isOpenTranslation)
  const isOpenTextToSpeech = useSelector((state: RootState) => state.textToSpeech.isOpenTextToSpeech)
  const isShowHistory = useSelector((state: RootState) => state.editor.isShowHistory)

  const editor = useEditor({
    extensions: editorExtensions,
    content: ''
  })

  useEffect(() => {
    resetAllStore()
  }, [])

  useEffect(() => {
    const fetchMarkdownFile = async () => {
      if (id) {
        try {
          const response = await markdownInstance.getMarkdownFileById(id)
          if (response.data) {
            dispatch(setTitle(response.data.title))
            if (editor) {
              editor.commands.setContent(response.data.content || '')
            }
          }
        } catch (error) {
          console.error('Error fetching markdown file:', error)
        }
      }
    }

    fetchMarkdownFile()
  }, [id, editor, dispatch])

  return (
    <div className='flex h-full w-full flex-col bg-gray-50'>
      {isShowHistory ? (
        <VersionHistory />
      ) : (
        <MainEditor
          editor={editor}
          isOpenSuggestion={isOpenSuggestion}
          isOpenTranslation={isOpenTranslation}
          isOpenTextToSpeech={isOpenTextToSpeech}
        />
      )}
    </div>
  )
}
