import { useRef, useState } from 'react'
import RichTextEditor from 'reactjs-tiptap-editor'
import {
  BaseKit,
  Bold,
  FontSize,
  Heading,
  Italic,
  MoreMark,
  SearchAndReplace,
  Strike,
  Underline
} from 'reactjs-tiptap-editor/extension-bundle'

import 'reactjs-tiptap-editor/style.css'

const extensions = [
  // BaseKit.configure({
  //   placeholder: {
  //     showOnlyCurrent: true
  //   },

  //   // characterCount: {
  //   //   limit: 50_000
  //   // }
  // }),
  BaseKit,
  // History,
  SearchAndReplace,
  // FormatPainter.configure({ spacer: true }),
  // Clear,
  // FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark, 
  // Color.configure({ spacer: true }),
  // Highlight,
  // BulletList,
  // OrderedList,
  // TextAlign.configure({
  //   types: ['heading', 'paragraph'],
  //   spacer: true,
  //   alignments: ['left', 'center', 'right', 'justify'],
  //   defaultAlignment: 'left'
  // }),
  // Indent,
  // LineHeight,
  // Image.configure({
  //   upload: (files: File) => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(URL.createObjectURL(files))
  //       }, 500)
  //     })
  //   }
  // })
]

const DEFAULT = ''

const TextEditor = () => {
  const [content, setContent] = useState(DEFAULT)
  const contentRef = useRef(DEFAULT) // giữ nội dung hiện tại mà không gây re-render
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const onChangeContent = (value: string) => {
    contentRef.current = value // cập nhật giá trị tạm thời (render trong editor vẫn mượt)

    // debounce để tránh setState liên tục gây lag
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      setContent(contentRef.current) // chỉ setState sau 300ms
    }, 2000)
  }

  return (
    <RichTextEditor
      toolbar={{
        render: (props, toolbarItems, dom, containerDom) => {
          return containerDom(dom)
        }
      }}
      output='html'
      content={contentRef.current} // luôn hiển thị nội dung từ ref (không cần re-render)
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  )
}

export default TextEditor
