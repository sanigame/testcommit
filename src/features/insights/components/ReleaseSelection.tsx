import React from 'react'

import { Select, type SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

const RELEASE_LIST = [
  'R0',
  'R1',
  'R1.5',
  'R2',
  'R2.1',
  'R3',
  'R4',
  'R5',
  'R6',
  'R7',
  'R8',
  'R9',
  'R9.1',
  'R9.2',
  'R10.1',
  'R10.2',
  'R11.1',
  'R11.2',
  'R12.1',
  'R12.2',
  'R13.1',
  'R13.2',
  'R14.1',
  'R14.2',
  'R15.1',
  'R15.2',
]

type Props = {
  releaseSelected: string
  onSelectRelease: (event: SelectChangeEvent) => void
}

function ReleaseSelection({ releaseSelected, onSelectRelease }: Props) {
  return (
    <div>
      <FormControl sx={{ m: 0, width: '100%' }}>
        <InputLabel id="release">Release</InputLabel>
        <Select
          labelId="release"
          value={releaseSelected}
          onChange={onSelectRelease}
          autoWidth
          label="Release">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {RELEASE_LIST.map((release, i) => {
            return (
              <MenuItem key={i} value={release}>
                {release}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}

export default ReleaseSelection
