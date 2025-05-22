import { MarkdownFile } from '../../types/markdownFile.type'

export interface MarkdownFilesState {
  files: MarkdownFile[]
  loading: boolean
  error: string | null
}
