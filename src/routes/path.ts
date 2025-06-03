export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  file: '/file',
  dictionary: '/dictionary',
  composeNewFile: '/editor/new-file',
  editor: '/editor/:id'
}

export const getEditorPage = (fileId: string) => path.editor.replace(':id', fileId)
