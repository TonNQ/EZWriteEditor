import { HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { SUCCESS_MESSAGE } from '../constants/message'
import { ApiResponse } from '../types/common.type'
import {
  CreateMarkdownFileBody,
  MarkdownFile,
  MarkdownVersion,
  UpdateMarkdownFileBody,
  UpdateMarkdownVersionBody
} from '../types/markdownFile.type'
import http from '../utils/api'

const getAllMarkdownFiles = async (signal?: AbortSignal): Promise<ApiResponse<MarkdownFile[]>> => {
  try {
    const response = await http.get<MarkdownFile[]>({
      url: '/api/markdown/files/',
      key: 'get-all-markdown-files',
      signal
    })

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
    const response = await http.post<MarkdownFile>({
      url: '/api/markdown/files/',
      key: 'create-markdown-file',
      body,
      signal
    })
    toast.success(SUCCESS_MESSAGE.SAVE_MARKDOWN_FILE)

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
    const response = await http.get<MarkdownFile>({
      url: `/api/markdown/files/${id}/`,
      key: 'get-markdown-file-by-id',
      signal
    })

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
    const response = await http.get<MarkdownVersion>({
      url: `/api/markdown/files/${id}/latest-content/`,
      key: 'get-latest-content-of-markdown-file',
      signal
    })

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
    const response = await http.get<MarkdownVersion[]>({
      url: `/api/markdown/files/${id}/versions/`,

      key: 'get-all-versions-of-markdown-file',
      signal
    })

    return {
      status: response.status || HttpStatusCode.Ok,
      data: response.data ?? {}
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
    const response = await http.get<MarkdownVersion>({
      url: `/api/markdown/files/${id}/version_content/`,
      params: {
        version_id: versionId
      },
      key: 'get-version-content-of-markdown-file',
      signal
    })

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
  restoreVersionOfMarkdownFile
}

export default markdownInstance
