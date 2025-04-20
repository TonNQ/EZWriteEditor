import SearchAndReplace from '@sereneinserenade/tiptap-search-and-replace'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import FontSize from '../../extensions/FontSize'
import KeepHeadingOnEnter from '../../extensions/KeepHeadingOnEnter'
import BoldButton from '../Extensions/BoldButton'
import FontSizeButton from '../Extensions/FontSizeButton'
import HeadingButton from '../Extensions/HeadingButton'
import HistoryButton from '../Extensions/HistoryButton'
import ItalicButton from '../Extensions/ItalicButton'
import SearchReplaceButton from '../Extensions/SearchReplaceButton'
import StrikeButton from '../Extensions/StrikeButton'
import TextAlignButton from '../Extensions/TextAlignButton/TextAlignButton'
import UnderlineButton from '../Extensions/UnderlineButton'
import './styles.css'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm'>
      <div className='mx-auto max-w-5xl px-4'>
        <div className='flex h-12 items-center justify-between space-x-4'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TipTapEditor() {
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
      types: ['heading', 'paragraph']
    })
  ]

  const content = `People play with bubble wrap. They love it. An artist turns bubble wrap into art. He colours the bubbles.

The artist has his special method. It is top secret. He uses computers, syringes and other tools. He makes some of the tools.

The idea came from a security guard. The artist also had some bubble wrap. The man will show the pictures on the 7th of May in New York.

Difficult words: bubble wrap (plastic with bubbles for protecting things), top secret (no one knows except the man), syringe (thing for taking somebody's blood), tool (something which is used for making something).`

  const editor = useEditor({
    extensions,
    content
  })

  return (
    <div className='min-h-screen bg-gray-50'>
      <MenuBar editor={editor} />
      <main className='mx-auto max-w-5xl px-4 py-8'>
        <div className='min-h-[calc(100vh-12rem)] rounded-lg border border-gray-200 bg-white p-8 shadow-sm'>
          <EditorContent editor={editor} className='prose max-w-none' />
        </div>
      </main>
    </div>
  )
}
