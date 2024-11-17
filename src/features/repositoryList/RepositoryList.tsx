import React, { useEffect } from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'

import CircleLoading from '../../components/circleLoading/CircleLoading'
import { useAppDispatch, useAppSelector } from '../../hooks/store'

import { fetchRepositoryList, getRepositoryDetail } from './redux/repositoryListSlice'

type Props = {
  issueId: string
}
function RepositoryList({ issueId }: Props) {
  const dispatch = useAppDispatch()
  const { list, isFetching } = useAppSelector((state) => getRepositoryDetail(state, issueId))

  useEffect(() => {
    if (issueId !== '') {
      dispatch(fetchRepositoryList(issueId))
    }
    return () => {}
  }, [dispatch, issueId])

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Repository
      </Typography>
      {isFetching ? <CircleLoading /> : null}
      {list.map((repo) => {
        return (
          <div key={repo.id}>
            <p>repository: {repo.name}</p>
          </div>
        )
      })}
      <Typography variant="h5" gutterBottom>
        Commits
      </Typography>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          // maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}>
        {list.map((repo) => (
          <li key={repo.id}>
            <ul>
              <ListSubheader>{`Repo ${repo.name}`}</ListSubheader>
              {repo.commits.map((commit) => (
                <ListItem key={commit.id}>
                  <ListItemText primary={commit.message} secondary={commit.author.name} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </div>
  )
}

export default RepositoryList
