import { describe, expect, it } from 'vitest'
import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures'

describe('Pruebas en el authSlice', () => {
  it('debe de regresar el estado inicial y llamarse "auth" ', () => {
    // console.log(authSlice)

    const state = authSlice.reducer(initialState, {})
    expect(authSlice.name).toBe('authSlice')
    expect(state).toEqual(initialState)
  })

  it('debe de realizar la autenticación', () => {
    // console.log(login(demoUser))
    const state = authSlice.reducer(initialState, login(demoUser))

    // expect(state).not.toEqual(initialState)
    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    })
  })

  it('debe de realizar el logout sin argumentos', () => {
    const state = authSlice.reducer(authenticatedState, logout())

    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    })
  })
  it('debe de realizar el logout y mostrar un mensaje de error', () => {
    const errorMessage = 'Credenciales no son correctas'
    const state = authSlice.reducer(authenticatedState, logout({
      errorMessage
    }))

    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage
    })
  })

  it('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials())
    expect(state).toEqual({
      status: 'checking',
      uid: 'ABC123',
      email: 'demo@google.com',
      displayName: 'Demo user',
      photoURL: 'https://demo.jpg',
      errorMessage: null
    })
  })
})
