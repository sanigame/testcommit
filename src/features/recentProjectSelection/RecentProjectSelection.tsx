import React, { useEffect } from 'react'

import { Select, type SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import { useAppDispatch, useAppSelector } from '../../hooks/store'

import { fetchRecentProjectList } from './redux/recentProjectSlice'

type Props = {
  projectSelected: string
  onSelectProject: (event: SelectChangeEvent) => void
}
function RecentProjectSelection({ projectSelected, onSelectProject }: Props) {
  const dispatch = useAppDispatch()
  const { list } = useAppSelector((state) => state.recentProject)

  useEffect(() => {
    dispatch(fetchRecentProjectList())
    return () => {}
  }, [dispatch])

  return (
    <FormControl sx={{ m: 0, width: '100%' }}>
      <InputLabel id="recent-project">Recent project</InputLabel>
      <Select
        labelId="recent-project"
        value={projectSelected}
        onChange={onSelectProject}
        autoWidth
        label="Recent project">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list.map((project, i) => {
          return (
            <MenuItem key={i} value={project.key}>
              {project.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default RecentProjectSelection
