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

export const fetchRecentProjectList = createAsyncThunk(
  'recentProjectList/fetchRecentProjectList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${JIRA_API_URL}/rest/api/3/project/recent`, {
        headers: {
          Authorization: `Basic ${JIRA_TOKEN}`,
          Accept: 'application/json',
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(resolveApiError(error))
    }
  },
)
interface RecentProjectState {
  list: {
    name: string
    key: string
  }[]
  isFetching: boolean
  error: API_ERROR_RESPONSE | null
}

const initialState: RecentProjectState = {
  list: [],
  isFetching: false,
  error: null,
}

const recentProjectSlice = createSlice({
  name: 'recentProjectList',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecentProjectList.pending, (state) => {
        state.list = []
        state.isFetching = true
        state.error = null
      })
      .addCase(fetchRecentProjectList.fulfilled, (state, action) => {
        state.isFetching = false
        state.list = action.payload
      })
      .addCase(fetchRecentProjectList.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload as API_ERROR_RESPONSE
      }),
})

export default recentProjectSlice.reducer
