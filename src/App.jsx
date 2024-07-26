import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/routes'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { AppTheme } from './theme'

function App () {
  return (
    <>
      {/* <h1>JournalApp</h1> */}

      <BrowserRouter>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </BrowserRouter>

    </>
  )
}

export default App
