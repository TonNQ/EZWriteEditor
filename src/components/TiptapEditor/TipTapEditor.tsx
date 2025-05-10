import SearchAndReplace from '@sereneinserenade/tiptap-search-and-replace'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useSelector } from 'react-redux'
import FontSize from '../../extensions/FontSize'
import KeepHeadingOnEnter from '../../extensions/KeepHeadingOnEnter'
import { RootState } from '../../store'
import BoldButton from '../Extensions/BoldButton'
import FontSizeButton from '../Extensions/FontSizeButton'
import HeadingButton from '../Extensions/HeadingButton'
import HistoryButton from '../Extensions/HistoryButton'
import ItalicButton from '../Extensions/ItalicButton'
import PrintButton from '../Extensions/PrintButton'
import SearchReplaceButton from '../Extensions/SearchReplaceButton'
import StrikeButton from '../Extensions/StrikeButton'
import SuggestionButton from '../Extensions/SuggestionButton'
import TextAlignButton from '../Extensions/TextAlignButton/TextAlignButton'
import TranslateButton from '../Extensions/TranslateButton'
import UnderlineButton from '../Extensions/UnderlineButton'
import Suggestions from '../Suggestions/Suggestions'
import './styles.css'
import Translation from '../Translation'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='z-50 h-[48px] w-full border-b border-gray-200 bg-white shadow-sm'>
      <div className='mx-auto h-full max-w-5xl px-4'>
        <div className='flex h-full items-center justify-between space-x-4'>
          <div className='flex items-center space-x-1'>
            <BoldButton editor={editor} />
            <ItalicButton editor={editor} />
            <UnderlineButton editor={editor} />
            <StrikeButton editor={editor} />
            <div className='mx-2 h-6 w-px bg-gray-200' />
            <HeadingButton editor={editor} />
            <FontSizeButton editor={editor} />
            <div className='mx-2 h-6 w-px bg-gray-200' />
            <HistoryButton editor={editor} />
            <SearchReplaceButton editor={editor} />
            <TextAlignButton editor={editor} />
            <PrintButton editor={editor} />
            <SuggestionButton />
            <TranslateButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TipTapEditor() {
  const isOpenSuggestion = useSelector((state: RootState) => state.suggestion.isOpenSuggestion)
  const isOpenTranslation = useSelector((state: RootState) => state.translation.isOpenTranslation)

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

  const content = ``

  const editor = useEditor({
    extensions,
    content
  })

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
            <div className='flex max-h-[calc(100vh-132px)] w-72 flex-col gap-4'>
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
