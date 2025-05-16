export interface MarkdownFile {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
  latest_version: MarkdownVersion
  version_count: number
}

export interface MarkdownVersion {
  id: number
  version_number: number
  created_at: string
  commit_message: string
  content?: string
  download_url: string
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
  commit_message: string
}
