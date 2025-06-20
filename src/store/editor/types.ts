export type EditorLanguage = 'en' | 'vi'

export interface EditorState {
  language: EditorLanguage
  title: string
  description: string
  isShowHistory: boolean
}
