import React, { useEffect } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import CircleLoading from '../../components/circleLoading/CircleLoading'
import { useAppDispatch, useAppSelector } from '../../hooks/store'

import { fetchPullRequestList, getPullRequestDetail } from './redux/pullRequestListSlice'

type Props = {
  issueId: string
}
function PullRequestList({ issueId }: Props) {
  const dispatch = useAppDispatch()
  const { branches, pullRequests, isFetching } = useAppSelector((state) =>
    getPullRequestDetail(state, issueId),
  )

  useEffect(() => {
    if (issueId !== '') {
      dispatch(fetchPullRequestList(issueId))
    }
    return () => {}
  }, [dispatch, issueId])

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Pull request branch
      </Typography>
      {isFetching ? <CircleLoading /> : null}
      {branches.map((branch, i) => {
        return (
          <div key={i}>
            <p>
              repository: {branch.repository.name} , branch: [{branch.lastCommit.author.name}]{' '}
              {branch.name}
            </p>
          </div>
        )
      })}

      <Typography variant="h5" gutterBottom>
        Pull request list
      </Typography>
      {pullRequests.map((request, i) => {
        return (
          <div key={i}>
            <p>author: {request.author.name}</p>
            <p>name: {request.name}</p>
            <p>source: {request.source.branch}</p>
            <p>destination: {request.destination.branch}</p>
            <p>Reviewers: </p>
            <div>
              {request.reviewers.map((reviewer, i) => {
                return (
                  <Chip
                    key={i}
                    onClick={() => {}}
                    onDelete={() => {}}
                    label={reviewer.name}
                    deleteIcon={reviewer.approved ? <DoneIcon /> : <></>}
                  />
                )
              })}
            </div>
            ---------------------------
          </div>
        )
      })}
    </div>
  )
}

export default PullRequestList
