import { combineReducers } from '@reduxjs/toolkit'

import boardListReducer from '../features/boardListSelection/redux/boardListSlice'
import counterReducer from '../features/counter/redux/counterSlice'
import issueListReducer from '../features/issueList/redux/issueListSlice'
import pullRequestListReducer from '../features/pullRequestList/redux/pullRequestListSlice'
import recentProjectReducer from '../features/recentProjectSelection/redux/recentProjectSlice'
import redditDetailReducer from '../features/redditDetail/redux/redditDetailSlice'
import redditListReducer from '../features/redditList/redux/redditListSlice'
import repositoryListReducer from '../features/repositoryList/redux/repositoryListSlice'
import sprintListReducer from '../features/sprintListSelection/redux/sprintListSlice'
import layoutReducer from '../layout/redux/layoutSlice'

const rootReducers = combineReducers({
  layout: layoutReducer,
  counter: counterReducer,
  redditList: redditListReducer,
  redditDetail: redditDetailReducer,
  recentProject: recentProjectReducer,
  boardList: boardListReducer,
  sprintList: sprintListReducer,
  issueList: issueListReducer,
  repositoryList: repositoryListReducer,
  pullRequestList: pullRequestListReducer,
})

export default rootReducers
