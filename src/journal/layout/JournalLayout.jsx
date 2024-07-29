import { Box, Toolbar } from '@mui/material'
import { NavBar, Sidebar } from '../components'

const drawerWidth = 240

// eslint-disable-next-line react/prop-types
export function JournalLayout ({ children }) {
  return (
    <Box sx={{
      display: 'flex'
    }}
    >
      {/* Navbar */}
      <NavBar drawerWidth={drawerWidth} />
      {/* Sidebar o Drawer */}
      <Sidebar drawerWidth={drawerWidth} />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        <Toolbar />
        {
            children
        }

      </Box>
    </Box>
  )
}
