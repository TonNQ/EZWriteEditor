import { HttpStatusCode } from 'axios'
import { ApiResponse } from '../types/common.type'
import {
  CreateMarkdownFileBody,
  MarkdownFile,
  MarkdownFileShare,
  MarkdownFileWithShares,
  MarkdownVersion,
  MarkdownVersionResponse,
  ShareWithEmailBody,
  UpdateMarkdownFileBody,
  UpdateMarkdownVersionBody
} from '../types/markdownFile.type'
import http from '../utils/api'

export interface MarkdownFileSharesResponse {
  document: {
    id: number
    title: string
    description: string
    owner_email: string
    created_at: string
    updated_at: string
  }
  shares: Array<{
    document_title: string
    document_description: string
    owner_email: string
    created_at: string
    can_edit: boolean
    shared_with_email?: string
  }>
}

const getAllMarkdownFiles = async (signal?: AbortSignal): Promise<ApiResponse<MarkdownFile[]>> => {
  try {
    const response = (await http.get<MarkdownFile[]>({
      url: '/api/markdown/files/',
      key: 'get-all-markdown-files',
      signal
    })) as ApiResponse<MarkdownFile[]>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? []
    }
  } catch (error) {
    console.error('Get all markdown files API error:', error)
    return error as ApiResponse<MarkdownFile[]>
  }
}

