import { Buffer } from 'buffer'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_ERROR_RESPONSE } from '../../../constants/constants'
import { axios, resolveApiError } from '../../../utils'

const JIRA_API_URL = window?.env?.JIRA_API_URL
const EMAIL = localStorage.getItem('email')
if (!EMAIL) {
  localStorage.setItem('email', '')
}

const API_TOKEN = localStorage.getItem('token')
if (!EMAIL) {
  localStorage.setItem('token', '')
}
const JIRA_TOKEN = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64')

const boardStartAt = localStorage.getItem('boardStartAt')
if (!boardStartAt) {
  localStorage.setItem('boardStartAt', '0')
}

export const fetchBoardList = createAsyncThunk(
  'boardListSlice/fetchBoardsList',
  async (userData: { projectKeyOrId: string }, { rejectWithValue }) => {
    try {
      const { projectKeyOrId } = userData
      const response = await axios.get(`${JIRA_API_URL}/rest/agile/1.0/board`, {
        params: {
          orderBy: 'name',
          startAt: boardStartAt,
          maxResults: 200,
          projectKeyOrId,
        },
        headers: {
          Authorization: `Basic ${JIRA_TOKEN}`,
          Accept: 'application/json',
        },
      })

      return response.data.values
    } catch (error) {
      return rejectWithValue(resolveApiError(error))
    }
  },
)
interface BoardListState {
  list: {
    id: number
    name: string
    type: string
  }[]
  isFetching: boolean
  error: API_ERROR_RESPONSE | null
}

const initialState: BoardListState = {
  list: [],
  isFetching: false,
  error: null,
}

const boardsListSlice = createSlice({
  name: 'boardListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBoardList.pending, (state) => {
        state.list = []
        state.isFetching = true
        state.error = null
      })
      .addCase(fetchBoardList.fulfilled, (state, action) => {
        state.isFetching = false
        state.list = action.payload
      })
      .addCase(fetchBoardList.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload as API_ERROR_RESPONSE
      }),
})

export default boardsListSlice.reducer
