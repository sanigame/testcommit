import React, { useEffect } from 'react'

import { Select, type SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import { useAppDispatch, useAppSelector } from '../../hooks/store'

import { fetchSprintList } from './redux/sprintListSlice'

type Props = {
  boardId: string
  sprintSelected: string
  onSelectSprint: (event: SelectChangeEvent) => void
}
function SprintListSelection({ boardId, sprintSelected, onSelectSprint }: Props) {
  const dispatch = useAppDispatch()
  const { list, isFetching } = useAppSelector((state) => state.sprintList)

  useEffect(() => {
    if (boardId !== '') {
      dispatch(fetchSprintList({ boardId }))
    }
    return () => {}
  }, [dispatch, boardId])

  return (
    <FormControl sx={{ m: 0, width: '100%' }} disabled={boardId === '' || isFetching}>
      <InputLabel id="sprint-list">Sprint list</InputLabel>
      <Select
        labelId="sprint-list"
        value={sprintSelected}
        onChange={onSelectSprint}
        autoWidth
        label="Sprint list">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list.map((sprint, i) => {
          return (
            <MenuItem key={i} value={sprint.id}>
              [{sprint.id}] {sprint.name} ({sprint.state})
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SprintListSelection
