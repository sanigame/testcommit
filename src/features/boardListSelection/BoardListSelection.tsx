import React, { useEffect } from 'react'

import { Select, type SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import { useAppDispatch, useAppSelector } from '../../hooks/store'

import { fetchBoardList } from './redux/boardListSlice'

type Props = {
  projectKeyOrId: string
  boardSelected: string
  onSelectBoard: (event: SelectChangeEvent) => void
}
function BoardListSelection({ projectKeyOrId, boardSelected, onSelectBoard }: Props) {
  const dispatch = useAppDispatch()
  const { list, isFetching } = useAppSelector((state) => state.boardList)

  useEffect(() => {
    if (projectKeyOrId !== '') {
      dispatch(fetchBoardList({ projectKeyOrId }))
    }
    return () => {}
  }, [dispatch, projectKeyOrId])

  return (
    <FormControl sx={{ m: 0, width: '100%' }} disabled={projectKeyOrId === '' || isFetching}>
      <InputLabel id="board-list">Board list</InputLabel>
      <Select
        labelId="board-list"
        value={boardSelected}
        onChange={onSelectBoard}
        autoWidth
        label="Board list">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list.map((board, i) => {
          return (
            <MenuItem key={i} value={board.id}>
              [{board.id}] {board.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default BoardListSelection
