import SearchAndReplace from '@sereneinserenade/tiptap-search-and-replace'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import FontSize from '../extensions/FontSize'
import KeepHeadingOnEnter from '../extensions/KeepHeadingOnEnter'

export const editorExtensions = [
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