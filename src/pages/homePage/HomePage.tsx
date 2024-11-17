import React from 'react'

import Typography from '@mui/material/Typography'

import Insights from '../../features/insights/Insights'
import PageContainer from '../PageContainer'

function HomePage() {
  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Insights
      </Typography>
      <Insights />
    </PageContainer>
  )
}

export default HomePage
