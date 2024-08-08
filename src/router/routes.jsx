import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/router/routes'
import { JournalRoutes } from '../journal/router/routes'
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuth } from '../ui'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store'

export function AppRouter () {
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())
      const { uid, email, displayName, photoURL } = user
      dispatch(login({ uid, email, displayName, photoURL }))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'checking') {
    return checkingAuth()
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
