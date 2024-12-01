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

export const fetchIssueList = createAsyncThunk(
  'issueListSlice/fetchIssueList',
  async (userData: { sprintId: string }, { rejectWithValue }) => {
    try {
      const { sprintId } = userData
      const response = await axios.get(`${JIRA_API_URL}/rest/agile/1.0/sprint/${sprintId}/issue`, {
        params: {
          startAt: 0,
          maxResults: 500,
        },
        headers: {
          Authorization: `Basic ${JIRA_TOKEN}`,
          Accept: 'application/json',
        },
      })

      return response.data.issues
    } catch (error) {
      return rejectWithValue(resolveApiError(error))
    }
  },
)

export const fetchIssueListFromBoard = createAsyncThunk(
  'issueListSlice/fetchIssueList',
  async (userData: { boardId: string; release: string }, { rejectWithValue }) => {
    try {
      const { boardId, release } = userData
      const response = await axios.get(`${JIRA_API_URL}/rest/agile/1.0/board/${boardId}/issue`, {
        params: {
          startAt: 0,
          maxResults: 500,
          jql: `project = ONEAPP AND "release[dropdown]" = ${release} ORDER BY created DESC`,
        },
        headers: {
          Authorization: `Basic ${JIRA_TOKEN}`,
          Accept: 'application/json',
        },
      })

      return response.data.issues
    } catch (error) {
      return rejectWithValue(resolveApiError(error))
    }
  },
)
interface IssueListState {
  list: {
    id: number
    key: string
    fields: {
      summary: string
      assignee: {
        accountId: string
        displayName: string
        emailAddress: string
      }
      status: {
        name: string
      }
      issuetype: {
        name: string
      }
      priority: {
        name: string
      }
      customfield_10513: {
        value: string
      }
    }
  }[]
  isFetching: boolean
  error: API_ERROR_RESPONSE | null
}

const initialState: IssueListState = {
  list: [],
  isFetching: false,
  error: null,
}

const issueListSlice = createSlice({
  name: 'issueListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchIssueList.pending, (state) => {
        state.list = []
        state.isFetching = true
        state.error = null
      })
      .addCase(fetchIssueList.fulfilled, (state, action) => {
        state.isFetching = false
        state.list = action.payload
      })
      .addCase(fetchIssueList.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload as API_ERROR_RESPONSE
      }),
})

export default issueListSlice.reducer
