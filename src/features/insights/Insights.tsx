import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'

import { BoardListSelection } from '../boardListSelection'
import { IssueList } from '../issueList'
// import { PullRequestList } from '../pullRequestList'
import { RecentProjectSelection } from '../recentProjectSelection'
// import { RepositoryList } from '../repositoryList'
import { SprintListSelection } from '../sprintListSelection'
import { TeamInsights } from '../teamInsights'

function Insights() {
  const [projectSelected, setProjectSelected] = useState('')
  const [boardSelected, setBoardSelected] = useState('')
  const [sprintSelected, setSprintSelected] = useState('')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <RecentProjectSelection
            projectSelected={projectSelected}
            onSelectProject={(event) => setProjectSelected(event.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <BoardListSelection
            projectKeyOrId={projectSelected}
            boardSelected={boardSelected}
            onSelectBoard={(event) => setBoardSelected(event.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <SprintListSelection
            boardId={boardSelected}
            sprintSelected={sprintSelected}
            onSelectSprint={(event) => setSprintSelected(event.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TeamInsights />
          <IssueList sprintId={sprintSelected} />
          {/* <RepositoryList issueId="1113751" /> */}
          {/* <PullRequestList issueId="1113751" /> */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Insights
