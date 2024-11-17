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

export const fetchSprintList = createAsyncThunk(
  'sprintListSlice/fetchSprintList',
  async (userData: { boardId: string }, { rejectWithValue }) => {
    try {
      const { boardId } = userData
      const response = await axios.get(`${JIRA_API_URL}/rest/agile/1.0/board/${boardId}/sprint`, {
        params: {
          startAt: 0,
          maxResults: 100,
          state: 'active',
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
interface SprintListState {
  list: {
    id: number
    name: string
    type: string
    state: string
  }[]
  isFetching: boolean
  error: API_ERROR_RESPONSE | null
}

const initialState: SprintListState = {
  list: [],
  isFetching: false,
  error: null,
}

const sprintListSlice = createSlice({
  name: 'sprintListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchSprintList.pending, (state) => {
        state.list = []
        state.isFetching = true
        state.error = null
      })
      .addCase(fetchSprintList.fulfilled, (state, action) => {
        state.isFetching = false
        state.list = action.payload
      })
      .addCase(fetchSprintList.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload as API_ERROR_RESPONSE
      }),
})

export default sprintListSlice.reducer
