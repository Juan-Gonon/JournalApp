import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'

// eslint-disable-next-line react/prop-types
export function Sidebar ({ drawerWith = 240 }) {
  return (
    <Box
      component='nav'
      sx={{
        width: { sm: drawerWith },
        flexShrink: { ms: 0 }
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
          <Typography variant='h6' noWrap component='div'> Juan G</Typography>
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
                  <Grid icon>
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
