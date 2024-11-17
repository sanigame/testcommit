import { Buffer } from 'buffer'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_ERROR_RESPONSE } from '../../../constants/constants'
import { RootState } from '../../../store/store'
import { axios, resolveApiError } from '../../../utils'

const JIRA_API_URL = window?.env?.JIRA_API_URL
const EMAIL = window?.env?.EMAIL
const API_TOKEN = window?.env?.API_TOKEN
const JIRA_TOKEN = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64')

export const fetchPullRequestList = createAsyncThunk(
  'pullRequestListSlice/fetchPullRequestList',
  async (issueId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${JIRA_API_URL}/rest/dev-status/latest/issue/detail`, {
        params: {
          issueId,
          applicationType: 'bitbucket',
          dataType: 'pullrequest',
        },
        headers: {
          Authorization: `Basic ${JIRA_TOKEN}`,
          Accept: 'application/json',
        },
      })

      return response.data.detail[0]
    } catch (error) {
      return rejectWithValue(resolveApiError(error))
    }
  },
)
interface PullRequestListState {
  branches: {
    name: string
    lastCommit: {
      author: {
        name: string
      }
    }
    repository: {
      name: string
    }
  }[]
  pullRequests: {
    id: number
    name: string
    author: {
      name: string
    }
    destination: {
      branch: string
    }
    source: {
      branch: string
    }
    reviewers: {
      name: string
      approved: boolean
    }[]
  }[]
  isFetching: boolean
  error: API_ERROR_RESPONSE | null
}

const emptyData: PullRequestListState = {
  branches: [
    {
      name: '',
      lastCommit: {
        author: {
          name: '',
        },
      },
      repository: {
        name: '',
      },
    },
  ],
  pullRequests: [
    {
      id: 0,
      name: '',
      author: {
        name: '',
      },
      destination: {
        branch: '',
      },
      source: {
        branch: '',
      },
      reviewers: [],
    },
  ],
  isFetching: false,
  error: null,
}

const initialState: { [k: string]: PullRequestListState } = {}

const pullRequestListSlice = createSlice({
  name: 'pullRequestListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPullRequestList.pending, (state, action) => {
        state[action.meta.arg] = {
          branches: emptyData.branches,
          pullRequests: emptyData.pullRequests,
          isFetching: true,
          error: null,
        }
      })
      .addCase(fetchPullRequestList.fulfilled, (state, action) => {
        state[action.meta.arg] = {
          branches: action.payload.branches,
          pullRequests: action.payload.pullRequests,
          isFetching: false,
          error: null,
        }
      })
      .addCase(fetchPullRequestList.rejected, (state, action) => {
        state[action.meta.arg] = {
          branches: emptyData.branches,
          pullRequests: emptyData.pullRequests,
          isFetching: false,
          error: action.payload as API_ERROR_RESPONSE,
        }
      }),
})

export const getPullRequestDetail = (state: RootState, issueId: string) =>
  state.pullRequestList[issueId] || emptyData

export default pullRequestListSlice.reducer
