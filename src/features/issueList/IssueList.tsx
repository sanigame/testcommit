import React, { useEffect } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Grid from '@mui/material/Grid2'

import CircleLoading from '../../components/circleLoading/CircleLoading'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { PullRequestList } from '../pullRequestList'
import { RepositoryList } from '../repositoryList'

import { fetchIssueList } from './redux/issueListSlice'

type Props = {
  sprintId: string
}
function SprintList({ sprintId }: Props) {
  const dispatch = useAppDispatch()
  const { list, isFetching } = useAppSelector((state) => state.issueList)

  useEffect(() => {
    if (sprintId !== '') {
      dispatch(fetchIssueList({ sprintId }))
    }
    return () => {}
  }, [dispatch, sprintId])

  return (
    <div>
      {isFetching ? <CircleLoading /> : null}
      {list.map((sprint, i) => {
        return (
          <Accordion key={i} defaultExpanded={i === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}-content`}
              id={`panel${i}-header`}>
              [{sprint.key}] ({sprint.fields.assignee?.displayName || '-'}) {sprint.fields.summary}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <RepositoryList issueId={sprint.id.toString()} />
                </Grid>
                <Grid size={6}>
                  <PullRequestList issueId={sprint.id.toString()} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default SprintList
