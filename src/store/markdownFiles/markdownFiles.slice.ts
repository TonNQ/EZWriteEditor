import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import markdownInstance from '../../services/markdown.api'
import { MarkdownFilesState } from './types'
import { MarkdownFile } from '../../types/markdownFile.type'

const initialState: MarkdownFilesState = {
  files: [],
  loading: false,
  error: null
}

export const fetchMarkdownFiles = createAsyncThunk('markdownFiles/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await markdownInstance.getAllMarkdownFiles()
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to fetch markdown files')
  }
})

export const deleteMarkdownFile = createAsyncThunk(
  'markdownFiles/delete',
  async (fileId: string, { rejectWithValue }) => {
    try {
      const response = await markdownInstance.deleteMarkdownFile(fileId)
      return response.data
    } catch (error) {
      return rejectWithValue('Failed to delete markdown file')
    }
  }
)

const markdownFilesSlice = createSlice({
  name: 'markdownFiles',
  initialState,
  reducers: {
    resetMarkdownFilesState(state) {
      Object.assign(state, initialState)
    },
    setMarkdownFiles(state, action: PayloadAction<MarkdownFile[]>) {
      state.files = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkdownFiles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMarkdownFiles.fulfilled, (state, action) => {
        state.loading = false
        console.log('action.payload', action.payload)
        state.files = action.payload
      })
      .addCase(fetchMarkdownFiles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteMarkdownFile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteMarkdownFile.fulfilled, (state, action) => {
        state.loading = false
        state.files = state.files.filter((file) => file.id != action.payload.id)
      })
      .addCase(deleteMarkdownFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { resetMarkdownFilesState, setMarkdownFiles } = markdownFilesSlice.actions
export default markdownFilesSlice.reducer
