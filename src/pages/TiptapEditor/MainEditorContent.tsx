import { type Editor, EditorContent } from '@tiptap/react'

interface MainEditorContentProps {
  editor: Editor | null
}

const MainEditorContent = ({ editor }: MainEditorContentProps) => {
  return (
    <div className='block min-h-full flex-1 p-4 overflow-auto'>
      <div className='m-auto min-h-full max-w-[1000px] rounded-lg border border-gray-200 bg-white px-8 py-4 shadow-sm'>
        <EditorContent editor={editor} className='prose max-w-none' />
      </div>
    </div>
  )
}

export default MainEditorContent
