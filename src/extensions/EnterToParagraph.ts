import { Extension } from '@tiptap/core'

const EnterToParagraph = Extension.create({
  name: 'enterToParagraph',

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { $from } = editor.state.selection
        const parentNode = $from.node()

        if (parentNode.type.name === 'heading') {
          editor.commands.splitBlock()
          editor.commands.setNode('paragraph')
          return true
        }

        return false
      }
    }
  }
})

export default EnterToParagraph
