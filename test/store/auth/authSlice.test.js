import { describe, expect, it } from 'vitest'
import { authSlice } from '../../../src/store/auth/authSlice'
import { initialState } from '../../fixtures/authFixtures'

describe('Pruebas en el authSlice', () => {
  it('debe de regresar el estado inicial y llamarse "auth" ', () => {
    // console.log(authSlice)

    const state = authSlice.reducer(initialState, {})
    expect(authSlice.name).toBe('authSlice')
    expect(state).toEqual(initialState)
  })
})
