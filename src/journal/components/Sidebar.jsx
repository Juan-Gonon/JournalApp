import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { SidebarItem } from './SidebarItem'

// eslint-disable-next-line react/prop-types
export function Sidebar ({ drawerWith = 240 }) {
  const { displayName } = useSelector((state) => state.auth)
  const { notes } = useSelector((state) => state.journal)

  return (
    <Box
      component='nav'
      sx={{
        width: { sm: drawerWith },
        flexShrink: { sm: 0 }
      }}
    >
      <Drawer
        variant='permanent' // temporary if active or no active
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWith }
        }}

      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
        </Toolbar>

        <Divider />

        <List>
          {
            notes.map((note) => (
              <SidebarItem key={note.id} note={note} />
            ))
        }
        </List>
      </Drawer>

    </Box>
  )
}
