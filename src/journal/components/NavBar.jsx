import { MenuOutlined } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'

// eslint-disable-next-line react/prop-types
export function NavBar ({ drawerWidth = 240 }) {
  return (
    <AppBar
      position='fixed' sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton>
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
