import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/router/routes'
import { JournalRoutes } from '../journal/router/routes'

export function AppRouter () {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/*' element={<JournalRoutes />} />
    </Routes>
  )
}
