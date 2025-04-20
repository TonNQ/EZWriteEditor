import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { type Editor, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import FontSize from "../../extensions/FontSize"
import KeepHeadingOnEnter from "../../extensions/KeepHeadingOnEnter"
import BoldButton from "../Extensions/BoldButton"
import FontSizeButton from "../Extensions/FontSizeButton"
import HistoryButton from "../Extensions/HistoryButton"
import ItalicButton from "../Extensions/ItalicButton"
import StrikeButton from "../Extensions/StrikeButton"
import UnderlineButton from "../Extensions/UnderlineButton"
import HeadingButton from "../HeadingButton"
import "./styles.css"
import SearchAndReplace from "@sereneinserenade/tiptap-search-and-replace"
import SearchReplaceButton from "../Extensions/SearchReplaceButton"

const MenuBar = ({
  editor,
}: { editor: Editor | null}) => {
  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
        <StrikeButton editor={editor} />
        <HeadingButton editor={editor} />
        <FontSizeButton editor={editor} />
        <HistoryButton editor={editor} />
        <SearchReplaceButton editor={editor} />
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
      orderedList: { keepMarks: true, keepAttributes: false },
    }),
    KeepHeadingOnEnter,
    SearchAndReplace.configure()
  ]

  const content = `People play with bubble wrap. They love it. An artist turns bubble wrap into art. He colours the bubbles.

The artist has his special method. It is top secret. He uses computers, syringes and other tools. He makes some of the tools.

The idea came from a security guard. The artist also had some bubble wrap. The man will show the pictures on the 7th of May in New York.

Difficult words: bubble wrap (plastic with bubbles for protecting things), top secret (no one knows except the man), syringe (thing for taking somebody’s blood), tool (something which is used for making something).` // nội dung như bạn đã có

  const editor = useEditor({
    extensions,
    content,
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
