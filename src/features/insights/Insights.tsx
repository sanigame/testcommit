import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'

import { BoardListSelection } from '../boardListSelection'
import { IssueList } from '../issueList'
// import { PullRequestList } from '../pullRequestList'
import { Productivity } from '../productivity'
import { RecentProjectSelection } from '../recentProjectSelection'

// import { RepositoryList } from '../repositoryList'
// import { SprintListSelection } from '../sprintListSelection'
// import { TeamInsights } from '../teamInsights'
import ReleaseSelection from './components/ReleaseSelection'

function Insights() {
  const [projectSelected, setProjectSelected] = useState('')
  const [boardSelected, setBoardSelected] = useState('')
  // const [sprintSelected, setSprintSelected] = useState('')
  const [releaseSelected, setReleaseSelected] = useState('R10.2')
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
          <ReleaseSelection
            releaseSelected={releaseSelected}
            onSelectRelease={(event) => setReleaseSelected(event.target.value)}
          />
          {/* <SprintListSelection
            boardId={boardSelected}
            sprintSelected={sprintSelected}
            onSelectSprint={(event) => setSprintSelected(event.target.value)}
          /> */}
        </Grid>
        <Grid size={12}>
          <Productivity />
          {/* <TeamInsights /> */}
          <IssueList boardId={boardSelected} release={releaseSelected} />
          {/* <RepositoryList issueId="1113751" /> */}
          {/* <PullRequestList issueId="1113751" /> */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Insights
