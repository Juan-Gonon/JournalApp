import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
export function Sidebar ({ drawerWith = 240 }) {
  const { displayName } = useSelector((state) => state.auth)
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
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid icon='true'>
                    <ListItemText primary={text} />
                    <ListItemText secondary='Cualquiera puede programar' />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
        }
        </List>
      </Drawer>

    </Box>
  )
}
