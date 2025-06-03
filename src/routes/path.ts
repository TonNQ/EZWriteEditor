export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  file: '/file',
  dictionary: '/dictionary',
  compose: '/editor',
  editor: '/editor/:id'
}

export const getEditorPage = (fileId: string) => path.editor.replace(':id', fileId)
