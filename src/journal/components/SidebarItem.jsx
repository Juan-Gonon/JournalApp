/* eslint-disable react/prop-types */
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export function SidebarItem ({ note }) {
  const dispatch = useDispatch()
  const newTitle = useMemo(() => {
    return note.title.length > 17 ? note.title.substring(0, 17) + '...' : note.title
  }, [note.title])

  const handleClickNote = () => {
    dispatch(setActiveNote({ ...note, imgURL: [] }))
  }
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid icon='true'>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
