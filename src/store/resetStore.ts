import { resetAuthState } from './auth/auth.slice'
import { resetEditorState } from './editor/editor.slice'
import { store } from './index'
import { resetMarkdownFilesState } from './markdownFiles/markdownFiles.slice'
import { resetSuggestionState } from './suggestion/suggestion.slice'

export const resetAllStore = () => {
  store.dispatch(resetAuthState())
  store.dispatch(resetEditorState())
  store.dispatch(resetMarkdownFilesState())
  store.dispatch(resetSuggestionState())
}
