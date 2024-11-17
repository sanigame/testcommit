import { Buffer } from 'buffer'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_ERROR_RESPONSE } from '../../../constants/constants'
import { RootState } from '../../../store/store'
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

export const fetchRepositoryList = createAsyncThunk(
  'repositoryListSlice/fetchRepositoryList',
  async (issueId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${JIRA_API_URL}/rest/dev-status/latest/issue/detail`, {
        params: {
          issueId,
          applicationType: 'bitbucket',
          dataType: 'repository',
        },
        headers: {
          Authorization: `Basic ${JIRA_TOKEN}`,
          Accept: 'application/json',
        },
      })

      return response.data.detail[0].repositories
    } catch (error) {
      return rejectWithValue(resolveApiError(error))
    }
  },
)
interface RepositoryListState {
  list: {
    id: number
    name: string
    url: string
    commits: {
      id: number
      message: string
      merge: boolean
      author: {
        name: string
      }
    }[]
  }[]
  isFetching: boolean
  error: API_ERROR_RESPONSE | null
}

const emptyData: RepositoryListState = {
  list: [],
  isFetching: false,
  error: null,
}

const initialState: { [k: string]: RepositoryListState } = {}

const repositoryListSlice = createSlice({
  name: 'repositoryListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRepositoryList.pending, (state, action) => {
        state[action.meta.arg] = {
          list: [],
          isFetching: true,
          error: null,
        }
      })
      .addCase(fetchRepositoryList.fulfilled, (state, action) => {
        state[action.meta.arg] = {
          list: action.payload,
          isFetching: false,
          error: null,
        }
      })
      .addCase(fetchRepositoryList.rejected, (state, action) => {
        state[action.meta.arg] = {
          list: [],
          isFetching: false,
          error: action.payload as API_ERROR_RESPONSE,
        }
      }),
})

export const getRepositoryDetail = (state: RootState, issueId: string) =>
  state.repositoryList[issueId] || emptyData

export default repositoryListSlice.reducer
