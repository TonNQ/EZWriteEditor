import { Extension } from '@tiptap/core'

const KeepHeadingOnEnter = Extension.create({
  name: 'keepHeadingOnEnter',

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { $from } = editor.state.selection
        const parentNode = $from.node()

        if (parentNode.type.name === 'heading') {
          const level = parentNode.attrs.level

          editor.commands.splitBlock()

          setTimeout(() => {
            editor.chain().focus().setNode('heading', { level }).run()
            const transaction = editor.state.tr
            editor.emit('selectionUpdate', { editor, transaction })
          }, 0)

          return true
        }

        return false
      }
    }
  }
})

export default KeepHeadingOnEnter
