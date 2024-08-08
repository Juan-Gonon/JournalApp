import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/router/routes'
import { JournalRoutes } from '../journal/router/routes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks/useCheckAuth'

export function AppRouter () {
  const { status } = useCheckAuth()

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path='/*' element={<JournalRoutes />} />
          : <Route path='/auth/*' element={<AuthRoutes />} />
      }
      <Route path='/*' element={<Navigate path='/auth/login' />} />

    </Routes>
  )
}
