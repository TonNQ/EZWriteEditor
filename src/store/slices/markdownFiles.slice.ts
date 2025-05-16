import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import markdownInstance from '../../services/markdown.api'
import { MarkdownFilesState } from './types'

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

const markdownFilesSlice = createSlice({
  name: 'markdownFiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkdownFiles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMarkdownFiles.fulfilled, (state, action) => {
        state.loading = false
        state.files = action.payload
      })
      .addCase(fetchMarkdownFiles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export default markdownFilesSlice.reducer
