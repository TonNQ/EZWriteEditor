import SearchAndReplace from '@sereneinserenade/tiptap-search-and-replace'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
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
import FontSize from '../../extensions/FontSize'
import KeepHeadingOnEnter from '../../extensions/KeepHeadingOnEnter'
import markdownInstance from '../../services/markdown.api'
import { RootState } from '../../store'
import { setTitle } from '../../store/editor/editor.slice'
import { resetAllStore } from '../../store/resetStore'
import './styles.css'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
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
          <div className='flex items-center'>
            <Document width={28} height={28} />
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder='Untitled'
              className='ml-2 w-full border-none bg-transparent text-base font-medium text-gray-500 placeholder-gray-400 outline-none'
            />
          </div>
          <div className='flex items-center'>
            <History width={24} height={24} className='text-gray-500 hover:cursor-pointer hover:text-gray-600' />
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
    // <div className='z-50 h-[48px] w-full border-b border-gray-200 bg-white shadow-sm'>
    //   <div className='mx-auto h-full max-w-5xl px-4'>
    //   <div className='flex h-full items-center justify-between space-x-4'>
    //   <div className='flex items-center space-x-1'>
    //     <ImportDocxButton editor={editor} />
    //     <SaveFileButton editor={editor} />
    //     <BoldButton editor={editor} />
    //     <ItalicButton editor={editor} />
    //     <UnderlineButton editor={editor} />
    //     <StrikeButton editor={editor} />
    //     <div className='mx-2 h-6 w-px bg-gray-200' />
    //     <HeadingButton editor={editor} />
    //     <FontSizeButton editor={editor} />
    //     <div className='mx-2 h-6 w-px bg-gray-200' />
    //     <HistoryButton editor={editor} />
    //     <SearchReplaceButton editor={editor} />
    //     <TextAlignButton editor={editor} />
    //     <PrintButton editor={editor} />
    //     <SuggestionButton />
    //     <TranslateButton />
    //   </div>
    // </div>
    //   </div>
    // </div>
  )
}

export default function TipTapEditor() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const isOpenSuggestion = useSelector((state: RootState) => state.suggestion.isOpenSuggestion)
  const isOpenTranslation = useSelector((state: RootState) => state.translation.isOpenTranslation)
  const isOpenTextToSpeech = useSelector((state: RootState) => state.textToSpeech.isOpenTextToSpeech)

  const extensions = [
    Underline,
    TextStyle.configure({ mergeNestedSpanStyles: true }),
    FontSize,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
      bulletList: { keepMarks: true, keepAttributes: false },
      orderedList: { keepMarks: true, keepAttributes: false }
    }),
    KeepHeadingOnEnter,
    SearchAndReplace.configure(),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      defaultAlignment: 'left'
    })
  ]

  const editor = useEditor({
    extensions,
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
      <MenuBar editor={editor} />
      <div className='mx-auto w-full max-w-[100rem] flex-1 overflow-auto p-4'>
        <div className='flex min-h-full gap-4'>
          <div className='flex-1'>
            <div className='h-full rounded-lg border border-gray-200 bg-white px-8 py-4 shadow-sm'>
              <EditorContent editor={editor} className='prose max-w-none' />
            </div>
          </div>
          {(isOpenSuggestion || isOpenTranslation) && (
            <div className='flex max-h-[calc(100vh-132px)] w-80 flex-col gap-4'>
              {isOpenSuggestion && (
                <div className='sticky top-0 h-fit'>
                  <Suggestions editor={editor} />
                </div>
              )}
              {isOpenTranslation && (
                <div className='sticky top-0 h-fit'>
                  <Translation />
                </div>
              )}
              {isOpenTextToSpeech && (
                <div className='sticky top-0 h-fit'>
                  <TextToSpeechComp editor={editor} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
