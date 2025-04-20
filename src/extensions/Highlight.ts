import { Mark, mergeAttributes } from '@tiptap/core'

const Highlight = Mark.create({
  name: 'highlight',

  addAttributes() {
    return {
      class: {
        default: 'highlight'
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span.highlight'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  }
})

export default Highlight
