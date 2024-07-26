import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { purpleThem } from './'

// eslint-disable-next-line react/prop-types
export function AppTheme ({ children }) {
  return (
    <ThemeProvider theme={purpleThem}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {
        children
    }
    </ThemeProvider>
  )
}