const createMarkdownFile = async (
  body: CreateMarkdownFileBody,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownFile>> => {
  try {
    const response = (await http.post<MarkdownFile>({
      url: '/api/markdown/files/',
      key: 'create-markdown-file',
      body,
      signal
    })) as ApiResponse<MarkdownFile>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Create markdown file API error:', error)
    return error as ApiResponse<MarkdownFile>
  }
}

const getMarkdownFileById = async (id: string, signal?: AbortSignal): Promise<ApiResponse<MarkdownFile>> => {
  try {
    const response = (await http.get<MarkdownFile>({
      url: `/api/markdown/files/${id}/`,
      key: 'get-markdown-file-by-id',
      signal
    })) as ApiResponse<MarkdownFile>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Get markdown file by id API error:', error)
    return error as ApiResponse<MarkdownFile>
  }
}

const updateMarkdownFile = async (
  id: string,
  body: UpdateMarkdownFileBody,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownFile>> => {
  try {
    const response = await http.put<MarkdownFile>({
      url: `/api/markdown/files/${id}/`,
      key: 'update-markdown-file',
      body,
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Update markdown file API error:', error)
    return error as ApiResponse<MarkdownFile>
  }
}

const deleteMarkdownFile = async (id: string, signal?: AbortSignal): Promise<ApiResponse<MarkdownFile>> => {
  try {
    const response = await http.delete<MarkdownFile>({
      url: `/api/markdown/files/${id}/`,
      key: 'update-markdown-file',
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Delete markdown file API error:', error)
    return error as ApiResponse<MarkdownFile>
  }
}

const getLatestContentOfMarkdownFile = async (
  id: string,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownVersion>> => {
  try {
    const response = (await http.get<MarkdownVersion>({
      url: `/api/markdown/files/${id}/latest-content/`,
      key: 'get-latest-content-of-markdown-file',
      signal
    })) as ApiResponse<MarkdownVersion>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Get latest content of markdown file API error:', error)
    return error as ApiResponse<MarkdownVersion>
  }
}

const getAllVersionsOfMarkdownFile = async (
  id: string,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownVersion[]>> => {
  try {
    const response = (await http.get<MarkdownVersionResponse>({
      url: `/api/markdown/files/${id}/versions/`,

      key: 'get-all-versions-of-markdown-file',
      signal
    })) as ApiResponse<MarkdownVersionResponse>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data.versions ?? []
    }
  } catch (error) {
    console.error('Get all versions of markdown file API error:', error)
    return error as ApiResponse<MarkdownVersion[]>
  }
}

const createVersionOfMarkdownFile = async (
  id: string,
  body: UpdateMarkdownVersionBody,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownVersion>> => {
  try {
    const response = await http.post<MarkdownVersion>({
      url: `/api/markdown/files/${id}/save_version/`,
      key: 'create-version-of-markdown-file',
      body,
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Create version of markdown file API error:', error)
    return error as ApiResponse<MarkdownVersion>
  }
}

const getVersionContentOfMarkdownFile = async (
  id: string,
  versionId: string,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownVersion>> => {
  try {
    const response = (await http.get<MarkdownVersion>({
      url: `/api/markdown/files/${id}/version_content/`,
      params: {
        version_id: versionId
      },
      key: 'get-version-content-of-markdown-file',
      signal
    })) as ApiResponse<MarkdownVersion>

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Get version content of markdown file API error:', error)
    return error as ApiResponse<MarkdownVersion>
  }
}

const restoreVersionOfMarkdownFile = async (
  id: string,
  versionId: string,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownVersion>> => {
  try {
    const response = await http.post<MarkdownVersion>({
      url: `/api/markdown/files/${id}/restore_version/`,
      body: {
        version_id: versionId
      },
      key: 'restore-version-of-markdown-file',
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Restore version of markdown file API error:', error)
    return error as ApiResponse<MarkdownVersion>
  }
}

const updateVersionOfMarkdownFile = async (
  fileId: string,
  body: Partial<MarkdownVersion>,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownVersion>> => {
  try {
    const response = await http.post<MarkdownVersion>({
      key: 'update-version-of-markdown-file',
      url: `/api/markdown/files/${fileId}/update_version_metadata/`,
      body,
      signal
    })
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Update version of markdown file API error:', error)
    return error as ApiResponse<MarkdownVersion>
  }
}

// Share a document with another user by email
const shareMarkdownFile = async (
  id: string,
  body: ShareWithEmailBody,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownFileShare>> => {
  try {
    const response = await http.post<MarkdownFileShare>({
      url: `/api/markdown/files/${id}/share/`,
      key: 'share-markdown-file',
      body,
      signal
    })
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Share markdown file API error:', error)
    return error as ApiResponse<MarkdownFileShare>
  }
}

// Remove sharing access for a user
const unshareMarkdownFile = async (
  id: string,
  shared_with_email: string,
  signal?: AbortSignal
): Promise<ApiResponse<{ unshared_with_email: string }>> => {
  try {
    const response = await http.delete<{ unshared_with_email: string }>({
      url: `/api/markdown/files/${id}/unshare/`,
      key: 'unshare-markdown-file',
      params: { shared_with_email },
      signal
    })
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
    }
  } catch (error) {
    console.error('Unshare markdown file API error:', error)
    return error as ApiResponse<{ unshared_with_email: string }>
  }
}

// List all users a document is shared with
const getMarkdownFileShares = async (
  id: string,
  signal?: AbortSignal
): Promise<ApiResponse<MarkdownFileSharesResponse>> => {
  try {
    const response = (await http.get<MarkdownFileSharesResponse>({
      url: `/api/markdown/files/${id}/shares/`,
      key: 'get-markdown-file-shares',
      signal,
      standardResponse: true
    })) as ApiResponse<MarkdownFileSharesResponse>
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data
    }
  } catch (error) {
    console.error('Get markdown file shares API error:', error)
    return error as ApiResponse<MarkdownFileSharesResponse>
  }
}

// List all documents shared with current user
const getMarkdownFilesSharedWithMe = async (signal?: AbortSignal): Promise<ApiResponse<MarkdownFile[]>> => {
  try {
    const response = (await http.get<MarkdownFile[]>({
      url: '/api/markdown/files/shared_with_me/',
      key: 'get-markdown-files-shared-with-me',
      signal,
      standardResponse: true
    })) as ApiResponse<MarkdownFile[]>
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? []
    }
  } catch (error) {
    console.error('Get markdown files shared with me API error:', error)
    return error as ApiResponse<MarkdownFile[]>
  }
}

// List all documents the user is sharing with others
const getMySharedMarkdownFiles = async (signal?: AbortSignal): Promise<ApiResponse<MarkdownFileWithShares[]>> => {
  try {
    const response = (await http.get<MarkdownFileWithShares[]>({
      url: '/api/markdown/files/my_shares/',
      key: 'get-my-shared-markdown-files',
      signal,
      standardResponse: true
    })) as ApiResponse<MarkdownFileWithShares[]>
    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? []
    }
  } catch (error) {
    console.error('Get my shared markdown files API error:', error)
    return error as ApiResponse<MarkdownFileWithShares[]>
  }
}

const markdownInstance = {
  createMarkdownFile,
  getAllMarkdownFiles,
  getMarkdownFileById,
  updateMarkdownFile,
  deleteMarkdownFile,
  getLatestContentOfMarkdownFile,
  getAllVersionsOfMarkdownFile,
  createVersionOfMarkdownFile,
  getVersionContentOfMarkdownFile,
  restoreVersionOfMarkdownFile,
  updateVersionOfMarkdownFile,
  shareMarkdownFile,
  unshareMarkdownFile,
  getMarkdownFileShares,
  getMarkdownFilesSharedWithMe,
  getMySharedMarkdownFiles
}

export default markdownInstance
