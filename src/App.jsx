import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/routes'

function App () {
  return (
    <>
      {/* <h1>JournalApp</h1> */}

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

    </>
  )
}

export default App
