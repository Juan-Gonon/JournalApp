import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/router/routes'
import { JournalRoutes } from '../journal/router/routes'
import { useSelector } from 'react-redux'
import { checkingAuth } from '../ui'

export function AppRouter () {
  const { status } = useSelector((state) => state.auth)

  if (status === 'checking') {
    return checkingAuth()
  }

  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/*' element={<JournalRoutes />} />
    </Routes>
  )
}
