import { Box } from '@mui/material'
import { NavBar } from '../components'

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
      {/* Sidebar */}

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        {
            children
        }

      </Box>
    </Box>
  )
}
