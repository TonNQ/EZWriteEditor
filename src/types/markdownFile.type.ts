export interface MarkdownFile {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
  latest_version: MarkdownVersion
  version_count: number
  content?: string
  is_owner?: boolean
}

export interface MarkdownVersionResponse {
  id: number
  title: string
  description: string
  view_url: string
  edit_url: string
  versions: MarkdownVersion[]
}

export interface MarkdownVersion {
  id: number
  version_number: number
  created_at: string
  commit_message: string
  content?: string
  download_url: string
  version_name?: string
}

export interface CreateMarkdownFileBody {
  title: string
  description: string
  content: string
}

export interface UpdateMarkdownFileBody {
  title: string
  description: string
}

export interface UpdateMarkdownVersionBody {
  content: string
  version_name: string
  commit_message: string
}

export interface SaveFileFormData {
  title: string
  description: string
  versionName: string
  commitMessage: string
}
